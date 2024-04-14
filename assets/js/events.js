'use strict';

const discount_number1 = document.getElementById('discount-number1');
const discount_number2 = document.getElementById('discount-number2');


//タイムセールの割引率を毎日ランダムに表示
function discount(){
    const today = new Date();
    const yy = today.getFullYear();
    const mm = today.getMonth() + 1;
    const dd = today.getDate();
    const ss = today.getSeconds();
    const seed = yy * mm * dd;
    const random1 = new Random1(seed);
    const random2 = new Random2(seed);
    const value1 = Math.abs(random1.nextInt(10, 50));
    const value2 = Math.abs(random2.nextInt(10, 50));
//    const number1 = ('0' + value1).slice(1, 3);
//    const number2 = Number(value2.toString().substring(0, 2));

    discount_number1.textContent = value1;
    discount_number2.textContent = value2;
}
discount();
setInterval(discount,10000);

//タイムセールの商品画像を毎日ランダムに表示
const discount_img1 = document.getElementById('sale-items-image1');
const discount_img2 = document.getElementById('sale-items-image2');
const discount_name1 = document.getElementById('sale-items-name1');
const discount_name2 = document.getElementById('sale-items-name2');
const origin_price1 = document.getElementById('origin-price1');
const origin_price2 = document.getElementById('origin-price2');
const discount_price1 = document.getElementById('discount-price1');
const discount_price2 = document.getElementById('discount-price2');

const change_sale_items = () => {
    let today= new Date();
    let yy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    let seed = yy * mm * dd;
    let random1 = new Random1(seed);
    let random2 = new Random2(seed);
    let random2_1 = new Random2(seed);
    let random2_2 = new Random2(seed);
    let random2_3 = new Random2(seed);
    let number1 = random1.nextInt(0, image_box.length -1);
    let number2 = random2.nextInt(0, image_box.length -1);
    while(number1 === number2){
        seed = Math.floor(Math.random() * 1000 + 1);
        number1 = random1.nextInt(0, image_box.length -1);
        number2 = random2.nextInt(0, image_box.length -1);
    }
    
    discount_img1.src = image_box[number1].src;
    discount_img1.alt = image_box[number1].alt;
    discount_name1.textContent = image_box[number1].name;
    origin_price1.textContent = Number(image_box[number1].price).toLocaleString();
    discount_price1.textContent = (image_box[number1].price * (100 - discount_number1.textContent) / 100).toLocaleString();

    discount_img2.src = image_box[number2].src;
    discount_img2.alt = image_box[number2].alt;
    discount_name2.textContent = image_box[number2].name;
    origin_price2.textContent = Number(image_box[number2].price).toLocaleString();
    discount_price2.textContent = (image_box[number2].price * (100 - discount_number2.textContent) / 100).toLocaleString();
}
change_sale_items();
setInterval('change_sale_items()', 10000);