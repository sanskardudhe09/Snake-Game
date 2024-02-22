let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let currScore = 0;
let gameOver = false;
const gameBoard = document.querySelector(".game-board");
const score = document.querySelector(".score");
const highScoreElem = document.querySelector(".high-score");
const icons = document.querySelectorAll(".icons i");
let highScore =  localStorage.getItem("high-score") || 0;
highScoreElem.innerText = `Highest Score: ${highScore}`;
const gameOverAlert = () => {
    alert("Game Over!!..Press OK to replay");
    location.reload();
}
icons.forEach(button => button.addEventListener("click", ()=>
    changeDir({key: button.dataset.key})
));
const changeDir = (e) => {
    if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocity != -1){
        velocityX = 0;
        velocityY = 1;
    }
    initGame();
}
const changeFoodPos = () => {
    foodX = Math.floor(Math.random(0, 1)*25) + 1;
    foodY = Math.floor(Math.random(0, 1)*25) + 1;
}
const initGame = () => {
    if(gameOver){
        return gameOverAlert();
    }
    let x = `<div class="snake-food" style="grid-area:
    ${foodY} / ${foodX}"></div>`;
    //snakeX += velocityX;
    //snakeY += velocityY;
    //snake has eaten the food!!..so increase the snake-body part.
    if(snakeX == foodX && snakeY == foodY){
        changeFoodPos();
        snakeBody.push([foodX, foodY]);
        console.log(snakeBody);
        currScore++;
        score.innerText = `Total Score: ${currScore}`;
        highScore = currScore >= highScore ? currScore : highScore;
        localStorage.setItem("high-score", highScore);
        highScoreElem.innerText = `Highest Score: ${highScore}`;
    }
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;
    //check if snake collides with the wall
    if(snakeX <= 0 || snakeX > 25 || snakeY <= 0 || snakeY > 25){
        gameOver = true;
    }
    for(let i = 0; i < snakeBody.length; i++){
        //checks if snake collides with its body part
        if(i != 0 && snakeBody[0][0] === snakeBody[0][1] && snakeBody[0][1] 
            === snakeBody[[i][1]] ){
                return gameOver = true;
            }
        x += `<div class="snake-head" style="grid-area:
        ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    gameBoard.innerHTML = x;
}
changeFoodPos();
initGame();
document.body.addEventListener("keydown", changeDir);