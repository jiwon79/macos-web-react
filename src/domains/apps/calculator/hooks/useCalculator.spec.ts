import { act, renderHook, waitFor } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { useCalculator } from './useCalculator';

describe('input number', () => {
  test('User can input number(1~9)', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onNumberClick(3);
    });
    act(() => {
      result.current.onNumberClick(4);
    });
    act(() => {
      result.current.onNumberClick(5);
    });
    act(() => {
      result.current.onNumberClick(6);
    });
    act(() => {
      result.current.onNumberClick(7);
    });
    act(() => {
      result.current.onNumberClick(8);
    });
    act(() => {
      result.current.onNumberClick(9);
    });

    expect(result.current.display).toBe('123456789');
  });

  test('User can input number with zero', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('23');
  });

  test('User can input dot', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(2);
    });

    expect(result.current.display).toBe('1.2');
  });

  test('User input multiple dot, display one dot', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
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
    });
    act(() => {
      result.current.onOperatorClick('+');
    });
    act(() => {
      result.current.onNumberClick(2);
    });

    expect(result.current.display).toBe('2');
  });

  test('input number and dot after click plus button', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onOperatorClick('+');
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('2.3');
  });

  test('input number and dot(0.) after click plus button', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onOperatorClick('+');
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('0.3');
  });

  test('input dot(0.) after click equal button', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onEqualClick();
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(3);
    });

    expect(result.current.display).toBe('0.3');
  });

  test('input number and dot(0.) after click equal button', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onEqualClick();
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
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
    });
    act(() => {
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
    });
    act(() => {
      result.current.onOperatorClick('+');
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('3'));
  });

  test('. 3 + 2 = >> 2.3', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(3);
    });
    act(() => {
      result.current.onOperatorClick('+');
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('2.3'));
  });

  test('1 + . 2 =  >> 1.2', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onOperatorClick('+');
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('1.2'));
  });

  test('1 + 2 = 3 . >> 0.', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onOperatorClick('+');
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onEqualClick();
    });
    act(() => {
      result.current.onDotClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.'));
  });
});

describe('minus button', () => {
  test('4 - 2 = >> 2', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(4);
    });
    act(() => {
      result.current.onOperatorClick('-');
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('2'));
  });

  test('0.9 - 0.3 = >> 0.6', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(9);
    });
    act(() => {
      result.current.onOperatorClick('-');
    });
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(3);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.6'));
  });

  test('4 - 9 = >> -5', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(4);
    });
    act(() => {
      result.current.onOperatorClick('-');
    });
    act(() => {
      result.current.onNumberClick(9);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('-5'));
  });
});

describe('multiply button', () => {
  test('2 * 5 = >> 10', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onOperatorClick('*');
    });
    act(() => {
      result.current.onNumberClick(5);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('10'));
  });

  test('2 (+/-) * 5 = >> 10', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onPlusMinusClick();
    });
    act(() => {
      result.current.onOperatorClick('*');
    });
    act(() => {
      result.current.onNumberClick(4);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('-8'));
  });

  test('8 * .9 = >> 7.2', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(8);
    });
    act(() => {
      result.current.onOperatorClick('*');
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(9);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('7.2'));
  });
});

describe('divide button', () => {
  test('6 / 3 = >> 2', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(6);
    });
    act(() => {
      result.current.onOperatorClick('/');
    });
    act(() => {
      result.current.onNumberClick(3);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('2'));
  });

  test('6 / 0 = >> Infinity', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(6);
    });
    act(() => {
      result.current.onOperatorClick('/');
    });
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('Infinity'));
  });

  test('6 / .5 = >> 12', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(6);
    });
    act(() => {
      result.current.onOperatorClick('/');
    });
    act(() => {
      result.current.onDotClick();
    });
    act(() => {
      result.current.onNumberClick(5);
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('12'));
  });

  test('6 / 2 = 3 . >> 0.', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(6);
    });
    act(() => {
      result.current.onOperatorClick('/');
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onEqualClick();
    });
    act(() => {
      result.current.onDotClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.'));
  });

  test('12 / 4 (+/-) = >> -3', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onOperatorClick('/');
    });
    act(() => {
      result.current.onNumberClick(4);
    });
    act(() => {
      result.current.onPlusMinusClick();
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('-3'));
  });
});

describe('percent button', () => {
  test('100 % = >> 1', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onPercentClick();
    });

    await waitFor(() => expect(result.current.display).toBe('1'));
  });

  test('100 + 100 % = >> 101', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onOperatorClick('+');
    });
    act(() => {
      result.current.onNumberClick(1);
    });
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onNumberClick(0);
    });
    act(() => {
      result.current.onPercentClick();
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('101'));
  });

  test('2 % = >> 0.02', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onPercentClick();
    });

    await waitFor(() => expect(result.current.display).toBe('0.02'));
  });

  test('2 + 2 % = >> 2.02', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onOperatorClick('+');
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onPercentClick();
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('2.02'));
  });

  test('2 (+/-) * 2 % = >> -0.04', async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onPlusMinusClick();
    });
    act(() => {
      result.current.onOperatorClick('*');
    });
    act(() => {
      result.current.onNumberClick(2);
    });
    act(() => {
      result.current.onPercentClick();
    });
    act(() => {
      result.current.onEqualClick();
    });

    await waitFor(() => expect(result.current.display).toBe('-0.04'));
  });
});
