"use string";
//ниже отображение корзины
let CountFlowersBasket = document.querySelectorAll('#addtobasket');
let BasketElipses = document.querySelectorAll('.countElipse');
let totalCountFLowers = 0; //Общий счетчик позиций ОДНОЙ категории в каталоге
let arrAddFlowersToBasket = {};
let j;
let kk;
let reduceToBaskets = document.querySelectorAll('#reducetobasket');
let reduceGood = function(){
    if (kk > 1){
        kk--;
        //console.log(kk);
        this.closest('div').children[1].children[1].children[0].children[0].textContent = kk;
        localStorage.setItem('count', kk);
        save(localStorage.getItem('price'), localStorage.getItem('name'), localStorage.getItem('count'), localStorage.getItem('price') * localStorage.getItem('count'), localStorage.getItem('src'));

    }

}
for (let reduceToBasket of reduceToBaskets){
    reduceToBasket.addEventListener('click', reduceGood);
}
let addToBasket = function(){
    //contains(mem, JSON.parse(localStorage.getItem('user${index}')).name);
        kk = this.children[0].children[0].textContent;
        this.closest('div').children[1].children[0].style.display = 'flex';
        j = kk;
        if (((this.closest('div')).closest('.wrapper-one-flower')).children[1].textContent == localStorage.getItem('name')){
            kk++;
        } else {
            kk = 0;
        }
        j++;
        this.children[0].style.display = 'flex';
        //console.log( this.children[0]);
        localStorage.setItem('price', ((this.closest('div').children[0].textContent).replace(/\s+/g, '')).replace('₽',''));
        localStorage.setItem('name', ((this.closest('div')).closest('.wrapper-one-flower')).children[1].textContent);
        localStorage.setItem('count', j);
        localStorage.setItem('src', ((this.closest('div')).closest('.wrapper-one-flower')).children[0].children[0].src || ((this.closest('div')).closest('.wrapper-one-flower')).children[0].children[1].src);
        //console.log('src', ((this.closest('div')).closest('.wrapper-one-flower')).children[0].children[0].src || ((this.closest('div')).closest('.wrapper-one-flower')).children[0].children[1].src);
        save(localStorage.getItem('price'), localStorage.getItem('name'), localStorage.getItem('count'), localStorage.getItem('price') * localStorage.getItem('count'), localStorage.getItem('src'));
        this.children[0].children[0].textContent = localStorage.getItem('count');
        mem.push(JSON.parse(localStorage.getItem('user${index}')).name);
        //console.log(mem);
        //console.log(((this.closest('div').children[0].textContent).replace(/\s+/g, '')).replace('₽','')); //цена выбранного цветка;
        //console.log(((this.closest('div')).closest('.wrapper-one-flower')).children[1].textContent); // Название товара
        //console.log(((this.closest('div')).closest('.wrapper-one-flower')).children[0].children[0].src);

}
for (let CountFlowerBasket = 0; CountFlowerBasket < CountFlowersBasket.length; CountFlowerBasket++){
    totalCountFLowers++;
    CountFlowersBasket[CountFlowerBasket].addEventListener('click', addToBasket);
}                                                                          
let mem = [];
let lastuserIndex = [];
let index = JSON.parse(localStorage.getItem('userIndex')) || 0;
const save = (price, name, count, totalPrise, src) => {
    localStorage.setItem('user${index}', JSON.stringify({ price, name, count, totalPrise, src}));
    //let index = JSON.parse(localStorage.getItem('userIndex')) || 1;
    //mem.includes(JSON.parse(localStorage.getItem('user${index}')).name);
    if (mem.includes(JSON.parse(localStorage.getItem('user${index}')).name)){
        index = JSON.parse(localStorage.getItem('userIndex')) || 0;
        localStorage.setItem('userIndex', index);
        localStorage.setItem('user${index}', JSON.stringify({ price, name, count, totalPrise, src}));
        lastuserIndex[lastuserIndex.length-1] = JSON.parse(localStorage.getItem('user${index}'));
    } else if (mem.includes(JSON.parse(localStorage.getItem('user${index}')).name) != true){
        index = JSON.parse(localStorage.getItem('userIndex')) || 0;
        localStorage.setItem('userIndex', index + 1);

        lastuserIndex.push(JSON.parse(localStorage.getItem('user${index}')));// при добавлении уникального нового товара в корзину

        localStorage.setItem('user${index}', JSON.stringify({ price, name, count, totalPrise, src}));
    }
    //console.log(lastuserIndex);
    //localStorage.setItem('userIndex', index + 1);
    //localStorage.setItem('user${index}', JSON.stringify({ price, name, count, totalPrise}));
    //console.log(localStorage.getItem('user${index}'));
    //console.log(JSON.parse(localStorage.getItem('user${index}')));
   // console.log(index, 'index');
    //console.log(localStorage.getItem('user${index}'));
    localStorage.setItem('userchooise', JSON.stringify(lastuserIndex));
    //console.log(JSON.parse(localStorage.getItem('userchooise')), 'parsim');
};
console.log(JSON.parse(localStorage.getItem('userchooise')), 'parsim');

// обновление добавление кнопки reducetobasket;

function showAllCount(){ //запарная штука для отображения количества выбранных букетов при их добавлении на сайт
    let goods = document.querySelector('.container-for-katalog-flowers')
    for (let  good of goods.children){ // находим каждый товар и сравниваем его название с тем, что у нас уже хранится в локалсторейдже
        for (let everygood of good.children){
            //console.log(everygood.children[2].children[1].children[1].children[0].textContent);
            //console.log(everygood.children[2].children[1].children[1]);
            //console.log(everygood.children[2].children[1].children[1].children[0].children[0].textContent);
            //console.log(everygood.children[1]);
            for (let parsim of JSON.parse(localStorage.getItem('userchooise'))){
               if (parsim.name.includes(everygood.children[1].textContent)){ //если они совпадают, то находим где отображается количество товара и отображаем его, выводя нужное количество взятое с локалсторейдж
                everygood.children[2].children[1].children[1].style.display = 'flex';
                everygood.children[2].children[1].children[0].children[0].style.display = 'flex';
                everygood.children[2].children[1].children[1].children[0].children[0].textContent = parsim.count;
               };
            }
        }
    }
}
showAllCount();