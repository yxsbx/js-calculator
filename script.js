let display = document.getElementById("display");
let currentValue = "0";
let operator = null;
let previousValue = null;
let resultShown = false;

function appendNumber(number) {
  if (resultShown) {
    currentValue = String(number);
    resultShown = false;
  } else {
    if (currentValue === "0") {
      currentValue = String(number);
    } else {
      currentValue += number;
    }
  }
  updateDisplay();
}

function appendOperator(op) {
  if (previousValue === null) {
    previousValue = currentValue;
  } else if (operator !== null && !resultShown) {
    previousValue = calculate(previousValue, operator, currentValue);
    currentValue = previousValue;
    updateDisplay();
  }

  operator = op;
  resultShown = true;
}

function appendDot() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}

function clearDisplay() {
  currentValue = "0";
  operator = null;
  previousValue = null;
  resultShown = false;
  updateDisplay();
}

function toggleSign() {
  if (currentValue !== "0") {
    currentValue = String(parseFloat(currentValue) * -1);
  }
  updateDisplay();
}

function applyPercentage() {
  if (previousValue !== null) {
    currentValue = String(
      parseFloat(previousValue) * (parseFloat(currentValue) / 100)
    );
  } else {
    currentValue = String(parseFloat(currentValue) / 100);
  }
  updateDisplay();
}

function calculateResult() {
  if (operator !== null && previousValue !== null) {
    currentValue = calculate(previousValue, operator, currentValue);
    operator = null;
    previousValue = null;
    resultShown = true;
    updateDisplay();
  }
}

function calculate(val1, operator, val2) {
  const num1 = parseFloat(val1);
  const num2 = parseFloat(val2);

  switch (operator) {
    case "+":
      return String(num1 + num2);
    case "-":
      return String(num1 - num2);
    case "*":
      return String(num1 * num2);
    case "/":
      return num2 !== 0 ? String(num1 / num2) : "Erro";
    case "%":
      return String(num1 * (num2 / 100));
    default:
      return "0";
  }
}

function updateDisplay() {
  display.value = currentValue;
}
