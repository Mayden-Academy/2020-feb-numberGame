const generateNumbers = () => {
    const generate3to5 = () => {
        return Math.floor(Math.random() * 3) + 3
    };
    let numbersOnScreen = generate3to5();
    let allNumbers = [];
    for (i=0; i<numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 101);
        allNumbers.push(randNumber);
    }
    return allNumbers;
};


const displayNumbers = (allNumbers) => {

    let numbersOnScreen = allNumbers.length;

    for (i=0; i<numbersOnScreen; i++) {
        let randNumber = allNumbers.pop();
        let number = document.createElement('div');
        number.textContent = randNumber;
        number.setAttribute('class', 'numberBox');
        document.querySelector('#play_area').appendChild(number);
    }
};
let randomNumbers = generateNumbers();
displayNumbers(randomNumbers);

