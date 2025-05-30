
interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

interface CalculationHistoryProps {
  history: HistoryItem[];
  onClose: () => void;
}

const CalculationHistory = ({ history, onClose }: CalculationHistoryProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-4 mb-4 border border-gray-600">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white font-semibold">Calculation History</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors text-xl"
        >
          ×
        </button>
      </div>
      
      <div className="max-h-48 overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No calculations yet</p>
        ) : (
          <div className="space-y-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 rounded-lg p-3 border border-gray-600"
              >
                <div className="text-white font-mono text-sm">
                  {item.expression} = {item.result}
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  {formatTime(item.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationHistory;
