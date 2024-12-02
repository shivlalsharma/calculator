const input = document.querySelector('#input');
const buttons = document.querySelectorAll('button');
let string = '';

const operators = ['+', '-', '*', '/', '%'];

buttons.forEach((button) => {
    button.addEventListener('click', (e) => handleInput(e.target.innerText));
});

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key) || operators.includes(key) || key === '.' || key === 'Enter' || key === 'Backspace' || key === 'Delete' || key === 'Escape') {
        e.preventDefault();
        if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Backspace' || key === 'Delete') {
            handleInput('DEL');
        } else if (key === 'Escape') {
            handleInput('AC');
        } else {
            handleInput(key);
        }
    }
});

function handleInput(value) {
    if (value === '=') {
        try {
            if (operators.includes(string[string.length - 1])) {
                string = string.slice(0, -1);
            }
            string = eval(string).toString();
            input.value = string;
        } catch {
            input.value = "Error";
            string = '';
        }
    } else if (value === 'AC') {
        string = '';
        input.value = '';
    } else if (value === 'DEL') {
        string = string.slice(0, -1);
        input.value = string;
    } else {
        if (operators.includes(value) && (string === '' || operators.includes(string[string.length - 1]))) {
            return;
        }

        if (value === '.' && string.includes('.') && !string.match(/[\+\-\*\/\%]/)) {
            return;
        }

        string += value;
        input.value = string;
    }
}