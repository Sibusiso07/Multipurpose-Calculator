import React, { useState, useEffect } from "react";

const SimpleCal = () => {
    const [display, setDisplay] = useState('');
    const [firstNumber, setFirstNumber] = useState('');
    const [operator, setOperator] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [result, setResult] = useState('');

    const handleNumberClick = (value) => {
        if (operator === '') {
            setFirstNumber(firstNumber + value);
        } else {
            setSecondNumber(secondNumber + value);
        }
    };

    const handleOperatorClick = (value) => {
        if (operator !== '') {
            calculateResult();
        }
        setOperator(value);
    };

    const calculateResult = () => {
        let calculatedResult;
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);

        switch (operator) {
            case '+':
                calculatedResult = num1 + num2;
                break;
            case '-':
                calculatedResult = num1 - num2;
                break;
            case '*':
                calculatedResult = num1 * num2;
                break;
            case '/':
                calculatedResult = num1 / num2;
                break;
            default:
                break;
        }

        setResult(calculatedResult.toString());
    };

    const handleEqualsClick = () => {
        calculateResult();
        setDisplay(result);
        setFirstNumber('');
        setOperator('');
        setSecondNumber('');
    };

    const handleClearClick = () => {
        setDisplay('');
        setFirstNumber('');
        setOperator('');
        setSecondNumber('');
        setResult('');
    };

    useEffect(() => {
        setDisplay(`${firstNumber} ${operator} ${secondNumber}`);
    }, [firstNumber, operator, secondNumber]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;
            if (!isNaN(key) || ['+', '-', '*', '/', '=', 'Enter', '.', 'Backspace'].includes(key)) {
                event.preventDefault();
                if (!isNaN(key)) {
                    handleNumberClick(key);
                } else if (key === '.' && operator === '' && !firstNumber.includes('.')) {
                    setFirstNumber(firstNumber + key);
                    setDisplay(display + key);
                } else if (['+', '-', '*', '/'].includes(key)) {
                    handleOperatorClick(key);
                    setDisplay(display + key);
                } else if (['=', 'Enter'].includes(key)) {
                    handleEqualsClick();
                } else if (key === 'Backspace') {
                    if (secondNumber !== '') {
                        setSecondNumber(secondNumber.slice(0, -1));
                    } else if (operator !== '') {
                        setOperator('');
                    } else {
                        setFirstNumber(firstNumber.slice(0, -1));
                    }
                    setDisplay(display.slice(0, -1));
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [display, firstNumber, operator, secondNumber]);

    useEffect(() => {
        setDisplay(result);
    }, [result]);

    return (
        <div className="container">
            <div className="screen-container">
                <span className="screen">{display}</span>
            </div>
            <div className="row">
                <button onClick={() => handleClearClick()} data-value="C">C</button>
                <button disabled>()</button>
                <button onClick={() => handleOperatorClick('%')} data-value="%">%</button>
                <button onClick={() => handleOperatorClick('/')} data-value="/">/</button>
            </div>
            <div className="row">
                <button onClick={() => handleNumberClick('7')} data-value="7">7</button>
                <button onClick={() => handleNumberClick('8')} data-value="8">8</button>
                <button onClick={() => handleNumberClick('9')} data-value="9">9</button>
                <button onClick={() => handleOperatorClick('*')} data-value="*">*</button>
            </div>
            <div className="row">
                <button onClick={() => handleNumberClick('4')} data-value="4">4</button>
                <button onClick={() => handleNumberClick('5')} data-value="5">5</button>
                <button onClick={() => handleNumberClick('6')} data-value="6">6</button>
                <button onClick={() => handleOperatorClick('-')} data-value="-">-</button>
            </div>
            <div className="row">
                <button onClick={() => handleNumberClick('1')} data-value="1">1</button>
                <button onClick={() => handleNumberClick('2')} data-value="2">2</button>
                <button onClick={() => handleNumberClick('3')} data-value="3">3</button>
                <button onClick={() => handleOperatorClick('+')} data-value="+">+</button>
            </div>
            <div className="row">
                <button disabled>+/-</button>
                <button onClick={() => handleNumberClick('0')} data-value="0">0</button>
                <button onClick={() => handleNumberClick('.')} data-value=".">.</button>
                <button onClick={() => handleEqualsClick()} data-value="=">=</button>
            </div>
        </div>
    );
};

export default SimpleCal;
