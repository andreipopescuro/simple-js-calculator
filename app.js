class Calculator {
  constructor(previewDOM, resultDOM) {
    this.previewDOM = previewDOM;
    this.resultDOM = resultDOM;
    this.clear();
  }
  clear() {
    this.preview = "";
    this.result = "";
    this.operand = undefined;
  }

  delete() {
    this.result = this.result.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.result.includes(".")) return;
    this.result = this.result.toString() + number.toString();
  }
  chooseOperation(operand) {
    if (this.result === "") return;
    if (this.preview !== "") {
      this.compute();
    }
    this.operand = operand;
    this.preview = this.result;
    this.result = "";
  }
  compute() {
    let computaion;
    const pre = parseFloat(this.preview);
    const res = parseFloat(this.result);
    if (isNaN(pre) || isNaN(res)) return;
    switch (this.operand) {
      case "+":
        computaion = pre + res;
        break;
      case "-":
        computaion = pre - res;
        break;
      case "*":
        computaion = pre * res;
        break;
      case "/":
        computaion = pre / res;
        break;
      default:
        return;
    }
    this.result = computaion;
    this.operand = undefined;
    this.preview = "";
  }
  updateDisplay() {
    this.resultDOM.innerText = this.result;
    if (this.operand != null) {
      this.previewDOM.innerText = `${this.preview} ${this.operand} ${this.result}`;
    } else {
      this.previewDOM.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");

const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");

const previewDOM = document.querySelector(".preview");
const resultDOM = document.querySelector(".result");

const calculator = new Calculator(previewDOM, resultDOM);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
