'use strict';

//カートに入れるボタン
const cart_btns = document.querySelector('.cart-btn');
let total = 0;  //カート内の合計金額
let price = parseInt(document.getElementById('price').textContent);
let cart_message_number = document.getElementById('cart-message-number');


//商品の値段を3桁区切り表記
let new_price = price.toLocaleString();
document.getElementById('new-price').textContent = new_price;

const cart_in_message = document.getElementById('cart-message');

//カートに入れるボタンをクリックしたとき
$(cart_btns).on('click', function(){
    let item_number = parseInt(document.querySelector('.cart-select').value);
    const item_price = parseInt(document.getElementById('price').textContent);
    const item_name = document.getElementById('item-name').textContent;
    cart_in_message.classList.remove('hidden');

    if(isNaN(item_number)){
        item_number = Math.floor((Math.random() * 50) + 1);
    }
    save_items.push({
        name: item_name,
        number: item_number,
        price: item_price
    });

    localStorage.setItem('items', JSON.stringify(save_items));

    //メニューのカートの数字を書き換える
    items= JSON.parse(localStorage.getItem('items'));
    cart_number.textContent = items.length;

    //数量選択ボックスの横の種類数の数字を書き換える
    cart_message_number.textContent = items.length;
    
    //カートアイコンの数字を書き換える
    cart_icon_number.textContent = items.length;

});


if(items){
    //ページが読み込まれた瞬間testes関数を実行する
    testes();
}

//selectタグに「text」欄を追加
const select_btn_name = document.querySelector('.cart-select');
const option_x = document.createElement('option');
option_x.text = 'たくさん';
option_x.value = 'x';
select_btn_name.appendChild(option_x);

