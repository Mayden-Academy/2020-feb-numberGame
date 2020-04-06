let timeLeft = 30;

function timer() {
    setTimeout(() => {
        if (timeLeft > 0) {
            timer();
        } else {
            return;
        }

        timeLeft--;
        document.querySelector('#game_timer').textContent = `Timer: ${timeLeft}`;
    }, 1000);
}
