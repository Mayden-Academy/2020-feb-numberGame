function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function arrayCheckEquals(array1, array2) {
    if ((!array1) || (!array2)) {
        return false;
    }

    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0, l = array1.length; i < l; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
}

function generateNumbers() {
    let numbersOnScreen = Math.floor(Math.random() * 3) + 3;
    let allNumbers = [];
    numbersOnScreen = 3;

    for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        if (allNumbers.includes(randNumber)) {
            i--;
        } else {
            allNumbers.push(randNumber);
        }
    }

    const sortedNumbers = allNumbers.slice(0).sort((a, b) => a - b);

    while (arrayCheckEquals(allNumbers, sortedNumbers)) {
        allNumbers = shuffleArray(allNumbers);
    }

    return allNumbers;
}
for (let i = 0; i < 15; i++) {
    generateNumbers()
}

function displayNumbers(randomNumbers, currentScore) {
    const sortedNumbers = randomNumbers.slice(0).sort((a, b) => a - b);
    const numbersOnScreen = randomNumbers.length;
    let selectedOrder = [];

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
                        document.querySelector('#play_area').textContent = '';

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

document.querySelector('#start').addEventListener('click', () => {
    const startingScore = 0;
    const randomNumbers = generateNumbers();

    document.querySelector('#splash').style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    document.querySelector('#player_score').textContent = `Score: ${startingScore}`;

    displayTimeLeft(totalTime);
    displayNumbers(randomNumbers, startingScore);
    timer();
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
};