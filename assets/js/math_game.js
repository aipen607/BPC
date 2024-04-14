'use strict';

let numberX;//1~numberXの中から数字を選ぶ
const user_setNumber = document.getElementById('user-setNumber');
const timerBox = document.getElementById('timer-box');
const elapsedTimerBox = document.getElementById('elapsedTimer-box');
const user_setTime = document.getElementById('user-setTime');
let limiteTime;//制限時間
let elapsedTime;//経過時間
let target_grobal;//スタートボタンを押したときの+limiteTime後の時間
let target_grobal_elapsed;//スタートボタンを押したときの時間
let rest;//残り時間
let animateId;//requestAnimationFrameを終了させるための値

function show_restTime(){
    const now = new Date();
    rest = target_grobal - now;
    
    let mm = Math.floor(rest / 1000 / 60);
    let ss = Math.floor(rest / 1000 % 60);
    let ms = Math.floor(rest % 1000);
    mm = ('0' + mm).slice(-2);
    ss = ('0' + ss).slice(-2);
    ms = ('00' + ms).slice(-3);
    timerBox.textContent = `残り時間：${mm}分${ss}.${ms}秒`;
}

function show_elapsedTime(){
    const now = new Date();
    elapsedTime = now - target_grobal_elapsed;
    
    let emm = Math.floor(elapsedTime / 1000 / 60);
    let ess = Math.floor(elapsedTime / 1000 % 60);
    let ems = Math.floor(elapsedTime % 1000);
    emm = ('0' + emm).slice(-2);
    ess = ('0' + ess).slice(-2);
    elapsedTimerBox.textContent = `所要時間：${emm}分${ess}.${ems}秒`;
}

function countdownTimer(){
//    show_restTime();
//    show_elapsedTime();
//    const now = new Date();
//    rest = target_grobal - now;
//    elapsedTime = now - target_grobal_elapsed;
//    
//        let mm = Math.floor(rest / 1000 / 60);
//        let ss = Math.floor(rest / 1000 % 60);
//        let ms = Math.floor(rest % 1000);
//        mm = ('0' + mm).slice(-2);
//        ss = ('0' + ss).slice(-2);
//        ms = ('0' + '0' + ms).slice(-3);
//    
//        let emm = Math.floor(elapsedTime / 1000 / 60);
//        let ess = Math.floor(elapsedTime / 1000 % 60);
//        let ems = Math.floor(elapsedTime % 1000);
//        emm = ('0' + emm).slice(-2);
//        ess = ('0' + ess).slice(-2);
//        ems = ('0' + '0' + ems).slice(-3);
//    
    if(rest <= 0){
//        rest = 0;
        timerBox.textContent = `Time up.`;
        lastResult.textContent = "!!!GAME OVER!!!";
        lastResult.style.backgroundColor = "#ff554d";
        lowOrHi.textContent = "";
        correctNumber.textContent = `正解の数字は「${randomNumber}」`;
        setGameOver();
    }else{
        show_restTime();
//        timerBox.textContent = `残り時間：${mm}分${ss}.${ms}秒`;
        animateId = window.requestAnimationFrame(countdownTimer);
    }
}



let randomNumber = Math.floor(Math.random() * numberX + 1);
const startBtn_box = document.querySelector('.startBtn-box');
const startBtn = document.getElementById('startBtn');
const form = document.querySelector('.form');
const guesses = document.querySelector(".guesses");
const restGuesses = document.querySelector(".restGuesses");
const correctNumber= document.querySelector('.correctNumber');
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let restGuessCount = 10;
let guessCount = 1;
let resetButton;

startBtn.addEventListener('click', function(){
    if(user_setNumber.value === ''){
        numberX = 1000;
        user_setNumber.value = 1000;
        numberX = Number(user_setNumber.value);
        randomNumber = Math.floor(Math.random() * numberX + 1);
    }else{
        numberX = Number(user_setNumber.value);
        randomNumber = Math.floor(Math.random() * numberX + 1);
    }
    
    if(user_setTime.value === ''){
        limiteTime = 60;
        user_setTime.value = 60;
    }else{
        limiteTime = parseInt(user_setTime.value);
    }
    
    const now = new Date();
    const thisYear = now.getFullYear();
    const thisMonth = now.getMonth();
    const thisDate = now.getDate();
    const thisHours = now.getHours();
    const thisMinutes = now.getMinutes();
    const thisSeconds = now.getSeconds();
    const thisMilliSeconds = now.getMilliseconds();
    const targetElapse = now;
    const targetTime = new Date(thisYear, thisMonth, thisDate, thisHours, thisMinutes, thisSeconds + limiteTime, thisMilliSeconds);
    target_grobal_elapsed = targetElapse;
    target_grobal = targetTime;
    show_restTime();
    show_elapsedTime();
    countdownTimer();
    startBtn_box.classList.add('hidden');
    form.classList.remove('hidden');
    guessField.focus();
    timerBox.classList.remove('hidden');
    user_setNumber.disabled = true;
    user_setTime.disabled = true;
});

const submit = document.getElementById('submit');
submit.addEventListener('click', (e) =>{
    e.preventDefault();
})


function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
    guesses.textContent = "履歴：";
    }
    guesses.textContent = `${guesses.textContent} ${userGuess}`;
    restGuesses.textContent = `残りの回数：${restGuessCount -1}`;

    if (userGuess === randomNumber) {
    lastResult.textContent = "!!!GAME CLEAR!!!";
    lastResult.style.backgroundColor = "#85ff85";
    window.cancelAnimationFrame(animateId);
    lowOrHi.textContent = "";
    correctNumber.textContent = `正解の数字は「${randomNumber}」`;
    timerBox.classList.add('hidden');
    elapsedTimerBox.classList.remove('hidden');
    show_elapsedTime();
    setGameOver();
    } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    lastResult.style.backgroundColor = "#ff554d";
    window.cancelAnimationFrame(animateId);
    lowOrHi.textContent = "";
    correctNumber.textContent = `正解の数字は「${randomNumber}」`;
    setGameOver();
    } else {
    lastResult.textContent = "違います!";
    lastResult.style.backgroundColor = "#ff554d";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "正解の数字は、入力した数字より大きいです！";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "正解の数字は、入力した数字より小さいです！";
    }
    }

    guessCount++;
    restGuessCount--;
    guessField.value = "";
    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.classList.add('reset-btn');
    resetButton.textContent = "もう一度挑戦する";
    
    const resultParas = document.querySelector('.resultParas');
    resultParas.append(resetButton);
    resetButton.addEventListener("click", () =>{
        resetGame();                         
        startBtn_box.classList.remove('hidden');
        form.classList.add('hidden');
        timerBox.classList.add('hidden');
        elapsedTimerBox.classList.add('hidden');
    });
}

function resetGame() {
    restGuessCount = 10;
    guessCount = 1;

    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
    resetPara.textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    user_setNumber.disabled = false;
    user_setTime.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * numberX) + 1;
}




