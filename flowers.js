"use string";
// яндекс карты api

initMap();

async function initMap() {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapMarker, YMapControls, YMapDefaultFeaturesLayer} = ymaps3;

    const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');
    

    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: [51.574762, 46.020836],
                zoom: 11
            }
        }
    );
    map.setLocation({
        center: [46.020836, 51.574762],
        zoom: 11
      });
      const content = document.createElement('div');

    
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapControls({position: 'right'}).addChild(new YMapZoomControl({})));
    map.addChild(new YMapDefaultFeaturesLayer({id: 'features'}));
  

      const marker = new YMapDefaultMarker(INC_POINT);
        map.addChild(marker);

        
        marker.update({
            title: 'проспект Героев Отечества, зд1'
          });
      
          const marker2 = new YMapDefaultMarker(INC_POINT2);
          map.addChild(marker2);
        
          marker2.update({
            title: 'улица имени Т.Г. Шевченко, 47/43'
          });
}

const INC_POINT = {coordinates: [46.014482, 51.606273], title: 'проспект Героев Отечества, зд1'};
const INC_POINT2 = {coordinates: [46.018329, 51.528514], title: 'улица имени Т.Г. Шевченко, 47/43'};
// конец с картами
// карусель
let slidesСarousel = document.querySelectorAll('#slide');
/*
 for (let slideСarousel = 0; slideСarousel < slidesСarousel.length; slideСarousel++){
    slidesСarousel[slideСarousel].addEventListener('click', function(){
        if(event.target.classList.contains('current') != 1){
            console.log('+++');
            slides[slide].classList.remove('page');
            slides[slide].classList.toggle('current');
        }
    })
 }
*/

let slideСarouselLeft = document.getElementById('slideСarousel-left');
let slideСarouselRight = document.getElementById('slideСarousel-right');
let currentСarouselPage = 0;

/*
for (let slideСarousel = 0; slideСarousel < slidesСarousel.length; slideСarousel++){
    slidesСarousel[slideСarousel].addEventListener('click', function(){
        if(event.target.classList.contains('current') != 1){
            console.log('+++');
            slides[slide].classList.remove('page');
            slides[slide].classList.toggle('current');
        }
    })
 }
 if (slidesСarousel[currentСarouselPage].classList.contains('current') != 1){
        slidesСarousel[currentСarouselPage].classList.remove('page');
        slidesСarousel[currentСarouselPage].classList.toggle('current');
        slidesСarousel[currentСarouselPage-1].classList.add('page');
        slidesСarousel[currentСarouselPage-1].classList.toggle('current');
        console.log('+');
        if (currentСarouselPage > 2 && innerWidth > 390){
            currentСarouselPage = 0;
        }
    }
 */
let slider = document.querySelector('.slider-Carousel'),
  sliderList = slider.querySelector('.slider-Carousel-list'),
  sliderTrack = slider.querySelector('.slider-Carousel-track'),
  slides = slider.querySelectorAll('#slide1'),
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  swipeStartTime,
  swipeEndTime,
  getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

  },
  swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      swipeStartTime = Date.now();
      
      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
        if (slideIndex === --slides.length) {
            if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
            } else {
            allowSwipe = true;
            }
        }
        if ((slideIndex === 2) && window.innerWidth > 768){
            if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
            } else {
            allowSwipe = true;
            }
        }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      swipeEndTime = Date.now();
      if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
        if (posInit < posX1) {
          slideIndex--;
          currentСarouselPage--;
      if (slidesСarousel[currentСarouselPage].classList.contains('current') != 1){
        slidesСarousel[currentСarouselPage].classList.remove('page');
        slidesСarousel[currentСarouselPage].classList.toggle('current');
        slidesСarousel[currentСarouselPage+1].classList.add('page');
        slidesСarousel[currentСarouselPage+1].classList.toggle('current');
    }
        } else if (posInit > posX1) {
          slideIndex++;
          currentСarouselPage++;
      if (slidesСarousel[currentСarouselPage].classList.contains('current') != 1){
        slidesСarousel[currentСarouselPage].classList.remove('page');
        slidesСarousel[currentСarouselPage].classList.toggle('current');
        slidesСarousel[currentСarouselPage-1].classList.add('page');
        slidesСarousel[currentСarouselPage-1].classList.toggle('current');
    }
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);


