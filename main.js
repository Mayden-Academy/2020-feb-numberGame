const generateNumbers = () => {
    const generate3to5 = () => {
        return Math.floor(Math.random() * 3) + 3
    };
    let numbersOnScreen = generate3to5();
    let allNumbers = [];
    for (i=0; i<numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 100.1);
        allNumbers.push(randNumber);
    }
    allNumbers.sort(function(a, b){return a-b});
    return allNumbers;
};

generateNumbers();

