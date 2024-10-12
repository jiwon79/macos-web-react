import { act, renderHook, waitFor } from '@testing-library/react';
import { describe,expect, test } from 'vitest';
import { useCalculator } from './useCalculator';

describe('input number', () => {
  test('User can input number(1~9)', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onNumberClick(2);
      result.current.onNumberClick(3);
      result.current.onNumberClick(4);
      result.current.onNumberClick(5);
      result.current.onNumberClick(6);
      result.current.onNumberClick(7);
      result.current.onNumberClick(8);
      result.current.onNumberClick(9);
    });

    expect(result.current.display).toBe('123456789');
  });

  test('User can input number with zero', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(0);
      result.current.onNumberClick(0);
      result.current.onNumberClick(2);
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('23');
  });

  test('User can input dot', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onDotClick();
      result.current.onNumberClick(2);
    });

    expect(result.current.display).toBe('1.2');
  });

  test('User input multiple dot, display one dot', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onDotClick();
      result.current.onDotClick();
      result.current.onNumberClick(2);
      result.current.onDotClick();
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('1.23');
  });
});

describe('input number after operator', () => {
  test('input number after click plus button', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onOperatorClick('+');
      result.current.onNumberClick(2);
    });

    expect(result.current.display).toBe('2');
  });

  test('input number and dot after click plus button', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onOperatorClick('+');
      result.current.onNumberClick(2);
      result.current.onDotClick();
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('2.3');
  });

  test('input number and dot(0.) after click plus button', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onOperatorClick('+');
      result.current.onDotClick();
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('0.3');
  });

  test('input dot(0.) after click equal button', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onEqualClick();
      result.current.onDotClick();
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('0.3');
  });

  test('input number and dot(0.) after click equal button', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onDotClick();
      result.current.onNumberClick(2);
      result.current.onEqualClick();
      result.current.onDotClick();
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('0.3');
  });
});

describe('clear button', () => {
  test('ClearButton clear display', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onClearClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0'));
  });
});

describe('plus button', () => {
  test('1 + 2 = >> 3', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onOperatorClick('+');
      result.current.onNumberClick(2);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('3'));
  });

  test('. 3 + 2 = >> 2.3', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onDotClick();
      result.current.onNumberClick(3);
      result.current.onOperatorClick('+');
      result.current.onNumberClick(2);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('2.3'));
  });

  test('1 + . 2 =  >> 1.2', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onOperatorClick('+');
      result.current.onDotClick();
      result.current.onNumberClick(2);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('1.2'));
  });

  test('1 + 2 = 3 . >> 0.', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onOperatorClick('+');
      result.current.onNumberClick(2);
      result.current.onEqualClick();
      result.current.onDotClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.'));
  });

  test('1 + 2 = = ==> 5', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onOperatorClick('+');
      result.current.onNumberClick(2);
      result.current.onEqualClick();
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('5'));
  });
});

describe('minus button', () => {
  test('4 - 2 = >> 2', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(4);
      result.current.onOperatorClick('-');
      result.current.onNumberClick(2);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('2'));
  });

  test('0.9 - 0.3 = >> 0.6', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(0);
      result.current.onDotClick();
      result.current.onNumberClick(9);
      result.current.onOperatorClick('-');
      result.current.onNumberClick(0);
      result.current.onDotClick();
      result.current.onNumberClick(3);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.6'));
  });

  test('4 - 9 = >> -5', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(4);
      result.current.onOperatorClick('-');
      result.current.onNumberClick(9);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('-5'));
  });

  test('9 - 4 = = >> 1', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(9);
      result.current.onOperatorClick('-');
      result.current.onNumberClick(4);
      result.current.onEqualClick();
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('1'));
  });
});

describe('multiply button', () => {
  test('2 * 5 = >> 10', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
      result.current.onOperatorClick('*');
      result.current.onNumberClick(5);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('10'));
  });

  test('2 (+/-) * 5 = >> 10', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
      result.current.onPlusMinusClick();
      result.current.onOperatorClick('*');
      result.current.onNumberClick(4);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('-8'));
  });

  test('8 * .9 = >> 7.2', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(8);
      result.current.onOperatorClick('*');
      result.current.onDotClick();
      result.current.onNumberClick(9);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('7.2'));
  });

  test('4 * 3 = = >> 36', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(4);
      result.current.onOperatorClick('*');
      result.current.onNumberClick(3);
      result.current.onEqualClick();
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('36'));
  });
});

describe('divide button', () => {
  test('6 / 3 = >> 2', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(6);
      result.current.onOperatorClick('/');
      result.current.onNumberClick(3);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('2'));
  });

  test('6 / 0 = >> Infinity', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(6);
      result.current.onOperatorClick('/');
      result.current.onNumberClick(0);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('Infinity'));
  });

  test('6 / .5 = >> 12', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(6);
      result.current.onOperatorClick('/');
      result.current.onDotClick();
      result.current.onNumberClick(5);
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('12'));
  });

  test('6 / 2 = 3 . >> 0.', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(6);
      result.current.onOperatorClick('/');
      result.current.onNumberClick(2);
      result.current.onEqualClick();
      result.current.onDotClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.'));
  });

  test('12 / 4 (+/-) = >> -3', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onNumberClick(2);
      result.current.onOperatorClick('/');
      result.current.onNumberClick(4);
      result.current.onPlusMinusClick();
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('-3'));
  });

  test('12 / 4 = = >> 0.75', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onNumberClick(2);
      result.current.onOperatorClick('/');
      result.current.onNumberClick(4);
      result.current.onEqualClick();
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.75'));
  });
});

describe('percent button', () => {
  test('100 % = >> 1', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onNumberClick(0);
      result.current.onNumberClick(0);
      result.current.onPercentClick();
    });

    await waitFor(() => expect(result.current.display).toBe('1'));
  });

  test('100 + 100 % = >> 101', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
      result.current.onNumberClick(0);
      result.current.onNumberClick(0);
      result.current.onOperatorClick('+');
      result.current.onNumberClick(1);
      result.current.onNumberClick(0);
      result.current.onNumberClick(0);
      result.current.onPercentClick();
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('101'));
  });

  test('2 % = >> 0.02', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
      result.current.onPercentClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.02'));
  });

  test('2 + 2 % = >> 2.02', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
      result.current.onOperatorClick('+');
      result.current.onNumberClick(2);
      result.current.onPercentClick();
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('2.02'));
  });

  test('2 % % >> 0.0002', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
      result.current.onPercentClick();
      result.current.onPercentClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.0002'));
  });

  test('2 (+/-) * 2 % = >> -0.04', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
      result.current.onPlusMinusClick();
      result.current.onOperatorClick('*');
      result.current.onNumberClick(2);
      result.current.onPercentClick();
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('-0.04'));
  });
});
