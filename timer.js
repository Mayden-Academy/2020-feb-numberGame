const totalTime = 3;
let timeLeft;

function timer() {
    setTimeout(() => {
        if (timeLeft > 0) {
            timer();
        } else {
            let playerScore = document.querySelector('#player_score').textContent.replace('Score: ', '');
            document.querySelector('#game_over').style.display = 'flex';
            document.querySelector('#game').style.display = 'none';
            document.querySelector('#score_box').textContent = `Score: ${playerScore}`;
        }
        timeLeft--;
        displayTimeLeft(timeLeft);
    }, 1000);
}

function displayTimeLeft(time) {
    document.querySelector('#game_timer').textContent = `Timer: ${time}`;
}
