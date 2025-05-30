import { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import CalculationHistory from "./CalculationHistory";

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      // Add to history when equals is pressed
      if (nextOperation === "=") {
        const expression = `${currentValue} ${operation} ${inputValue}`;
        const historyItem: HistoryItem = {
          id: Date.now().toString(),
          expression,
          result: String(newValue),
          timestamp: new Date()
        };
        setHistory(prev => [historyItem, ...prev]);
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const getLiveResult = () => {
    if (operation && previousValue !== null && !waitingForOperand) {
      const currentValue = parseFloat(display);
      if (!isNaN(currentValue)) {
        return calculate(previousValue, currentValue, operation);
      }
    }
    return null;
  };

  // Enhanced display to show full calculation
  const getDisplayValue = () => {
    let calculationExpression = "";
    
    // Build the expression string
    if (previousValue !== null && operation && operation !== "=") {
      calculationExpression = `${previousValue} ${operation} `;
      if (!waitingForOperand) {
        const currentValue = parseFloat(display);
        if (!isNaN(currentValue)) {
          const result = calculate(previousValue, currentValue, operation);
          calculationExpression += `${display} = ${result}`;
        } else {
          calculationExpression += display;
        }
      } else {
        calculationExpression += "_";
      }
    } else {
      calculationExpression = display;
    }

    return calculationExpression;
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        inputNumber(value);
        break;
      case ".":
        inputDecimal();
        break;
      case "C":
        clear();
        break;
      case "=":
        if (operation && previousValue !== null) {
          performOperation("=");
        }
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        performOperation(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-700">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={toggleHistory}
          className="text-white text-sm px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-white text-sm px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear History
          </button>
        )}
      </div>
      
      {showHistory && (
        <CalculationHistory 
          history={history} 
          onClose={() => setShowHistory(false)}
        />
      )}
      
      <Display value={getDisplayValue()} />
      <ButtonGrid onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;
