"use string";
//оформление заказа инпуты;
let customInputs = document.querySelectorAll('input');
let InputCustomPlaceholder = document.querySelectorAll('.customInp');
let InputCustomPlaceholderLong = document.querySelectorAll('.wrapper-for-inp-info-long');
let InputCustomDate = document.querySelectorAll('.wrapper-for-info-delivery-date');

let kkk = 0;
let switchForUpdSum = false; // переключатель по которому определяется работа функции высчитывания финальной стоимости 
const hidePlaceholder = function(){
    let elems =  this.children; //находим все элементы в контейнере
    for (let elem of elems){ //0 - всегда инпуты, 1 - всегда спаны
        //ниже определяем инпуты, где нужен номер телефона
        if(elems[0] == document.querySelector('input[name="tel"]')){
            elems[0].addEventListener('keydown', function validate(evt) {
                var theEvent = evt || window.event;
                var key = theEvent.keyCode || theEvent.which;
                key = String.fromCharCode( key );
                var regex = /[0-9]|\x08/;
                //console.log(key, 'key');
                if( !regex.test(key) ) {
                  theEvent.returnValue = false;
                  if(theEvent.preventDefault) theEvent.preventDefault();
                }
                else if (evt.target.tagName === 'SELECT' && (e.keyCode === 8)){
                    //console.log('+++');
                    theEvent.returnValue = true;
                }
              });
            elems[0].setAttribute('readonly', ''); //фиксим баг
        setTimeout(function(){
            elems[0].removeAttribute('readonly'); //не баг а фича
            if (elems[0].value != '+7'){
                elems[0].value = elems[0].value; //при клике на это поле, автоматически будет появляться код +7
            }
            if (elems[0].value == ''){
                elems[0].value = '+7';
            }
        }, 150)
        }
        if (elems[0] == document.querySelector('input[name="telrecipient"]')){
            elems[0].addEventListener('keydown', function validate(evt) {
                var theEvent = evt || window.event;
                var key = theEvent.keyCode || theEvent.which;
                key = String.fromCharCode( key );
                var regex = /[0-9]|\x08/;
                //console.log(key, 'key');
                if( !regex.test(key) ) {
                  theEvent.returnValue = false;
                  if(theEvent.preventDefault) theEvent.preventDefault();
                }
                else if (evt.target.tagName === 'SELECT' && (e.keyCode === 8)){
                    //console.log('+++');
                    theEvent.returnValue = true;
                }
              });
        setTimeout(function(){
            if (elems[0].value != '+7'){
                elems[0].value = elems[0].value; //при клике на это поле, автоматически будет появляться код +7
            }
            if (elems[0].value == ''){
                elems[0].value = '+7';
            }
        },150);
        }

        elems[0].focus(); //накидываем навсякий случай фокус, если пользователь нажмет на спан, а не на инпут
        //if(elems[0].value != '')
        elems[1].style.opacity = '0'; //делаем кастом плейсхолдер из спана невидимым
        elems[1].style.pointerEvents = 'none';
        elems[0].addEventListener('focusout', function(){ // определяем потерю фокуса со спана, чтобы вернуть плейсхолдер на место
            if (elems[0].value == ''){
                elems[1].style.pointerEvents = 'auto';//фикс бага, если не терять фокус а нажать на инпут еще раз, то всплывал кастом плейсхолдер
                elems[1].style.opacity = '1';
            }
            
            // добавляем таймер, чтобы синхронизировать исчезновение текста с транситион спана
            setTimeout(function(){
                if(elems[0] == document.querySelector('input[name="tel"]') && (elems[0].value == '+7' || elems[0].value == '')){ //при потере фокуса с полем для номера телефона, значение этого поля становится пустым, чтобы не накладывать друг на друга текст
                    elems[0].value = '';
                    elems[1].style.opacity = '1';
                }
            },150);
            setTimeout(function(){
                if (elems[0] == document.querySelector('input[name="telrecipient"]')  && (elems[0].value == '+7' || elems[0].value == '')){
                    elems[0].value = '';
                    elems[1].style.opacity = '1';
                }
            })
        })
    }    
}

let closest = document.querySelectorAll('#closest'); //находим все контейнера с инпутами и спанами
for (let closes of closest){ 
    closes.addEventListener('click', hidePlaceholder);
}
// если все необходимые поля введены кнопка отправить сработает и сменит статус свича
let Orderswitch = false;
let SendOffer = document.getElementById('offer'); //кнопка отправки формы
let ContainerInfoDelivery = document.querySelector('.container-for-info-and-basket');//контейнер с полями для ввода информации
SendOffer.addEventListener('click', Send$Offer);

