let timer = document.getElementById("timer");
let showTask = document.getElementById("task");
let startButton = document.getElementById("start");
let cycleButton = document.getElementById("cycle");

let timerSettings = document.getElementsByClassName("timerSetting");

let running = false; // if timer is running

let minutes = 0;
let seconds = 0;

let currentTask = "Work"; // either "Work" or "Break"

let interval;

let cycleMode = false; // if timer is in cycle mode
let numOfCycles = 1;   // number of cycles

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
    timer.textContent = `${minutesString}:${secondsString}`;

    // when a minute passes
    if (seconds > 60) {
        seconds = 0;
        minutes++;
    }

    // if the timer is in cycle mode
    if (cycleMode) {
        // work
        if (minutes == 25 && currentTask == "Work") {
            alert("Timer!");
            haltTimer();

            // if the cumber of cycles is a multiple of 4, use long break
            if (numOfCycles % 4 == 0) {
                currentTask = "Long Break";
                showTask.textContent = currentTask + " - Cycle";
            } else {
                currentTask = "Break";
                showTask.textContent = currentTask + " - Cycle";
            }
        }

        // long break
        if (minutes == 15 && currentTask == "Long Break") {
            alert("Timer!");
            haltTimer();
        }

        // short break
        if (minutes == 5 && currentTask == "Break") {
            alert("Timer!");
            haltTimer();
            currentTask = "Break";
            showTask.textContent = currentTask + " - Cycle";
            numOfCycles++;
        }
    } else {
        // work
        if (minutes == 25 && currentTask == "Work") {
            alert("Timer!");
            stopTimer();
        }

        // long break
        if (minutes == 15 && currentTask == "Long Break") {
            alert("Timer!");
            stopTimer();
        }

        // short break
        if (minutes == 5 && currentTask == "Break") {
            alert("Timer!");
            stopTimer();
        }
    }
}

// starts the cycle
// work, break, work, break, work, break, work, long break, repeat
function startCycle() {
    stopTimer();

    currentTask = "Work";
    showTask.textContent = currentTask + " - Cycle";

    cycleMode = true;
    numOfCycles = 1;
}

// wipe the timer, don't stop the timer
function clearTimer() {
    minutes = seconds = 0;
    timer.textContent = "00:00";
}

// completely stop the timer, clear cycle, alert user
function stopTimer() {
    clearInterval(interval);
    running = false;
    clearTimer();
    cycleMode = false;
    numOfCycles = 1;
}

// halt the timer
function haltTimer() {
    clearInterval(interval);
    running = false;
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
        stopTimer();
        currentTask = button.textContent;
        showTask.textContent = button.textContent;
    });
}

cycleButton.addEventListener("click", startCycle);