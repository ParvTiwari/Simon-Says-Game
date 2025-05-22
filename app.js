let gameSeq = [];
let userSeq = [];
let maxScore = 0;

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
document.addEventListener("keypress", function(){
    if(started == false){
        started = true;
        console.log("Game Started");
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let random = Math.floor(Math.random()*4);
    let randomColor = btns[random];
    let randBtn = document.querySelector(`.${randomColor}`);
    console.log(`Random = ${random}`);
    // console.log(randomColor);
    // console.log(randBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function check(idx){
    // console.log("Curr Level:", level);
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        maxScore = Math.max(maxScore, level);
        h2.innerHTML = `GAME OVER! Your score was <b>${level}</b> <br> Highest Score: ${maxScore} <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    check(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}