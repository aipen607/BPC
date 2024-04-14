'use strict';


//クッキー
const agree = Cookies.get('cookie-agree');
const cookiePanel = document.querySelector('.cookie-box');
cookiePanel.classList.add('hidden');

if(agree === 'yes'){
    document.body.removeChild(cookiePanel);  
}else{
    document.querySelector('.accept-btn').onclick = function(){
        Cookies.set('cookie-agree', 'yes', {expires: 7});
        document.body.removeChild(cookiePanel);
    };
    document.querySelector('.refuse-btn').onclick = function(){
        document.body.removeChild(cookiePanel);
    };
}

document.getElementById('delete').onclick = function(){
    Cookies.remove('cookie-agree');
};


//現在時刻取得
function getNow(){
    const now = new Date();
    const yy = now.getFullYear();
    const mm = ('0' + (now.getMonth() + 1)).slice(-2);
    const dd = ('0' + now.getDate()).slice(-2);
    const hh = ('0' + now.getHours()).slice(-2);
    const min = ('0' + now.getMinutes()).slice(-2);
    const sec = ('0' + now.getSeconds()).slice(-2);    

    const output = `現在日時：${yy}年${mm}月${dd}日 ${hh}:${min}:${sec}`;
    document.getElementById('current-time').textContent = output;    
    window.requestAnimationFrame(getNow);
}
//setInterval(getNow,500);
//getNow();


//カウントダウンタイマー
function countdown(){
    const now = new Date();
    const tomorow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);//明日の0:00を取得
    const rest = tomorow.getTime() - now.getTime();
    
    let hh = Math.floor(rest / 1000 /60 /60) % 24;
    let mm = Math.floor(rest / 1000 / 60) % 60;
    let ss = Math.floor(rest / 1000) % 60;

    hh = ('0' + hh).slice(-2);
    mm = ('0' + mm).slice(-2);
    ss = ('0' + ss).slice(-2);
    const time = `残り時間：${hh}時間${mm}分${ss}秒`;
    let timer = document.getElementsByClassName('timer');
    for(let item of timer){
        item.textContent = time;
    }
    window.requestAnimationFrame(countdown);
}
countdown();


$(function(){
    //トップメニュー
    $('.top-menu-list:nth-child(2)').hover(function(){
        $('.item-drop-menu:not(:animated)',this).slideDown(200);
    },function(){
        $('.item-drop-menu',this).slideUp(200);
    });
    
    $('.top-menu-list:nth-child(3)').hover(function(){
        $('.events-drop-menu:not(:animated)',this).slideDown(200);
    },function(){
        $('.events-drop-menu',this).slideUp(200);
    });
    
    
    //ハンバーガーメニュー
    $('.drawer-btn').on('click', function(){
        $('.drawer-screen').toggleClass('active');
        $('.inner-line').toggleClass('active');
        $('.drawer-ul').toggleClass('active');
        
        if(!$('.drawer-nav').hasClass('active')){
            $('.drawer-nav').addClass('active');
        }else{
            $('.drawer-nav').removeClass('active');
            $('.drawer-nav').addClass('inactive');
        }
        
        if($('.drawer-nav').hasClass('active') && $('.drawer-nav').hasClass('inactive')){
            $('.drawer-nav').removeClass('inactive');
        }
    });
    
    $('.drawer-screen').on('click', function(){
        $('.inner-line').toggleClass('active');
        $('.drawer-ul').toggleClass('active');
        $(this).removeClass('active');
        
        if($('.drawer-nav').hasClass('active')){
            $('.drawer-nav').removeClass('active');
            $('.drawer-nav').addClass('inactive');
        }else{
            $('.drawer-nav').addClass('active');
        }
    });
    
    //トップページに戻るボタン
    const toTop = $('#to-top');
    toTop.hide();
    $(window).scroll(function(){
        if($(this).scrollTop() > 200){
            toTop.fadeIn();
        }else{
            toTop.fadeOut();
        }
    });    
    
});

