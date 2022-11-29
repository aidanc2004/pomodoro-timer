let timer = document.getElementById("timer");
let cycle = document.getElementById("cycle");
let startButton = document.getElementById("start");

let running = false; // if timer is running

let minutes = 0;
let seconds = 0;

let numOfCycles = 0; // pomodoro technique cycles

let task = "Break"; // either "Work" or "Break"

function updateTimer() {
    seconds++;

    cycle.textContent = `${task} - Cycle: ${numOfCycles}`;

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

    if (minutes == 25 && task == "Work") {
        task = "Break";
        seconds = 0;
        minutes = 0;
    }

    // if the cycle is a multiple of four, use long break
    if (numOfCycles % 4 == 0) {
        // long break;
        if (minutes == 15 && task == "Rest") {
            task = "Work"
            seconds = 0;
            minutes = 0;
            numOfCycles++;
        }
    } else {
        // short break
        if (minutes == 5 && task == "Rest") {
            task = "Work"
            seconds = 0;
            minutes = 0;
            numOfCycles++;
        }
    }
}

startButton.addEventListener("click", () => {
    // make sure you cant have it going multiple times
    if (running == false) {
        //numOfCycles = 1;
        setInterval(updateTimer, 1000);
        running = true;
    }
})