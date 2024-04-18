'use strict';

const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById('type-display');
const typeInput = document.getElementById('typeInput');
const typingTimer = document.getElementById('typing-timer');
typingTimer.innerText = '00.00.00';
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const setQuestionTime = document.getElementById('setQuestionTime');//1問当たりの時間を決める
const setQuestionNumber = document.getElementById('setQuestionNumber');//問題の数を決める
let animateId;
let originTime;
let letterNumber = 0;
let totalLetterNumber = 0;
let questionNumber = 0;

// 更新直後はスタートボタンを押さないとテキストエリアに入力できないようにする
if(stopBtn.classList.contains('hidden')){
    typeInput.disabled = true;
}

startBtn.addEventListener('click', () => {
    typeInput.focus();
    typeInput.disabled = false;
    startBtn.classList.add('hidden');
    stopBtn.classList.remove('hidden');
    stopBtn.classList.remove('restart');
    
    originTime = Number(setQuestionTime.value);
    if(setQuestionTime.value === ''){
        setQuestionTime.value = 40;
        originTime = 40;
    }
    if(setQuestionNumber.value === ''){
        setQuestionNumber.value = 5;
    }
    questionNumber = 0;
    totalLetterNumber = 0;
    
    RenderNextSentence();
});

stopBtn.addEventListener('click', () => {
    questionNumber = 0;
    startBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    stopBtn.classList.add('restart');
    RenderNextSentence();
});

//文章をランダムに取得する
function GetRandomSentence(){
    return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

//取得した文章を表示する
async function RenderNextSentence(){
    if(stopBtn.classList.contains('restart')){
        return;
    }else if(questionNumber === Number(setQuestionNumber.value)){
        window.cancelAnimationFrame(animateId);
        typingTimer.innerText = '00.00.00';
        stopBtn.classList.add('hidden');
        startBtn.classList.remove('hidden');
        typeInput.value = '';
        typeDisplay.innerText = `お疲れさまでした。今回の合計文字数は「${totalLetterNumber}」文字でした。`
        return;
    }
    
    const sentence = await GetRandomSentence();
    typeDisplay.innerText = '';
    
    let oneText = sentence.split('');
    oneText.forEach((character, index) => {
       const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        typeDisplay.appendChild(characterSpan);
        letterNumber = index + 1;
    });
    
    typeInput.value = '';
    
    StartTimer();
    questionNumber++;
    totalLetterNumber += letterNumber;
}


typeInput.addEventListener('input', () =>{
    const sentenceArray = typeDisplay.querySelectorAll('span');
    const arrayValue = typeInput.value.split('');
    
    let correct = true;
    sentenceArray.forEach((characterSpan, index) =>{
        if((arrayValue[index] == null)){
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect')
            correct = false;
        }else if(characterSpan.innerText === arrayValue[index]){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }else{
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    });
    
    if(correct === true){
        RenderNextSentence();
        window.cancelAnimationFrame(animateId);
    }
});

let startTime;
//let originTime = Number(setQuestionTime.value);

function StartTimer(){
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();
    const h = now.getHours();
    const mm = now.getMinutes();
    const ss = now.getSeconds();
    startTime = new Date(y, m, d, h, mm, ss + originTime);
    calcTime();
}

function calcTime(){
    let now = new Date();
    let rest = startTime - now;
    
    let mm = Math.floor(rest / 1000 /60) % 60;
    let ss = Math.floor(rest / 1000) % 60;
    let ms = Math.floor((rest % 1000) / 10);
    
    mm = ('0' + mm).slice(-2);
    ss = ('0' + ss).slice(-2);
    ms = ('0' + ms).slice(-2);
    
    typingTimer.innerText = `${mm}.${ss}.${ms}`;
    animateId = window.requestAnimationFrame(calcTime);
    
    if(rest > 5000){
        typingTimer.style.color = 'rgb(0 151 0)';
    }else if(rest > 0 && rest <= 5000){
        typingTimer.style.color = 'red';
    }else if(rest <= 0){
        typingTimer.innerText = '00.00.00';
        window.cancelAnimationFrame(animateId);
        RenderNextSentence();
    }
    
    if(stopBtn.classList.contains('restart')){
        window.cancelAnimationFrame(animateId);
        typingTimer.innerText = '00.00.00';
    }
}