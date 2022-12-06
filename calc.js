//created a calculator object with methods/functions
class Calculator {

    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear () {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    del () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerNum = parseFloat(stringNumber.split('.') [0])
        const decimalNum = stringNumber.split('.') [1]
        let integerDisplay
        if (isNaN(integerNum)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerNum.toLocaleString('US-en', { maximumFractionDigits : 0 })
        }
        if (decimalNum != null) {
            return `${integerDisplay}.${decimalNum}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.textContent = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandText.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.textContent = ''
        }
    }

    compute() {
        let calculation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+' : 
            calculation = previous + current
            break
            case '-' : 
            calculation = previous - current
            break
            case '*' : 
            calculation = previous * current
            break
            case '÷' : 
            calculation = previous / current
            break
            default : 
            return;
        }
        this.currentOperand = calculation
        this.operation = undefined
        this.previousOperand = ''
    }
}

//called DOM documents
const display = document.querySelector('#display');
const equal = document.querySelector('.equal');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('#oper');
const del = document.querySelector('.delete');
const clear = document.querySelector('.clear');
const previousOperandText = document.querySelector('.firstOperand');
const currentOperandText = document.querySelector('.secondOperand');

//create a new calculator from the Calculator object
const calculator = new Calculator(previousOperandText, currentOperandText);

//added funtions to the button while calling on Oject Methods from Calculator class
numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.textContent);
        calculator.updateDisplay();
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.chooseOperation(operator.textContent);
        calculator.updateDisplay();
    })
})

del.addEventListener('click', () => {
        calculator.del();
        calculator.updateDisplay();
    })

clear.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    })

equal.addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
    });

