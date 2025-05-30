
import Button from "./Button";

interface ButtonGridProps {
  onButtonClick: (value: string) => void;
}

const ButtonGrid = ({ onButtonClick }: ButtonGridProps) => {
  const buttons = [
    ["C", "", "", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "", ".", "="]
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {buttons.map((row, rowIndex) =>
        row.map((button, colIndex) => {
          if (button === "") {
            return <div key={`${rowIndex}-${colIndex}`} className="h-16"></div>;
          }
          
          const isZero = button === "0";
          return (
            <Button
              key={`${rowIndex}-${colIndex}`}
              value={button}
              onClick={onButtonClick}
              className={isZero ? "col-span-2" : ""}
            />
          );
        })
      )}
    </div>
  );
};

export default ButtonGrid;