//メニューのカートの数値を書き換える
let cart_number = document.getElementById('cart-number');
let items= JSON.parse(localStorage.getItem('items'));
if(items !== null){
    cart_number.textContent = items.length;
}else{
    cart_number.textContent = 0;
}


//カートに入れた商品を配列として格納
let save_items = [];

function testes(){
    //JSONファイルを変換した配列をcart_listという名前に格納
    let cart_list = JSON.parse(localStorage.getItem('items'));

    //for文でcart_list配列から1つずつ取り出し、save_itemsの中にpushで再配置していく
    for(let item of cart_list){
        save_items.push(item);            
    }
    cart_number.textContent = save_items.length;
    cart_in_message.classList.remove('hidden');
    cart_message_number.textContent = items.length;
    cart_icon_number.textContent = items.length;
}

//カートアイコンの数字を書き換える
const cart_icon_number = document.getElementById('cart-icon-number');
if(items !== null){
    cart_icon_number.textContent = items.length;
}else{
    cart_icon_number.textContent = 0;
}


//seed値を任意に決めて生成する疑似乱数生成関数その１
class Random1 {
  constructor(seed = 88675123) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }
  
  // XorShift
  next() {
    let t;
 
    t = this.x ^ (this.x << 11);
    this.x = this.y; this.y = this.z; this.z = this.w;
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8)); 
  }
    
  // min以上max以下の乱数を生成する
  nextInt(min, max) {
    const r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  }
}

//疑似乱数生成関数その２
class Random2 {
  constructor(seed = 88675123) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }
  
  // XorShift
  next() {
    let t;
 
    t = this.x ^ (this.x << -11);
    this.x = this.y; this.y = this.z; this.z = this.w;
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8)); 
  }
    
  // min以上max以下の乱数を生成する
  nextInt(min, max) {
    const r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  }
}


//商品情報を配列に格納する
const image_box =  [
    {
        name: 'スピーカー',
        price: '3000',
        src: 'assets/image/audio_craft_speaker.png',
        alt: 'スピーカーの画像'
    },
    {
        name: 'スピーカー(業務用）',
        price: '200000',
        src: 'assets/image/bousai_gyousei_musen.png',
        alt: 'スピーカー(業務用）の画像'
    },
    {
        name: 'パソコンケース',
        price: '4000',
        src: 'assets/image/computer_case.png',
        alt: 'パソコンケースの画像'
    },
    {
        name: 'CPU',
        price: '18000',
        src: 'assets/image/computer_cpu.png',
        alt: 'CPUの画像'
    },
    {
        name: '電源',
        price: '8000',
        src: 'assets/image/computer_dengen_unit.png',
        alt: '電源の画像'
    },
    {
        name: 'グラフィックボード',
        price: '20000',
        src: 'assets/image/computer_graphic_card.png',
        alt: 'グラフィックボードの画像'
    },
    {
        name: 'HDD',
        price: '5000',
        src: 'assets/image/computer_hdd_sotoduke.png',
        alt: 'HDDの画像'
    },
    {
        name: 'キーボード',
        price: '1000',
        src: 'assets/image/computer_keyboard_black.png',
        alt: 'キーボードの画像'
    },
    {
        name: 'メモリー',
        price: '5000',
        src: 'assets/image/computer_memory.png',
        alt: 'メモリーの画像'
    },
    {
        name: 'マザーボード',
        price: '25000',
        src: 'assets/image/computer_motherboard.png',
        alt: 'マザーボードの画像'
    },
    {
        name: 'SSD',
        price: '8000',
        src: 'assets/image/computer_ssd_m2_NVMe.png',
        alt: 'SSDの画像'
    },
    {
        name: 'エレクトーン型キーボード',
        price: '10000',
        src: 'assets/image/electone.png',
        alt: 'キーボードの画像'
    },
    {
        name: 'マウスピース型マウス',
        price: '5000',
        src: 'assets/image/ha_retainer_mouthpiece.png',
        alt: 'マウスの画像'
    }
]




