function add(n1, n2){
    return n1 + n2;
}

function subtract(n1, n2){
    return n1 - n2;
}

function multiply(n1, n2){
    return n1 * n2;
}

function divide(n1, n2){
    return n1 / n2;
}

function operate(operator, n1, n2){

    switch(operator){
        case '+':
            return add(n1, n2);
        case '-':
            return subtract(n1, n2);
        case '*':
            return multiply(n1, n2);
        case '/':
            return divide(n1, n2);           
        default:
            console.log("Invalid input");         
    }
}

function numberPressed(number){
    currNumber += number.id;
    display.innerHTML = currNumber;
    if(pair.length === 1 && currOperator !== "="){
        pair.push(currOperator);
    }
    else if(pair.length === 1 && currOperator === "="){
        pair = [];
    }
}

function operatorPressed(operator){
    currOperator = operator.id;
    if(pair.length < 1 && currNumber.length !== 0){
        pair.push(parseInt(currNumber));
        currNumber = "";
    }
    else if(pair.length === 2){
        pair.push(parseInt(currNumber));
        currNumber = "";
        currResult = operate(pair[1], pair[0], pair[2]);
        display.innerHTML = currResult;
        pair = [];
        pair.push(currResult);
    }
}

function clearDisplay(){
    display.innerHTML = "&nbsp";
    currNumber = "", currOperator = "", currResult = "", pair = [];
}

let currNumber = "";
let currOperator = "";
let currResult = "";
let pair = [];

const display = document.querySelector('.display');

const numbers = document.querySelectorAll('.btn-container .numbers button');
numbers.forEach(number => {
    number.addEventListener('click', () => numberPressed(number))
});

const operators = document.querySelectorAll('.btn-container .operators button');
operators.forEach(operator => {
    operator.addEventListener('click', () => operatorPressed(operator))
});

const clear = document.querySelector('.delete #clear');
clear.addEventListener('click', clearDisplay);
