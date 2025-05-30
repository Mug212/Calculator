
interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
}

const Button = ({ value, onClick, className = "" }: ButtonProps) => {
  const baseClasses = "h-16 rounded-2xl font-semibold text-xl transition-all duration-200 transform active:scale-95 shadow-lg";
  
  const getButtonStyle = (val: string) => {
    if (val === "C") {
      return "bg-red-500 hover:bg-red-600 text-white";
    } else if (["+", "-", "×", "÷", "="].includes(val)) {
      return "bg-orange-500 hover:bg-orange-600 text-white";
    } else {
      return "bg-gray-700 hover:bg-gray-600 text-white";
    }
  };

  return (
    <button
      className={`${baseClasses} ${getButtonStyle(value)} ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default Button;
