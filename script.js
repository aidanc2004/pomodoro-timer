let timer = document.getElementById("timer");

let startButton = document.getElementById("start");

let running = false; // if timer is running

let seconds = 0;
let minutes = 0;

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

    // if seconds are greater 
    if (seconds > 60) {
        seconds = 0;
        minutes++;
    }
}

startButton.addEventListener("click", () => {
    // make sure you cant have it going multiple times
    if (running == false) {
        setInterval(updateTimer, 1000);
        running = true;
    }
})