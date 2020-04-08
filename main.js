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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function arrayCheckEqualsAsc(array) {
    const ascArray = array.slice(0).sort((a, b) => a - b);

    for (let i = 0, l = array.length; i < l; i++) {
        if (array[i] !== ascArray[i]) {
            return false;
        }
    }

    return true;
}

function arrayCheckEqualsDesc(array) {
    const descArray = array.slice(0).sort((a, b) => b - a);

    for (let i = 0, l = array.length; i < l; i++) {
        if (array[i] !== descArray[i]) {
            return false;
        }
    }

    return true;
}

function generateNumbers() {
    let numbersOnScreen = Math.floor(Math.random() * 3) + 3;
    let allNumbers = [];

    for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        if (allNumbers.includes(randNumber)) {
            i--; //this makes the for loop run an additional time.
        } else {
            allNumbers.push(randNumber);
        }
    }

    while ((arrayCheckEqualsAsc(allNumbers)) || (arrayCheckEqualsDesc(allNumbers))) {
        allNumbers = shuffleArray(allNumbers);
    }

    return allNumbers;
}

function displayNumbers(randomNumbers, currentScore) {
    const sortedNumbers = randomNumbers.slice(0).sort((a, b) => a - b);
    const numbersOnScreen = randomNumbers.length;
    let selectedOrder = [];

    generatePositions(numbersOnScreen, randomNumbers, currentScore);

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

function generatePositions(numbersOnScreen, randomNumbers, currentScore) {
    if (currentScore >= 4) {
        const table = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15]
        ];
        let positionValues = [];

        document.querySelector('#play_area').innerHTML = grid;

        // using a for loop instead of forEach as the array.pop changes the length over each iteration
        for (let i = 0; i < numbersOnScreen; i++) {
            const possibleLocations = document.querySelectorAll('.placeholder:not(.numberBox)');
            const position = Math.floor(Math.random() * Math.floor(possibleLocations.length));

            possibleLocations[position].textContent = randomNumbers.pop();
            possibleLocations[position].dataset.position = String(position);
            possibleLocations[position].classList.add('numberBox');
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
                generatePositions(numbersOnScreen, randomNumbers, currentScore);
            }
        });
    } else {
        document.querySelector('#play_area').textContent = '';

        for (let i = 0; i < numbersOnScreen; i++) {
            let randNumber = randomNumbers.pop();
            let number = document.createElement('div');

            number.textContent = randNumber;
            number.classList.add('numberBox');
            number.classList.add('card');
            document.querySelector('#play_area').appendChild(number);
        }
    }
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


