import { round } from "../utils";

export type Operator = "+" | "-" | "*" | "/";

const operators: Record<
  Operator,
  (currentNum: number) => (num: number) => number
> = {
  "+": (num) => (prevNum) => prevNum + num,
  "-": (num) => (prevNum) => prevNum - num,
  "*": (num) => (prevNum) => prevNum * num,
  "/": (num) => (prevNum) => prevNum / num
};

export class CalculatorStore {
  display = "0";
  private lastOperator: Operator | null = null;
  private lastValue: number | null = null;
  private currentValue: number | null = null;
  private lastOperatorFunction: ((num: number) => number) | null = null;

  get parsedDisplay() {
    if (this.display === "") {
      return 0;
    }
    return parseFloat(this.display);
  }

  clear() {
    this.lastValue = null;
    this.currentValue = null;
    this.lastOperator = null;
    this.lastOperatorFunction = null;
    this.display = "0";
  }

  number(num: number) {
    if (this.display === "0" || this.currentValue === null) {
      this.display = num.toString();
      this.currentValue = num;
      return;
    }

    const newDisplay = this.display + num.toString();
    this.display = newDisplay;
    this.currentValue = this.parsedDisplay;
  }

  dot() {
    if (this.display === "0" || this.currentValue === null) {
      this.display = "0.";
      this.currentValue = 0;
      return;
    }

    if (this.display.includes(".")) {
      return;
    }

    this.display = `${this.display}.`;
  }

  plusMinus() {
    this.display = (this.parsedDisplay * -1).toString();
  }

  percent() {
    this.display = (this.parsedDisplay / 100).toString();
  }

  operator(operator: Operator) {
    this.lastValue = this.parsedDisplay;
    this.currentValue = null;
    this.lastOperator = operator;
    this.lastOperatorFunction = null;
  }

  equal() {
    if (this.lastValue === null) {
      this.lastValue = this.parsedDisplay;
      this.currentValue = null;
      return;
    }

    if (this.lastOperatorFunction) {
      const result = this.lastOperatorFunction(this.parsedDisplay);
      this.display = this._round(result).toString();
      return;
    }

    if (this.lastOperator === null) {
      return;
    }

    const operator = operators[this.lastOperator];
    this.lastOperatorFunction = operator(this.parsedDisplay);
    const result = this.lastOperatorFunction(this.lastValue);

    this.lastValue = result;
    this.currentValue = null;
    this.display = this._round(result).toString();
  }

  private _round(num: number) {
    return round(num, 12);
  }
}
