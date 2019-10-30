const ctx = document.getElementById("example").getContext('2d');  

let score = 0;
  
class Game{
    constructor(){
        this.theHero = new Hero(180, 380, 40,50),
        this.obstacleArray = []
        this.coinArray = []
    }

    spawnObstacle(){
        let rX = Math.floor(Math.random() * 400);
        let rY = 0;
        let newObstacle = new Obstacle(rX, rY, 90, 100);
        this.obstacleArray.push(newObstacle);
        newObstacle.moveDownForever();
    }

    clearUnusedObstacles(){
        this.obstacleArray.forEach((ob, i)=>{
            if(ob.y > 400){
                this.obstacleArray.splice(i, 1)
            }
        })
    }

  

    spawnCoin(){
        let rX = Math.floor(Math.random() * 400);
        let rY = 0;
        let newCoin = new Coin(rX, rY, 40, 40);
        this.coinArray.push(newCoin);
        newCoin.moveDownForever();
    }

    clearUnusedCoins2(){
        this.coinArray.forEach((ob, i)=>{
            if(ob.y > 400){
                this.coinArray.splice(i, 1)
            }
        })
    }

    clearUnusedCoins1() {
        this.coinArray.forEach((obs, i)=>{
            if (futureX + this.theHero.width >= obs.x && futureX <= obs.x + obs.width 
                && futureY + this.theHero.height >= obs.y && futureY <= obs.y + obs.height){
                    this.coinArray.splice(i, 1)
        }
    })
}

    collisionDetect(futureX, futureY){
        let canMove = true;

        this.obstacleArray.forEach((obs)=>{

            console.log(futureX, futureY, this.theHero.width, this.theHero.height, obs.x, obs.y, obs.width, obs.height)

           
        if(futureX + this.theHero.width - 20 >= obs.x && futureX <= obs.x + obs.width - 20
            && futureY + this.theHero.height - 20 >= obs.y && futureY <= obs.y + obs.height - 20){
                canMove = false
                score -= 300;
                document.querySelector("body > div:nth-child(1) > span").innerText = score;
                //alert("game over");
             }
        })

        this.coinArray.forEach((obs)=>{
        if (futureX + this.theHero.width >= obs.x && futureX <= obs.x + obs.width 
            && futureY + this.theHero.height >= obs.y && futureY <= obs.y + obs.height){
                score += 300;
                document.querySelector("body > div:nth-child(1) > span").innerText = score;
                this.clearUnusedCoins1;
                //alert("game over");
             }
        })
        return canMove;
    }
}



class Hero{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }  
}
Hero.prototype.move = moveHero;

const carImg = new Image();
carImg.src = "./images/car.png"

const  lionImg = new Image();
lionImg.src = "./images/lion.png"

const  coinImg = new Image();
coinImg.src = "./images/coin.png"

const  treeImg = new Image();
treeImg.src = "./images/tree.png"




function drawSelf(u, obs){
    if(obs == 1){
            ctx.drawImage(coinImg, u.x, u.y, u.width, u.height);
        }   
    if(obs == 2) {
            ctx.drawImage(carImg, u.x, u.y, u.width, u.height);
        }
    if(obs == 3) {
            ctx.drawImage(lionImg, u.x, u.y, u.width, u.height);
        }
        //ctx.fillRect(u.x, u.y, u.width, u.height)
    }

let frames = 0;

function mainLoop(){
    frames++;

    ctx.clearRect(0,0,400,600);

    // this is where we draw the hero
    drawSelf(theGame.theHero, 2);
    // then we draw all the obstacles
    theGame.obstacleArray.forEach((eachObstacle)=>{
        drawSelf(eachObstacle, 3)
    })

    //then we draw the coins
    theGame.coinArray.forEach((eachCoin)=>{
        drawSelf(eachCoin, 1)
    })

    if(frames % 100 === 0){
        theGame.spawnObstacle();
        theGame.spawnCoin()
    }


    requestAnimationFrame(mainLoop);
}



function moveHero(futureX, futureY){

    if(futureX + this.width <= 400 && futureX >= 0 && futureY + this.height <= 600 && futureY >= 0){
        this.x = futureX;
        this.y = futureY;
    }
    // if(futureX + hero.width >= 400){

    //     hero.x = futureX

    //     setTimeout(()=>{
    //         hero.x -= 30;
    //         hero.width = 35;
    //         hero.height = 35;
    //     },100)
        

    //     setTimeout(()=>{
    //         hero.width = 20;
    //         hero.height = 20;
    //     },200)
    // }
}

let speed = 15;


document.onkeydown = function(e){

 

    // if(e.key === "ArrowUp"){
    //     if(
    //         theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y -speed)
    //     ){
    //         theGame.theHero.move(theGame.theHero.x, theGame.theHero.y -speed)
    //     }

    // }
    // if(e.key === "ArrowDown"){
    //     if(
    //         theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y +speed)
    //     ){
    //         theGame.theHero.move(theGame.theHero.x, theGame.theHero.y +speed)
    //     }
       
    // }
    if(e.key === "ArrowLeft"){
        if(
            theGame.collisionDetect(theGame.theHero.x - speed, theGame.theHero.y)
        ){
            theGame.theHero.move(theGame.theHero.x - speed, theGame.theHero.y)
        }
    }
    if(e.key === "ArrowRight"){
        if(
            theGame.collisionDetect(theGame.theHero.x + speed, theGame.theHero.y)
        ){
            theGame.theHero.move(theGame.theHero.x + speed, theGame.theHero.y)
        }
    }
}
   


class Obstacle{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    moveDownForever(){
       let blah = setInterval(()=>{
        //    each setInterval function gets a unique ID
        // were using blah here to save this ID
            this.y += 10;

            if(this.y > 600){
                clearInterval(blah)
            }

        },100)


    }

}

class Coin{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    moveDownForever(){
       let blah = setInterval(()=>{
        //    each setInterval function gets a unique ID
        // were using blah here to save this ID
            this.y += 10;

            if(this.y > 600){
                clearInterval(blah)
            }

        },100)

    }
}

document.getElementById('start-button').onclick = startGame;


let theGame;

function startGame(){    
     theGame = new Game();
    mainLoop();
}

function scoredown(){}