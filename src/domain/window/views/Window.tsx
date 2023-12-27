interface WindowProps {
  children?: React.ReactNode;
}

export function Window({ children }: WindowProps) {
  return (
    <>
      <h1>Window</h1>
      <div>{children}</div>
    </>
  );
}
