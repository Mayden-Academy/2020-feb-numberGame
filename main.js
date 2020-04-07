function generateNumbers() {
    let numbersOnScreen = Math.floor(Math.random() * 3) + 3;
    let allNumbers = [];

    for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        allNumbers.push(randNumber);
    }

    return allNumbers;
}

function displayNumbers(randomNumbers, currentScore) {
    const sortedNumbers = randomNumbers.slice(0).sort((a, b) => a - b);
    const numbersOnScreen = randomNumbers.length;
    let selectedOrder = [];

    document.querySelector('#play_area').textContent = '';

    // using a for loop instead of forEach as the array.pop changes the length over each iteration
    for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = randomNumbers.pop();
        let number = document.createElement('div');

        number.textContent = randNumber;
        number.setAttribute('class', 'numberBox');

        document.querySelector('#play_area').appendChild(number);
    }

    document.querySelectorAll('.numberBox').forEach((numberBox) => {
        numberBox.addEventListener('click', () => {
            const { textContent, classList } = numberBox;
            const numberBoxValue = parseInt(textContent);

            if (numberHasNotBeenClicked(classList)) {
                if (isNextNumber(sortedNumbers, selectedOrder, numberBoxValue)) {
                    selectedOrder.push(numberBoxValue);
                    classList.add('clicked');

                    if (allNumbersClicked(selectedOrder, sortedNumbers)) {
                        const randomNumbers = generateNumbers();

                        ++currentScore;

                        document.querySelector('#player_score').textContent = `Score: ${currentScore}`;

                        displayNumbers(randomNumbers, currentScore);
                    }
                } else {
                    timePenalty();
                    document.querySelectorAll('.clicked').forEach((chosenNumber) => {
                        chosenNumber.classList.remove('clicked');
                        selectedOrder = [];
                    });
                }
            }
        });
    });
}

function numberHasNotBeenClicked(elementClass) {
    return (!elementClass.contains('clicked'));
}

function isNextNumber(sortedNumbers, selectedOrder, numberBoxValue) {
    return (sortedNumbers[selectedOrder.length] === numberBoxValue);
}

function allNumbersClicked(selectedOrder, sortedNumbers) {
    return (selectedOrder.length === sortedNumbers.length);
}

function playGame() {
    const startingScore = 0;
    const randomNumbers = generateNumbers();
    timeLeft = totalTime; // restarts the timer to the maximum timer value when starting a new game

    document.querySelector('#splash_screen').style.display = 'none';
    document.querySelector('#game_over').style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    document.querySelector('#player_score').textContent = `Score: ${startingScore}`;

    displayTimeLeft(timeLeft);
    displayNumbers(randomNumbers, startingScore);
    timer();
}

function timePenalty() {
    const playArea = document.querySelector('#play_area');
    const penaltyScreen = document.querySelector('#penaltyScreen');

    playArea.style.display = 'none';
    penaltyScreen.style.display = 'flex';

    setTimeout(() => {
        playArea.style.display = 'flex';
        penaltyScreen.style.display = 'none';
    }, 2000);
}

document.querySelectorAll('.play_button').forEach((button) => {
    button.addEventListener('click', playGame);
});


