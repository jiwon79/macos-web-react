import { useState } from "react";
import { flushSync } from "react-dom";
import { CalculatorStore, type Operator } from "../store";

export function useCalculator() {
  const [store] = useState(() => new CalculatorStore());

  const [display, setDisplay] = useState<string>(store.display);

  const blinkDisplay = () => {
    let prevDisplay: string;
    flushSync(() =>
      setDisplay((prev) => {
        prevDisplay = prev;
        return "";
      })
    );
    setTimeout(() => {
      setDisplay(prevDisplay);
    }, 40);
  };

  const onNumberClick = (num: number) => {
    store.number(num);
    setDisplay(store.display);
  };

  const onDotClick = () => {
    store.dot();
    setDisplay(store.display);
  };

  const onClearClick = () => {
    store.clear();
    setDisplay(store.display);
    blinkDisplay();
  };

  const onPlusMinusClick = () => {
    store.plusMinus();
    setDisplay(store.display);
  };

  const onOperatorClick = (operator: Operator) => {
    store.operator(operator);
    blinkDisplay();
  };

  const onEqualClick = () => {
    store.equal();
    setDisplay(store.display);
    blinkDisplay();
  };

  const onPercentClick = () => {
    store.percent();
    setDisplay(store.display);
  };

  return {
    display,
    onNumberClick,
    onDotClick,
    onClearClick,
    onPlusMinusClick,
    onOperatorClick,
    onPercentClick,
    onEqualClick
  };
}
