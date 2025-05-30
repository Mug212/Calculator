
interface DisplayProps {
  value: string;
}

const Display = ({ value }: DisplayProps) => {
  // Determine if this is a calculation expression
  const isExpression = value.includes("=") || value.includes("+") || value.includes("-") || value.includes("×") || value.includes("÷");
  
  return (
    <div className="bg-black rounded-2xl p-6 mb-4 border border-gray-600">
      <div className="text-right">
        <span className={`${isExpression ? 'text-2xl' : 'text-4xl'} font-light text-white font-mono tracking-wider break-all`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default Display;
