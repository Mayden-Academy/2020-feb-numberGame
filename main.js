function generateNumbers() {
    let numbersOnScreen = Math.floor(Math.random() * 3) + 3;
    let allNumbers = [];

    for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        allNumbers.push(randNumber);
    }

    return allNumbers;
}

function displayNumbers(randomNumbers) {
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

            // check if already clicked
            if (!classList.contains('clicked')) {
                // check if correct number
                if (sortedNumbers[selectedOrder.length] === numberBoxValue) {
                    selectedOrder.push(numberBoxValue);
                    classList.add('clicked');
                } else {
                    document.querySelectorAll('.clicked').forEach((chosenNumber) => {
                        chosenNumber.classList.remove('clicked');
                        selectedOrder = [];
                    });
                }
            }

            if (selectedOrder.length === sortedNumbers.length) {
                document.querySelector('#play_area').textContent = '';
            }
        });
    });
}

document.querySelector('#start').addEventListener('click', () => {
    const randomNumbers = generateNumbers();

    document.querySelector('#splash').style.display = 'none';
    document.querySelector('#game').style.display = 'block';

    displayTimeLeft(totalTime);
    displayNumbers(randomNumbers);
    timer();
});