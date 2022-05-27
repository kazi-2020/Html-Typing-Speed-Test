let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let parent = document.querySelector(".canvas-parent");

let parent_height = parent.clientHeight;
let parent_width = parent.clientWidth;

//let ch = canvas.clientHeight;
//let cw = canvas.clientWidth;

canvas.height = parent_height;
canvas.width = parent_width;

context.textAlign = "center";
context.textBaseline = "middle";
context.fillText(
    "Click this area.",
    canvas.height/2,
    canvas.width/2
);

let start = document.getElementById("start");
let time_text = document.getElementById("time-text");

let GameStatus = {
    STOP: 1,
    START: 2,
};

let status = GameStatus.STOP;

function get_random_time(min, max) {
    let result = Math.random() * (max - min) + min;
    result = Math.floor(result * 1000);
    //console.log(result);
    return result;
}

function end_game() {
    //console.log('game has ended');
    clearTimeout(timeout2);
    clearTimeout(timeout1);
    canvas.style.background = "transparent";
    start.innerHTML = "Start";
    status = GameStatus.STOP;
}

function timeout1_function(time) {
    timeout1 = setTimeout(function () {
        canvas.style.background = "rgb(40, 117, 67)";
        let date1 = new Date();
        time_now = date1.getTime();
        //console.log(timenow);
        canvas.addEventListener("click", function () {
            let date2 = new Date();
            time_later = date2.getTime();
            play_time = time_later - time_now;
            time_text.innerHTML = play_time + "ms";
        });
    }, time);
}

function timeout2_function(time) {
    timeout2 = setTimeout(function () {
        end_game();
    }, time);
}

function start_game() {
    //console.log('started game');
    let change_time = get_random_time(3, 5);
    let end_time = change_time + 3000;
    status = GameStatus.START;
    canvas.style.background = "rgb(135, 34, 34)";

    timeout1_function(change_time);
    timeout2_function(end_time);
}

start.addEventListener("click", function () {
    if (status === GameStatus.START) {
        end_game();
    } else {
        start_game();
        this.innerHTML = "Stop";
    }
});

canvas.addEventListener("click", function () {
    end_game();
});
