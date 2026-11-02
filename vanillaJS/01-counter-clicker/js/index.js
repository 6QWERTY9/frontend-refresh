const display = document.querySelector('.display');
const incrementBtn = document.querySelector('.increment');
const decrementBtn = document.querySelector('.decrement');
const resetBtn = document.querySelector('.reset');

let count = 0;

incrementBtn.addEventListener('click', () => {
    count++;
    display.textContent = count;
})

decrementBtn.addEventListener('click', () => {
    if (count === 0) return;
    count--
    display.textContent = count;
})

resetBtn.addEventListener('click', () => {
    count = 0;
    display.textContent = count;
})