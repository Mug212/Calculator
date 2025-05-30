
interface DisplayProps {
  value: string;
}

const Display = ({ value }: DisplayProps) => {
  return (
    <div className="bg-black rounded-2xl p-6 mb-4 border border-gray-600">
      <div className="text-right">
        <span className="text-4xl font-light text-white font-mono tracking-wider">
          {value}
        </span>
      </div>
    </div>
  );
};

export default Display;