function slideRight(){
    let target = event.target;
    if (currentСarouselPage < 2){
        currentСarouselPage++;
        if (slidesСarousel[currentСarouselPage].classList.contains('current') != 1){
            slidesСarousel[currentСarouselPage].classList.remove('page');
            slidesСarousel[currentСarouselPage].classList.toggle('current');
            slidesСarousel[currentСarouselPage-1].classList.add('page');
            slidesСarousel[currentСarouselPage-1].classList.toggle('current');
        }
    } else {
        slidesСarousel[currentСarouselPage].classList.add('page');
        slidesСarousel[currentСarouselPage].classList.toggle('current');
        currentСarouselPage = 0;
        slidesСarousel[currentСarouselPage].classList.remove('page');
        slidesСarousel[currentСarouselPage].classList.toggle('current');
    }

}
function slideLeft(){
    if (currentСarouselPage > 0){
        currentСarouselPage--;
        if (slidesСarousel[currentСarouselPage].classList.contains('current') != 1){
            slidesСarousel[currentСarouselPage].classList.remove('page');
            slidesСarousel[currentСarouselPage].classList.toggle('current');
            slidesСarousel[currentСarouselPage+1].classList.add('page');
            slidesСarousel[currentСarouselPage+1].classList.toggle('current');
        }
    } else {
        slidesСarousel[currentСarouselPage].classList.add('page');
        slidesСarousel[currentСarouselPage].classList.toggle('current');
        currentСarouselPage = 2;
        slidesСarousel[currentСarouselPage].classList.remove('page');
        slidesСarousel[currentСarouselPage].classList.toggle('current');
    }
}
let arrows = document.querySelector('.wrapper-for-slide-arrow');
let next = document.querySelector('#slideCarousel-right');
let prev = document.querySelector('#slideCarousel-left');
arrows.addEventListener('click', function() {
    let target = event.target;
    //console.log(target);
    if (target.classList.contains('next')) {
      if (currentСarouselPage < 2){
        slideIndex++;
        currentСarouselPage++;
            if (slidesСarousel[currentСarouselPage].classList.contains('current') != 1){
                slidesСarousel[currentСarouselPage].classList.remove('page');
                slidesСarousel[currentСarouselPage].classList.toggle('current');
                slidesСarousel[currentСarouselPage-1].classList.add('page');
                slidesСarousel[currentСarouselPage-1].classList.toggle('current');
            }
        }
    } else if (target.classList.contains('prev')) {
      if (currentСarouselPage > 0){
        slideIndex--;
        currentСarouselPage--;
            if (slidesСarousel[currentСarouselPage].classList.contains('current') != 1){
                slidesСarousel[currentСarouselPage].classList.remove('page');
                slidesСarousel[currentСarouselPage].classList.toggle('current');
                slidesСarousel[currentСarouselPage+1].classList.add('page');
                slidesСarousel[currentСarouselPage+1].classList.toggle('current');
            }
        }
    } else {
      return;
    }
  
    slide();
  });
/* форма для отправки*/
let form = document.querySelector('form');
//console.log(form.user_name);
//console.log(form.user_email);
//console.log(form.user_question);
let checkBox = document.querySelector('#modern-checkbox');
let send$form = document.querySelector('#send');
function sendForm(){
    if (form.user_name.value != 0 && form.user_email.value != 0 && form.user_question.value != 0 && form.user_phone.value != 0 && checkBox.checked == 1)
        {
            document.getElementById('errname').style.display = 'none';
            document.getElementById('errmail').style.display = 'none';
            document.getElementById('errquestion').style.display = 'none';
            document.getElementById('errphone').style.display = 'none';
            this.send$form();
    }
    else{
        event.preventDefault();
        if (form.user_name.value == 0 || form.user_email.value == 0 || form.user_question.value == 0 || form.user_phone.value == 0 || checkBox.checked == 0){
            if (form.user_name.value == 0){
            document.getElementById('errname').style.display = 'inline';

            }
            if(form.user_email.value == 0){
                document.getElementById('errmail').style.display = 'inline';

            }
            if(form.user_question.value == 0){
                document.getElementById('errquestion').style.display = 'inline';

            }
            if(form.user_phone.value == 0){
                document.getElementById('errphone').style.display = 'inline';

            }
            if (checkBox.checked == 0){
                document.getElementById('errcheck').style.display = 'inline';
            }
        }
        return;
    }
};
send$form.addEventListener('click', sendForm);