//убираем отслеживание заказа, если заказ не формлен
if (!Orderswitch){
    document.querySelector('.container-for-show-status-delivery').style.display = 'none';
}
function Send$Offer(){
    if ((document.querySelector('input[name="tel"]').value != '') && document.querySelector('input[name="mainName"]').value != ''){
        //console.log('+++');
        Orderswitch = true;
        document.getElementById('errboth').style.display = 'none';
        document.getElementById('errname').style.display = 'none';
        document.getElementById('errtel').style.display = 'none';

    }
    
    if (document.querySelector('input[name="mainName"]').value == '' && document.querySelector('input[name="tel"]').value == ''){
        document.getElementById('errboth').style.display = 'block';
        document.getElementById('errname').style.display = 'none';
        document.getElementById('errtel').style.display = 'none';
    } else if(document.querySelector('input[name="tel"]').value == '' && document.querySelector('input[name="mainName"]').value != ''){
        document.getElementById('errtel').style.display = 'block';
        document.getElementById('errboth').style.display = 'none';
        document.getElementById('errname').style.display = 'none';

    } else if (document.querySelector('input[name="mainName"]').value == ''){
        document.getElementById('errname').style.display = 'block';
        document.getElementById('errtel').style.display = 'none';
        document.getElementById('errboth').style.display = 'none';
    }
    //если заказ проходит
    if (Orderswitch){
        ContainerInfoDelivery.style.display = 'none';
        document.querySelector('.container-for-show-status-delivery').style.display = 'flex';
    }
}
//console.log(localStorage.getItem('user${index}'), 'index');
//console.log(JSON.parse(localStorage.getItem('userchooise')), 'parsim');

let bodyBasketInfo = document.querySelector('.container-for-basket-offer-delivery');

//отображаем количество товаров к оформлению
if ((JSON.parse(localStorage.getItem('userchooise') == null)) == true ){
    bodyBasketInfo.style.display = 'none';
} else {
    bodyBasketInfo.style.display = 'flex';
}


let scoreGoods = document.getElementById('count-delivery');
if (JSON.parse(localStorage.getItem('userchooise')).length > 4){
    scoreGoods.textContent = JSON.parse(localStorage.getItem('userchooise')).length + ' товаров';
} else {
    scoreGoods.textContent = JSON.parse(localStorage.getItem('userchooise')).length + ' товара'; //отображение количества товара, по его типу
}
let containerforappendinfo = document.querySelector('.container-for-append-info'); //сюда будем пушить блоки с добавленными товарами;
let newss = document.createElement('span');
let sample = document.querySelector('.container-for-show-offer');




