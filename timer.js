timer();

let now = 5;

function timer() {
    setTimeout(() => {
        if (now > 0) {
            timer();
        }
        console.log(now);
        now--;


    }, 1000);
}
