let time = 25 * 60; // 25 minutes
let timerInterval = null;

const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const focusBtn = document.getElementById("focusBtn");
const breakBtn = document.getElementById("breakBtn");

// update display
function updateDisplay() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = `${minutes}:${seconds}`;
}

// start timer
startBtn.addEventListener("click", () => {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up!");
        }
    }, 1000);
});

// pause timer
pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// reset timer
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 25 * 60;
    updateDisplay();
});

// focus mode
focusBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 25 * 60;
    updateDisplay();
});

// break mode
breakBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 5 * 60;
    updateDisplay();
});

// initial display
updateDisplay();