newss.innerHTML = scoreGoods.innerHTML;
newss.setAttribute('class', 'main-txt');
let length = JSON.parse(localStorage.getItem('userchooise')).length;
let seperator = ' ';
let Sum = 0;
let total = 0;
let priceMem = [];
let deliveryCheck = true;
let deliveryPrice = 250;
for (let GoodsBLocks = 0; GoodsBLocks < length; GoodsBLocks++){
    let goodBlock = document.createElement('div');
    goodBlock.innerHTML = sample.innerHTML;
    goodBlock.setAttribute('class', 'container-for-show-offer');
    containerforappendinfo.appendChild(goodBlock); //теперь когда мы добавили нужное количество блоков мы будем их видоизменять

    goodBlock.children[0].src = JSON.parse(localStorage.getItem('userchooise'))[GoodsBLocks].src;
    //console.log(String(JSON.parse(localStorage.getItem('userchooise'))[GoodsBLocks].price),'priceeeee');
    goodBlock.children[1].children[0].children[0].textContent = JSON.parse(localStorage.getItem('userchooise'))[GoodsBLocks].name; //имя товаров в корзине
    goodBlock.children[1].children[0].children[1].textContent = String(JSON.parse(localStorage.getItem('userchooise'))[GoodsBLocks].price * JSON.parse(localStorage.getItem('userchooise'))[GoodsBLocks].count).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽'; //стоимость с учетом количества в корзине
    goodBlock.children[1].children[1].children[0].children[1].textContent = JSON.parse(localStorage.getItem('userchooise'))[GoodsBLocks].count; //количество товара
    localStorage.setItem('price', (localStorage.getItem('userchooise'))[GoodsBLocks].price);
    priceMem.push(JSON.parse(localStorage.getItem('userchooise'))[GoodsBLocks].price);
    Sum = JSON.parse(localStorage.getItem('userchooise'))[GoodsBLocks].price * JSON.parse(localStorage.getItem('userchooise'))[GoodsBLocks].count
    total += Sum; //высчет итоговой стоимости без учета доставки
    //console.log(bodyBasketInfo.children[3].children[1].children[1]);
    bodyBasketInfo.children[3].children[0].children[1].textContent = String(total).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
    //высчит по итоговой стоимости товаров c учетом доставки
    calculateTotalSum();

}
let deliveryOn = document.querySelector('.type-delivery1').children[0];
let deliveryOff = document.querySelector('.type-delivery1').children[1];
//console.log(deliveryOn);
//console.log(deliveryOff);
for (let toggleDeliveryElem of document.querySelector('.type-delivery1').children){
    toggleDeliveryElem.addEventListener('click', toggleDelivery);
    //console.log(toggleDeliveryElem);
}
function toggleDelivery(){ //внешний переключатель доставки
    if (event.target == deliveryOn){
        deliveryOn.classList.toggle('active-kategory');
        deliveryOff.classList.toggle('active-kategory');
        document.querySelector('.container-for-info-delivery').style.opacity = '0';
    } else {
        deliveryOn.classList.toggle('active-kategory');
        deliveryOff.classList.toggle('active-kategory');
        document.querySelector('.container-for-info-delivery').style.opacity = '1';
    }
    if (deliveryOn.classList.contains('active-kategory')){
        deliveryCheck = true;
        bodyBasketInfo.children[3].children[1].children[1].textContent = String(deliveryPrice).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
        calculateTotalSum();
        document.querySelector('.container-for-info-delivery').style.opacity = '1';
    } else {
        deliveryCheck = false;
        bodyBasketInfo.children[3].children[1].children[1].textContent = 0;
        calculateTotalSum();
        document.querySelector('.container-for-info-delivery').style.opacity = '0';
    }
}
let bodyPaymentMethod = document.querySelector('.mobile-type-delivery');
function togglePaymentMethod(){
    
};
togglePaymentMethod();
function calculateTotalSum(){ //смена стоимости доставки, если необходимо
    if (!switchForUpdSum){
        if (deliveryCheck){
            bodyBasketInfo.children[3].children[2].children[1].textContent = String(total + deliveryPrice).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
        }
        else {
            bodyBasketInfo.children[3].children[2].children[1].textContent = String(total).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
        }
    }
    if (switchForUpdSum){
        if (deliveryCheck == true){
            toPay.children[2].children[1].textContent = String(toPaySum + 250).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
        } else if (deliveryCheck == false){
            toPay.children[2].children[1].textContent = String(toPaySum).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
        }
    }
}

let lastuserIndex = [];
const save = (price, name, count, totalPrise, src) => {
    localStorage.setItem('user${index}', JSON.stringify({ price, name, count, totalPrise, src}));
    //console.log(localStorage.getItem('user${index}'));
    lastuserIndex.push(JSON.parse(localStorage.getItem('user${index}')));
    //console.log(lastuserIndex);
    localStorage.setItem('userchooise', JSON.stringify(lastuserIndex));
};
//console.log(JSON.parse(localStorage.getItem('userchooise')), 'parsim');
let samples = document.querySelectorAll('.container-for-show-offer');
for (let goods = 1; goods < samples.length; goods++){ //цикл с проходом по всем созданным ранее блокам с товарами, необходим, для обновления актуальных данных локалсторейдж
    localStorage.setItem('src', samples[goods].children[0].src);
    localStorage.setItem('name', samples[goods].children[1].children[0].children[0].textContent);
    //localStorage.setItem('price', ((samples[goods].children[1].children[0].children[1].textContent).replace(/\s+/g, '')).replace('₽',''));
    localStorage.setItem('count', samples[goods].children[1].children[1].children[0].children[1].textContent);
    //localStorage.setItem('totalPrice', samples[goods].children[1].children[1].children[0].children[1].textContent * ((samples[goods].children[1].children[0].children[1].textContent).replace(/\s+/g, '')).replace('₽',''));
    //save(localStorage.getItem('price'), localStorage.getItem('name'), localStorage.getItem('count'), localStorage.getItem('price') * localStorage.getItem('count'), localStorage.getItem('src'));
}

