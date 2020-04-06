const totalTime = 30;
let timeLeft = totalTime;

function timer() {
    setTimeout(() => {
        if (timeLeft > 0) {
            timer();
        } else {
            return;
        }
        timeLeft--;
        displayTimeLeft(timeLeft);
    }, 1000);
}

function displayTimeLeft(time) {
    document.querySelector('#game_timer').textContent = `Timer: ${time}`;
}
