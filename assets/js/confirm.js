'use strict';
    
const ele = document.getElementById('js-shopping-list');
const fragment = document.createDocumentFragment();
const total_ele = document.getElementById('js-total');
const items_total_div = document.getElementById('items-total-number');
let total = 0;
let items_total_number = 0;
//if(items){
//    function testes(){
//        //JSONファイルを変換した配列をcart_listという名前に格納
//        let cart_list = JSON.parse(localStorage.getItem('items'));
//
//        //for文でcart_list配列から1つずつ取り出し、save_itemsの中にpushで再配置していく
//        for(let item of cart_list){
//            save_items.push(item);            
//        }
//        cart_number.textContent = save_items.length;   
//    }
//    testes();
//
//}

//    購入確認画面に商品情報を追加していく
if(items){

    for(let i = 0; i < items.length; i++){
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const num_div = document.createElement('div');
        const unit_price = document.createElement('div');
        const total_price_div = document.createElement('div');
        const delete_btn = document.createElement('button');

        li.classList.add('shopping-list');
        unit_price.classList.add('price');
        num_div.classList.add('item-number');
        total_price_div.classList.add('total-price');
        delete_btn.classList.add('delete-btn', 'button');
        delete_btn.setAttribute('data-no',`${i}`);  //削除ボタンにno属性[i]を付与する
        
        h3.appendChild(document.createTextNode(items[i].name));
        num_div.appendChild(document.createTextNode(items[i].number));
        unit_price.appendChild(document.createTextNode(items[i].price.toLocaleString()));
        total_price_div.appendChild(document.createTextNode((items[i].price * items[i].number).toLocaleString()));
        delete_btn.appendChild(document.createTextNode('削除'));

        li.appendChild(h3);
        li.appendChild(unit_price);
        li.appendChild(num_div);
        li.appendChild(total_price_div);
        li.appendChild(delete_btn);
        fragment.appendChild(li);

        total = total + (items[i].price) * items[i].number;
            
        if(items[i] !== null){
            //削除ボタンが押されたとき
            delete_btn.onclick = function(){
                items.splice(this.dataset.no, 1);
                this.closest('.shopping-list').remove();
                localStorage.setItem('items', JSON.stringify(items));
                location.reload();
            }
        }
        
        //商品の総数を表示する
        items_total_number += items[i].number;
    }

}

items_total_div.textContent = items_total_number;
ele.appendChild(fragment);
total_ele.innerHTML = total.toLocaleString();

if(items){
    const cart_delete_btn = document.getElementById('cart-delete-btn');
    const parchase_box = document.getElementById('parchase-box');
    const parchase_btn = document.getElementById('parchase-btn');
    cart_delete_btn.classList.remove('hidden');
    parchase_box.classList.remove('hidden');

    parchase_btn.addEventListener('click', () => {
        const answer = window.confirm('購入します。よろしいですか？');
        if(answer == true){
            window.alert('Thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you! thank you!');
            localStorage.removeItem('items');
            location.reload();
        }
    });

    cart_delete_btn.addEventListener('click', () => {
       const answer = window.confirm('本当に削除しますか？');
        if(answer === true){
            localStorage.removeItem('items');
            location.reload();
        }
    });
    
    //削除ボタンを押し続け、itemsの中に商品が無くなった場合、購入ボタンを非表示にする
    if(items.length === 0){
        parchase_btn.classList.add('hidden');
    }
}

