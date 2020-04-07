function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
}

function generateEasyNumbers(numbersWanted) {
    let allNumbers = [];

    for (let i = 0; i < numbersWanted; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        allNumbers.push(randNumber);
    }

    return allNumbers;
}

function generateNegativeNumbers(numbersWanted) {
    let allNumbers = [];

    for (let i = 0; i < numbersWanted; i++) {
        let randNumber = Math.floor(Math.random() * 201) - 100;

        allNumbers.push(randNumber);
    }

    return allNumbers;
}

function generateHardNumbers(numbersWanted){
    let randNumber = '';
    let allNumbers = [];
    let numberSelect = Math.floor(Math.random() * 10);

    for (let i = 0; i < numbersWanted; i++) {
        let rand1in11chance = Math.floor(Math.random() * 11);

        if (rand1in11chance === 10) {
            randNumber = numberSelect;
        } else {
            let randSecondNumber = Math.floor(Math.random() * 10);

            randNumber = parseInt(`${numberSelect}${randSecondNumber}`);
        }

        if(Math.random() > 0.5) {
            allNumbers.push(randNumber);
        } else {
            allNumbers.push(0 - randNumber);
        }
    }

    return allNumbers;
}

function generateNumbers(score = 0) {
    let numberArray = [];
    let numbersWanted = Math.floor(Math.random() * 3) + 3;

    if (score < 2) {
        numberArray = generateEasyNumbers(numbersWanted);
    } else if ((score === 3) || (score === 4)) {
        numberArray = generateNegativeNumbers(numbersWanted);
    } else if ((score === 5) || (score === 6)) {
        numberArray = generateNegativeNumbers(numbersWanted - 2).concat(generateHardNumbers(2));
    } else if ((score === 7) || (score === 8)) {
        numberArray = generateNegativeNumbers(numbersWanted - 3).concat(generateHardNumbers(3));
    } else if ((score === 9) || (score === 10)) {
        numberArray = generateHardNumbers(numbersWanted - 2).concat(generateHardNumbers(2));
    } else {
        numberArray = generateHardNumbers(numbersWanted);
    }
    
    return shuffleArray(numberArray);
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

    document.querySelectorAll('.numberBox').forEach((element) => {
        element.addEventListener('click', () => {
            const { textContent, classList } = element;
            const value = parseInt(textContent);

            if (!classList.contains('chosen_number')) {
                if (sortedNumbers[selectedOrder.length] === value) {
                    selectedOrder.push(value);
                    classList.add('chosen_number');
                } else {
                    document.querySelectorAll('.chosen_number').forEach((chosenNumber) => {
                        chosenNumber.classList.remove('chosen_number');
                        selectedOrder = [];
                    });
                }
            }

            if (JSON.stringify(selectedOrder) === JSON.stringify(sortedNumbers)) {
                currentScore++;
                const randNumbers = generateNumbers(currentScore);

                document.querySelector('#player_score').textContent = `Score: ${currentScore}`;
                document.querySelector('#play_area').textContent = '';
                displayNumbers(randNumbers, currentScore);
            }
        });
    });
}

document.querySelector('#start').addEventListener('click', () => {
    const startingScore = 0;
    const randNumbers = generateNumbers(startingScore);

    document.querySelector('#splash').style.display = 'none';
    document.querySelector('#game').style.display = 'block';

    displayTimeLeft(totalTime);
    document.querySelector('#player_score').textContent = `Score: ${startingScore}`;
    displayNumbers(randNumbers, startingScore);
    timer();
});