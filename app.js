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
    if(n2 === 0){
        return 'ERROR';
    }
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
    // Number display
    if(currNumber.length < 10){
        // '0.[number]'
        if(currNumber.length < 1 && number.id === '.'){
            currNumber += `0${number.id}`;
            display.innerHTML = currNumber;  
            decimal.disabled = true;
        }
        // '[number].'
        else if(currNumber.length > 0 && number.id === '.'){
            currNumber += number.id;
            display.innerHTML = currNumber;  
            decimal.disabled = true;       
        }
        else {
            currNumber += number.id;
            display.innerHTML = currNumber;  
        }        
    }
    // Save the current operator and number
    if(pair.length === 1 && currOperator !== "="){
        pair.push(currOperator);
        decimal.disabled = false;
    }
    // Operation reset if the equal is pressed before a full pair is established.
    else if(pair.length === 1 && currOperator === "="){
        pair = [];
        decimal.disabled = false;
    }
}

function operatorPressed(operator){
    currOperator = operator.id;
    
    // if operator is pressed and a number exist, store the current number.
    if(pair.length < 1 && currNumber.length !== 0){
        pair.push(parseFloat(currNumber));
        currNumber = "";
        decimal.disabled = false;
    }
    else if(pair.length === 2){                             
        pair.push(parseFloat(currNumber));
        currNumber = "";
        currResult = operate(pair[1], pair[0], pair[2]).toString().substr(0, 10);    
        display.innerHTML = currResult;
        pair = [];
        pair.push(currResult);
        decimal.disabled = false;
    }
}

// Clear the current display, reset all fields.
function clearDisplay(){
    display.innerHTML = "0";
    currNumber = "", currOperator = "", currResult = "", pair = [];
    decimal.disabled = false;
}

function deleteDisplay(){
    if(currResult === 'ERROR'){
        display.innerHTML = "0";        
    }
    if(currNumber.length > 0){
        if(currNumber.slice(-1) === '.'){
            currNumber = currNumber.substring(0, currNumber.length - 1);
            decimal.disabled = false;
            // If the currentNumber is 0., make sure to reset it to "" after backspace.
            if(currNumber.length === 1 && currNumber === "0"){
                currNumber = "";
                display.innerHTML = "0";
            }
            else{
                display.innerHTML = currNumber;
            }
        }
        else{
            currNumber = currNumber.substring(0, currNumber.length - 1);
            if(currNumber.length === 0){
                display.innerHTML = "0";
            }
            else{
                display.innerHTML = currNumber;
            }
        }
       
    }
}

let currNumber = "";
let currOperator = "";
let currResult = "";
let pair = [];

const display = document.querySelector('.display');

const numbers = document.querySelectorAll('.btn-container .numbers .number');
numbers.forEach(number => {
    number.addEventListener('click', () => numberPressed(number))
});

const decimal = document.querySelector('.float');
decimal.addEventListener('click', () => numberPressed(decimal));

const operators = document.querySelectorAll('.btn-container .operators .operator');
operators.forEach(operator => {
    operator.addEventListener('click', () => operatorPressed(operator))
});

const equal = document.querySelector('.btn-container .numbers .operator');
equal.addEventListener('click', () => operatorPressed(equal));

const clear = document.querySelector('.delete-container #clear');
clear.addEventListener('click', clearDisplay);

const backspace = document.querySelector('.delete-container #backspace');
backspace.addEventListener('click', deleteDisplay);

