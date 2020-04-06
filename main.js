function generateNumbers() {
    let numbersOnScreen = Math.floor(Math.random() * 3) + 3;
    let allNumbers = [];

    for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        allNumbers.push(randNumber);
    }

    return allNumbers;
}

function displayNumbers() {
    const randomNumbers = generateNumbers();
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
                }
            }

            if (JSON.stringify(selectedOrder) === JSON.stringify(sortedNumbers)) {
                document.querySelector('#play_area').textContent = '';
            }
        });
    });
}

document.querySelector('#start').addEventListener('click', () => {
    document.querySelector('#splash').style.display = 'none';
    document.querySelector('#game').style.display = 'block';

    displayTimeLeft(totalTime);
    displayNumbers();
    timer();
});