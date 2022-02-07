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
    // Else if an operator is pressed after a number + operator is stored, evaluate the current pair.
    else if(pair.length === 2){                             
        pair.push(parseFloat(currNumber));
        currNumber = "";
        currResult = operate(pair[1], pair[0], pair[2]).toString().substr(0, 10);    
        display.innerHTML = currResult;
        pair = [];
        pair.push(parseFloat(currResult));  // Push the results into the first spot of the cleared array.
        decimal.disabled = false;
    }
}

// Clear the current display, reset all fields.
function clearDisplay(){
    display.innerHTML = "0";
    currNumber = "", currOperator = "", currResult = "", pair = [];
    decimal.disabled = false;
}

// Delete the last number entered in by the user.
function deleteDisplay(){
    if(currResult === 'ERROR'){
        display.innerHTML = "0";        
    }
    if(currNumber.length > 0){
        // Involves decimal
        if(currNumber.slice(-1) === '.'){
            currNumber = currNumber.substring(0, currNumber.length - 1);
            decimal.disabled = false;
            // If the currentNumber is '0.', make sure to reset it to "" after backspace.
            if(currNumber.length === 1 && currNumber === "0"){
                currNumber = "";
                display.innerHTML = "0";
            }
            // Else change the display to the current number.
            else{
                display.innerHTML = currNumber;
            }
        }
        // Remove the last number
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

// Listen for keyboard input
function afterKeyPress(e){
    const key = document.querySelector(`.btn-container button[data-key="${e.keyCode}"]`);
    const deleteKey = document.querySelector(`.delete-container button[data-key="${e.keyCode}"]`);

    if(key != null){
        if(key.id >= 0 && key.id <= 9){
            numberPressed(key);
        }
        else if(key.id === "*" || key.id === "/" || key.id === "-" || key.id === "+" || key.id === "="){
            operatorPressed(key);
        }
        else if(key.id === "."){
            numberPressed(key);
        }
    }
    if(deleteKey != null){
        if(deleteKey.id === "clear"){
            clearDisplay();
        }
        else if(deleteKey.id === "backspace"){
            deleteDisplay();
        }
    }
}

let currNumber = "";
let currOperator = "";
let currResult = "";
let pair = [];

const display = document.querySelector('.display');

const numbers = document.querySelectorAll('.btn-container .number');
numbers.forEach(number => {
    number.addEventListener('click', () => numberPressed(number));
});

const decimal = document.querySelector('.btn-container .float');
decimal.addEventListener('click', () => numberPressed(decimal));

const operators = document.querySelectorAll('.btn-container .operator');
operators.forEach(operator => {
    operator.addEventListener('click', () => operatorPressed(operator))
});

const clear = document.querySelector('.delete-container #clear');
clear.addEventListener('click', clearDisplay);

const backspace = document.querySelector('.delete-container #backspace');
backspace.addEventListener('click', deleteDisplay);

window.addEventListener('keydown', afterKeyPress);