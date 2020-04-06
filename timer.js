let now = 30;

function timer() {

    setTimeout(() => {
        if (now > 0) {
            timer();
        }
        document.querySelector('#game_timer').textContent = "Timer: " + now;
        now--;

    }, 1000);
}
