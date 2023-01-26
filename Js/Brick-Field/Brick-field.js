import {second_level} from '../Brick-blocks.js';
import {paddleHeight,paddleWidth,paddleY, paddleX, drawPaddle, Movepaddle, setPaddle_pos} from '../paddleScript.js';

const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");

const start = document.getElementById("start-play");
const stop = document.getElementById("stop-play");
let intervalID;

const selected_level = document.getElementById("Levels");
let bouncing_time = 20;

const score = document.getElementById("score-value");
const lives_remaining = document.getElementById("lives-remaining");

let score_value = 0;
let lives =3;

const game_over_alert= document.getElementById("Game-over");
const play_again_btn= document.getElementById("play-again");

play_again_btn.addEventListener('click',()=>{
    document.location.reload();
})

class Ball {

    static dx = 2;
    static dy = -2;

    constructor(xCenter, yCenter, r, alpha, theta) {
        this.x = xCenter;
        this.y = yCenter;
        this.radius = r;
        this.startAngel = alpha;
        this.endAngel = theta;
    }

    darw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngel, this.endAngel);
        ctx.fillStyle = "#77AAE4";
        ctx.strokeStyle = "#77AAE4";
        ctx.fill();
        ctx.stroke();
        this.x += Ball.dx;
        this.y += Ball.dy;
    }

    remove() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

};




function game_over() {
    game_over_alert.style.display="block";
    clearInterval(intervalID);

}


selected_level.addEventListener('change', (event) => {
    let level = event.target.value;
    switch (level) {
        case "intermediate":
            bouncing_time = 20;
            break;

        case "hard":
            bouncing_time = 10;
            break;

        default:
            bouncing_time = 30;
            break;
    }
})


let ball_XCenter = canvas.width / 2;
let ball_YCenter = canvas.height - 27;
const breaking_ball = new Ball(ball_XCenter, ball_YCenter, 7, 0, (2 * Math.PI));
breaking_ball.darw();
second_level();
drawPaddle();



function drawShape(shape) {
    shape.remove();
    shape.darw();

        // Bouncing off the walls 
        // Bouncing off Left & Right
        if (breaking_ball.x + Ball.dx > canvas.width - breaking_ball.radius || breaking_ball.x + Ball.dx < breaking_ball.radius) {
            Ball.dx = -Ball.dx;
        }

        // Bouncing off UP & Down
        if (breaking_ball.y + Ball.dy < breaking_ball.radius) 
        {
            Ball.dy = -Ball.dy;

        } 

        else if (breaking_ball.y === paddleY)
        {
            if( breaking_ball.x > paddleX && breaking_ball.x < paddleX + paddleWidth )
            {
                Ball.dy = -Ball.dy;
            }
        }

        else if (breaking_ball.y > canvas.height-breaking_ball.radius)
        {
                lives--;
                console.log(lives);
                lives_remaining.innerText = lives;
                if (!lives) {
                    game_over();
                  } 
                else {
                    breaking_ball.x = ball_XCenter;
                    breaking_ball.y = ball_YCenter;
                    setPaddle_pos((canvas.width - paddleWidth) / 2);
                  }
            }
    second_level();
    drawPaddle();
    Movepaddle();
}


start.addEventListener("click", () => {
    intervalID = setInterval(() => {
        drawShape(breaking_ball);
    }, bouncing_time);

})

stop.addEventListener("click", () => {
    clearInterval(intervalID);
    breaking_ball.remove();
    breaking_ball.x = ball_XCenter;
    breaking_ball.y = ball_YCenter;
    breaking_ball.darw();
    second_level();
    drawPaddle();
})

export{paddleWidth, paddleX, paddleHeight ,drawPaddle,Movepaddle} ;