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

function generateEasyNumbers(numbersWanted, useNegative = false) {
    let allNumbers = [];
    let randNumber;

    while (allNumbers.length < numbersWanted) {
        if (useNegative) {
            randNumber = Math.floor(Math.random() * 201) - 100;
        } else {
            randNumber = Math.floor(Math.random() * 101);
        }

        if (!allNumbers.includes(randNumber)) {
            allNumbers.push(randNumber);
        }
    }

    return allNumbers;
}

function generateHardNumbers(numbersWanted, existingNumbers = []) {
    const allocatedNumber = getBetween0And9();
    const totalNumbers = numbersWanted + existingNumbers.length;
    let randNumber;
    let allNumbers = [...existingNumbers];

    while (allNumbers.length < totalNumbers) {
        randNumber = generateSimilarNumber(allocatedNumber);
        randNumber = randomiseSign(randNumber);

        if (!allNumbers.includes(randNumber)) {
            allNumbers.push(randNumber);
        }
    }

    return allNumbers;
}

function getBetween0And9() {
    return (Math.floor(Math.random() * 10));
}

function getBetween0And10() {
    return (Math.floor(Math.random() * 11));
}

function randomiseSign(randNumber) {
    if (Math.random() < 0.5) {
        randNumber = (0 - randNumber);
    }

    return randNumber;
}

function generateSimilarNumber(allocatedNumber) {
    const rand1in11chance = getBetween0And10();
    let randNumber;

    if (rand1in11chance === 10) {
        randNumber = allocatedNumber;
    } else {
        let randSecondNumber =  getBetween0And9();
        randNumber = parseInt(`${allocatedNumber}${randSecondNumber}`);
    }

    return randNumber;
}

function generateNumbers(score = 0) {
    let numberArray;
    let numbersWanted = Math.floor(Math.random() * 3) + 3;
    let firstNumbersGenerated = [];
    const useNegative = true;

    switch (score) {
        case 0:
        case 1:
        case 2:
            numberArray = generateEasyNumbers(numbersWanted);
            break;
        case 3:
        case 4:
            numberArray = generateEasyNumbers(numbersWanted, useNegative);
            break;
        case 5:
        case 6:
            // gets 1-3 easy numbers and adds 2 similar numbers to array
            firstNumbersGenerated = generateEasyNumbers(numbersWanted - 2, useNegative);
            numberArray = (generateHardNumbers(2, firstNumbersGenerated));
            break;
        case 7:
        case 8:
            // gets 0-2 easy numbers and adds 3 similar numbers to array
            firstNumbersGenerated = generateEasyNumbers(numbersWanted - 3, useNegative);
            numberArray = (generateHardNumbers(3, firstNumbersGenerated));
            break;
        case 9:
        case 10:
            // gets 2 numbers (similar to each other) and adds 3 more numbers (similar to each other)to array
            firstNumbersGenerated = generateHardNumbers(2);
            numberArray = (generateHardNumbers((numbersWanted - 2), firstNumbersGenerated));
            break;
        default:
            // generate 3-5 similar numbers
            numberArray = generateHardNumbers(numbersWanted);
            break;
    }

    while ((arrayCheckEqualsAsc(numberArray)) || (arrayCheckEqualsDesc(numberArray))) {
        numberArray = shuffleArray(numberArray);
    }

    return numberArray;
}

function displayNumbers(randomNumbers, currentScore) {
    const sortedNumbers = randomNumbers.slice(0).sort((a, b) => a - b);
    const numbersToGenerate = randomNumbers.length;
    let selectedOrder = [];

    generatePositions(numbersToGenerate, randomNumbers);

    document.querySelectorAll('.numberBox').forEach((numberBox) => {
        numberBox.addEventListener('click', () => {
            const { textContent, classList } = numberBox;
            const numberBoxValue = parseInt(textContent);

            if (numberHasNotBeenClicked(classList)) {
                if (isNextNumber(sortedNumbers, selectedOrder, numberBoxValue)) {
                    selectedOrder.push(numberBoxValue);
                    classList.add('clicked');

                    if (allNumbersClicked(selectedOrder, sortedNumbers)) {
                        ++currentScore;

                        const randomNumbers = generateNumbers(currentScore);

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

function generatePositions(numbersToGenerate, randomNumbers) {
    let positionValues = [];

    document.querySelector('#play_area').innerHTML = '<div class="placeholder"> </div>'.repeat(15);

    // using a for loop instead of forEach as the array.pop changes the length over each iteration
    for (let i = 0; i < numbersToGenerate; i++) {
        const possibleLocations = document.querySelectorAll('.placeholder:not(.numberBox)');
        const position = Math.floor(Math.random() * possibleLocations.length);

        possibleLocations[position].textContent = randomNumbers.pop();
        possibleLocations[position].classList.add('numberBox');
    }

    document.querySelectorAll('.numberBox').forEach((numberBox) => {
        positionValues.push(numberBox.dataset.position);
    });

    checkPositions(numbersToGenerate);
}

function checkPositions(numbersGenerated) {
    let cellsIterator = 0;
    let found = 0;

    const cells = document.querySelectorAll('.placeholder');

    cells.forEach((cell) => {
        cellsIterator++;

        if (cell.classList.contains('.numberBox')) {
            found++;
        }

        if (cellsIterator === 4) {
            cellsIterator = 0;

            if (found === numbersGenerated) {
                const valueOfCell = cell.textContent;

                cell.classList.remove('numberBox');
                cell.textContent = '';

                cells[4].classList.add('numberBox');
                cell.textContent = valueOfCell;
            }
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
    const randomNumbers = generateNumbers(startingScore);

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



