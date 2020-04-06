function generateNumbers() {
    let numbersOnScreen = Math.floor(Math.random() * 3) + 3;
    let allNumbers = [];

    for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        allNumbers.push(randNumber);
    }

    return allNumbers;
}

function displayNumbers(allNumbers) {
    const numbersOnScreen = allNumbers.length;

     // using a for loop instead of forEach as the array.pop changes the length over each iteration
     for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = allNumbers.pop();
        let number = document.createElement('div');

        number.textContent = randNumber;
        number.setAttribute('class', 'numberBox');
        document.querySelector('#play_area').appendChild(number);
    }
}

document.querySelector('#start').addEventListener('click', () => {
    const randomNumbers = generateNumbers();

    displayNumbers(randomNumbers);

    document.querySelector('#splash').style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    document.querySelector('#game_timer').textContent = "Timer: 30";
    timer();
});