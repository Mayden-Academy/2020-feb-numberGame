// This is used to pre-fill the grid, the dot is used to act as content to space it out.
const grid = `
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
    <div class="placeholder">.</div>
`;

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

    document.querySelector('#play_area').innerHTML = grid;

    generatePositions(numbersOnScreen, randomNumbers);

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

function generatePositions(numbersOnScreen, randomNumbers) {
    const table = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
    ];
    let positionValues = [];

    // using a for loop instead of forEach as the array.pop changes the length over each iteration
    for (let i = 0; i < numbersOnScreen; i++) {
        const cards = document.querySelectorAll('.placeholder:not(.numberBox)');
        const position = Math.floor(Math.random() * Math.floor(cards.length));

        cards[position].textContent = randomNumbers.pop();
        cards[position].dataset.position = String(position);
        cards[position].classList.add('numberBox');
    }

    document.querySelectorAll('.numberBox').forEach((numberBox) => {
        positionValues.push(numberBox.dataset.position);
    });


    table.forEach((row) => {
        let occurrences = 0;

        positionValues.forEach((value) => {
            if (row.includes(Number(value))) {
                occurrences++;
            }
        });

        if (occurrences > numbersOnScreen - 1) {
            generatePositions(numbersOnScreen, randomNumbers);
        }
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

function hideScreen(cssTag) {
    document.querySelector(cssTag).style.display = 'none';
}

function makeScreenFlex(cssTag) {
    document.querySelector(cssTag).style.display = 'flex';
}

function playGame() {
    const startingScore = 0;
    const randomNumbers = generateNumbers();

    timeLeft = totalTime; // restarts the timer to the maximum timer value when starting a new game

    hideScreen('#splash_screen');
    hideScreen('#game_over');
    makeScreenFlex('#game');

    document.querySelector('#player_score').textContent = `Score: ${startingScore}`;

    displayTimeLeft(timeLeft);
    displayNumbers(randomNumbers, startingScore);
    timer();
}

function timePenalty() {
    hideScreen('#play_area');
    makeScreenFlex('#penaltyScreen');

    setTimeout(() => {
        makeScreenFlex('#play_area');
        hideScreen('#penaltyScreen');
    }, 2000);
}

document.querySelectorAll('.play_button').forEach((button) => {
    button.addEventListener('click', playGame);
});


