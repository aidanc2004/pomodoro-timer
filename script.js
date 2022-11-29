let timer = document.getElementById("timer");
let showTask = document.getElementById("task");
let startButton = document.getElementById("start");

let timerSettings = document.getElementsByClassName("timerSetting");

let running = false; // if timer is running

let minutes = 0;
let seconds = 0;

let numOfCycles = 1; // pomodoro technique cycles

let currentTask = "Work"; // either "Work" or "Break"

let interval;

function updateTimer() {
    seconds++;

    // if a minute has passed, update minutes and seconds
    if (seconds == 60) {
        minutes++;
        seconds = 0;
    }

    // string representation of numbers with padding 0
    let minutesString = minutes.toString().padStart(2, "0");
    let secondsString = seconds.toString().padStart(2, "0");

    // show new time
    timer.textContent = `${minutesString}:${secondsString}`

    // when a minute passes
    if (seconds > 60) {
        seconds = 0;
        minutes++;
    }

    // work
    if (minutes == 25 && currentTask == "Work") {
        clearTimer();
    }

    // long break
    if (minutes == 15 && currentTask == "Long Break") {
        clearTimer();
    }

    // short break
    if (minutes == 5 && currentTask == "Break") {
        clearTimer();
    }
}

// wipe the timer
function clearTimer() {
    clearInterval(interval);
    running = false;
    minutes = seconds = 0;
    timer.textContent = "00:00";
}

// start the timer
startButton.addEventListener("click", () => {
    // make sure you cant have it going multiple times
    if (running == false) {
        interval = setInterval(updateTimer, 1000);
        running = true;
    }
    // TODO: pause timer
})

// setup buttons
for (let i = 0; i < timerSettings.length; i++) {
    let button = timerSettings[i];

    button.addEventListener("click", () => {
        currentTask = button.textContent;
        showTask.textContent = button.textContent;
        clearTimer();
    });
}