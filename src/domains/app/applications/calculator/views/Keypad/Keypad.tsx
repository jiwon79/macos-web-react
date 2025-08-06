import { cn } from "third-parties/classnames";
import { keypad } from "./Keypad.css";

interface KeypadProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type: "function" | "operator" | "number" | "number_wide";
}

export function Keypad({ children, onClick, className, type }: KeypadProps) {
  return (
    <button
      type="button"
      className={cn(keypad({ type }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
