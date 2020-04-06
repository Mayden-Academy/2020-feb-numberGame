function generateNumbers() {
    let numbersOnScreen = Math.floor(Math.random() * 3) + 3;
    let allNumbers = [];

    for (i = 0; i < numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        allNumbers.push(randNumber);
    }

    return allNumbers;
}

function displayNumbers(allNumbers) {
    let numbersOnScreen = allNumbers.length;

    for (i = 0; i < numbersOnScreen; i++) {
        let randNumber = allNumbers.pop();
        let number = document.createElement('div');

        number.textContent = randNumber;
        number.setAttribute('class', 'numberBox');
        document.querySelector('#play_area').appendChild(number);
    }
}

let randomNumbers = generateNumbers();

displayNumbers(randomNumbers);

document.querySelector('#start').addEventListener('click', () => {
    document.querySelector('#splash').style.display = 'none';
    document.querySelector('#game').style.display = 'block';
});

function timePenalty() {
    let playArea = document.querySelector('#play_area');
    let penaltyScreen = document.querySelector('#penaltyScreen');

    playArea.style.display = 'none';
    penaltyScreen.style.display = 'flex';

    setTimeout((evt) => {
        playArea.style.display = 'flex';
        penaltyScreen.style.display = "none"
    }, 2000);
}