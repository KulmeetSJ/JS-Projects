//Select all buttons and result display
const buttons = document.querySelectorAll('.buttons button');
const display = document.querySelector('#result');

//declare variables
let op1 = null;
let op2 = null;
let operator = null;
let result = null;

//Function to handle number button clicks

function handleNumberClick(event) {
    const buttonValue = event.target.value;
    if (result) {
        clear();
    }
    if (operator) {
        op2 = op2 ? op2 + buttonValue : buttonValue;
    }
    else {
        op1 = op1 ? op1 + buttonValue : buttonValue;
    }
    display.textContent = op2 || op1;
}


//Function to handle operator 
function handleOperatorClick(event) {
    const buttonValue = event.target.value;
    if (result) {
        op1 = result;
        op2 = null;
        result = null;
    }
    operator = buttonValue;
}

function handleClearClick() {
    clear();
}

function clear() {
    op1 = null;
    op2 = null;
    result = null;
    operator = null;
    display.textContent = '0';
}

function calculate() {
    const number1 = parseFloat(op1);
    const number2 = parseFloat(op2);
    switch (operator) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number1 / number2;
            break;
        default:
            return;
    }
    display.textContent = result;
    op1 = result;
    op2 = null;
}

function handleEqualsClick() {
    if (op1 && op2 && operator) {
        calculate();
    }
}

//Adding event listeners
buttons.forEach(function (button) {
    if (button.classList.contains('number')) {
        button.addEventListener('click', handleNumberClick);
    }
    else if (button.classList.contains('operator')) {
        button.addEventListener('click', handleOperatorClick);
    }
    else if (button.classList.contains('clear')) {
        button.addEventListener('click', handleClearClick);
    }
    else if (button.classList.contains('equals')) {
        button.addEventListener('click', handleEqualsClick);
    }
});