// фукнция удаления товара из корзины встраивается внутрь определенных ранее созданных через append элементов
let priceMemForUpd = [0];
let remainder = samples.length - 1;
let toPay = document.querySelector('.wrapper-results-delivery');
let toPaySum = 0; //высчет суммы всех товаров
let switchForUpd = false; // переключитель будет менять после того как зайдествовали удаление позиции товара
for (let goods = 1; goods < samples.length; goods++){
    //console.log(toPay.children[0].children[1]);
    priceMemForUpd.push(((samples[goods].children[1].children[0].children[1].textContent).replace(/\s+/g, '')).replace('₽','') / samples[goods].children[1].children[1].children[0].children[1].textContent);
    //console.log(priceMemForUpd, 'pricemempush');
     //цикл реализованный для обновления jsona при изменении количества одного из товаров
    samples[goods].children[1].children[1].children[0].children[0].addEventListener('click', function countDown(){
        switchForUpdSum = true;
        lastuserIndex = [];
        toPaySum = 0;
        if (switchForUpd == false){ 
            if (samples[goods].children[1].children[1].children[0].children[1].textContent > 1){
                samples[goods].children[1].children[1].children[0].children[1].textContent--;//отображение смены количества товаров
                for (let goods = 1; goods < samples.length; goods++){
                    localStorage.setItem('src', samples[goods].children[0].src);
                    localStorage.setItem('name', samples[goods].children[1].children[0].children[0].textContent);
                    localStorage.setItem('count', samples[goods].children[1].children[1].children[0].children[1].textContent);
                    localStorage.setItem('price', priceMemForUpd[goods]);
                    localStorage.setItem('totalPrice', localStorage.getItem('price') * localStorage.getItem('count'));
                    //console.log(localStorage.getItem('price'), '4juihniasd');
                    samples[goods].children[1].children[0].children[1].textContent = localStorage.getItem('totalPrice').replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
                    toPaySum += Number(localStorage.getItem('totalPrice'));
                    //console.log(toPaySum, 'topaysum');
                    toPay.children[0].children[1].textContent = String(toPaySum).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
                    calculateTotalSum()
                    save(localStorage.getItem('price'), localStorage.getItem('name'), localStorage.getItem('count'), localStorage.getItem('price') * localStorage.getItem('count'), localStorage.getItem('src'));
                    //console.log(JSON.parse(localStorage.getItem('userchooise')), 'убавляем');
                }
            }
        } else if (switchForUpd == true) {
            let samplesUpd = document.querySelectorAll('.container-for-show-offer');
            if (samples[goods].children[1].children[1].children[0].children[1].textContent > 1){
                samples[goods].children[1].children[1].children[0].children[1].textContent--;//отображение смены количества товаров
                for (let samle = 1; samle < samplesUpd.length; samle++){
                    localStorage.setItem('src', samplesUpd[samle].children[0].src);
                        localStorage.setItem('name', samplesUpd[samle].children[1].children[0].children[0].textContent);
                        localStorage.setItem('count', samplesUpd[samle].children[1].children[1].children[0].children[1].textContent);
                        localStorage.setItem('price', priceMemForUpd[samle]);
                        localStorage.setItem('totalPrice', localStorage.getItem('price') * localStorage.getItem('count'));
                        samples[goods].children[1].children[0].children[1].textContent = localStorage.getItem('totalPrice').replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
                        toPaySum += Number(localStorage.getItem('totalPrice'));
                    //console.log(toPaySum, 'topaysum');
                    toPay.children[0].children[1].textContent = String(toPaySum).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
                    calculateTotalSum()
                        save(localStorage.getItem('price'), localStorage.getItem('name'), localStorage.getItem('count'), localStorage.getItem('price') * localStorage.getItem('count'), localStorage.getItem('src'));
                        //console.log(JSON.parse(localStorage.getItem('userchooise')), 'убавляем свитч тру');
                }
            }
        }
    });
    samples[goods].children[1].children[1].children[0].children[2].addEventListener('click', function countUp(){
        switchForUpdSum = true;
        lastuserIndex = [];
        toPaySum = 0;
        if (switchForUpd == false){
            samples[goods].children[1].children[1].children[0].children[1].textContent++;//отображение смены количества товаров
            for (let goods = 1; goods < samples.length; goods++){
                localStorage.setItem('src', samples[goods].children[0].src);
                localStorage.setItem('name', samples[goods].children[1].children[0].children[0].textContent);
                localStorage.setItem('count', samples[goods].children[1].children[1].children[0].children[1].textContent);
                localStorage.setItem('price', priceMemForUpd[goods]);
                localStorage.setItem('totalPrice', localStorage.getItem('price') * localStorage.getItem('count'));
                samples[goods].children[1].children[0].children[1].textContent = localStorage.getItem('totalPrice').replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
                toPaySum += Number(localStorage.getItem('totalPrice'));
                //console.log(toPaySum, 'topaysum');
                toPay.children[0].children[1].textContent = String(toPaySum).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
                calculateTotalSum()
                save(localStorage.getItem('price'), localStorage.getItem('name'), localStorage.getItem('count'), localStorage.getItem('price') * localStorage.getItem('count'), localStorage.getItem('src'));
                //console.log(JSON.parse(localStorage.getItem('userchooise')), 'прибавляем');
            }
        } else if (switchForUpd == true){
            let samplesUpd = document.querySelectorAll('.container-for-show-offer');
            if (samples[goods].children[1].children[1].children[0].children[1].textContent > 1){
                samples[goods].children[1].children[1].children[0].children[1].textContent++;//отображение смены количества товаров
                for (let samle = 1; samle < samplesUpd.length; samle++){
                    localStorage.setItem('src', samplesUpd[samle].children[0].src);
                        localStorage.setItem('name', samplesUpd[samle].children[1].children[0].children[0].textContent);
                        localStorage.setItem('count', samplesUpd[samle].children[1].children[1].children[0].children[1].textContent);
                        localStorage.setItem('price', priceMemForUpd[samle]);
                        localStorage.setItem('totalPrice', localStorage.getItem('price') * localStorage.getItem('count'));
                        samples[goods].children[1].children[0].children[1].textContent = localStorage.getItem('totalPrice').replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
                        toPaySum += Number(localStorage.getItem('totalPrice'));
                    //console.log(toPaySum, 'topaysum');
                    toPay.children[0].children[1].textContent = String(toPaySum).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
                    calculateTotalSum()
                        save(localStorage.getItem('price'), localStorage.getItem('name'), localStorage.getItem('count'), localStorage.getItem('price') * localStorage.getItem('count'), localStorage.getItem('src'));
                        //console.log(JSON.parse(localStorage.getItem('userchooise')), 'убавляем свитч тру');
                }
            }
        }
    });
    //console.log(samples[goods]);
    samples[goods].children[1].children[1].children[1].addEventListener('click', function deletePosition(){
        samples[goods].remove();
        switchForUpdSum = true;
        remainder--;
        if (remainder == 0){
            bodyBasketInfo.style.display = 'none';
            lastuserIndex = [];
            save('');
        }
        //console.log(remainder, 'remainer');
        lastuserIndex = [];
        toPaySum = 0;
        switchForUpd = true;
        let samplesUpd = document.querySelectorAll('.container-for-show-offer');
        for (let samle = 1; samle < samplesUpd.length; samle++){
            localStorage.setItem('src', samplesUpd[samle].children[0].src);
                localStorage.setItem('name', samplesUpd[samle].children[1].children[0].children[0].textContent);
                localStorage.setItem('count', samplesUpd[samle].children[1].children[1].children[0].children[1].textContent);
                localStorage.setItem('price', priceMemForUpd[samle]);
                localStorage.setItem('totalPrice', localStorage.getItem('price') * localStorage.getItem('count'));
                toPaySum += Number(localStorage.getItem('totalPrice'));
                    //console.log(toPaySum, 'topaysum');
                    toPay.children[0].children[1].textContent = String(toPaySum).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator) + ' ₽';
                    calculateTotalSum()
                save(localStorage.getItem('price'), localStorage.getItem('name'), localStorage.getItem('count'), localStorage.getItem('price') * localStorage.getItem('count'), localStorage.getItem('src'));
                //console.log(JSON.parse(localStorage.getItem('userchooise')), 'delete');
        }
        if (JSON.parse(localStorage.getItem('userchooise')).length > 4){
            scoreGoods.textContent = JSON.parse(localStorage.getItem('userchooise')).length + ' товаров';
        } else {
            scoreGoods.textContent = JSON.parse(localStorage.getItem('userchooise')).length + ' товара'; //отображение количества товара, по его типу
        }
        //console.log(JSON.parse(localStorage.getItem('userchooise'), '12312312q312'));
        
    }); // функция удаления товаров

}
if (JSON.parse(localStorage.getItem('userchooise'))[0].price == ''){
    bodyBasketInfo.style.display = 'none';
}

//