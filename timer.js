const totalTime = 30;
let timeLeft;

function timer() {
    setTimeout(() => {
        if (timeLeft > 0) {
            timer();
        } else {
            let playerScore = document.querySelector('#player_score').textContent.replace('Score: ', '');

            makeScreenFlex('#game_over');
            hideScreen('#game');
            document.querySelector('#score_box').textContent = `Score: ${playerScore}`;
            return;
        }
        timeLeft--;
        displayTimeLeft(timeLeft);
    }, 1000);
}

function displayTimeLeft(time) {
    document.querySelector('#game_timer').textContent = `Timer: ${time}`;
}
