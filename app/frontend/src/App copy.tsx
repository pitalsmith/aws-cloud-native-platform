import { useState, ChangeEvent } from 'react';
import './App.css';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdraw';
  amount: number;
  date: string;
}

function App() {
  const [balance, setBalance] = useState<number>(5000);
  const [amount, setAmount] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  console.log(balance); // Debugging: Check balance updates

  // Explicitly type the event for the input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTransaction = (type: 'deposit' | 'withdraw'): void => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    const newBalance = type === 'deposit' ? balance + val : balance - val;
    setBalance(newBalance);
    
    const newTx: Transaction = { 
      id: Date.now(), 
      type, 
      amount: val, 
      date: new Date().toLocaleTimeString() 
    };
    
    setTransactions([newTx, ...transactions]);
    setAmount('');
  };

  return (
    <div className="app-container">
      <header><h1>My Ledger</h1></header>

      <div className="balance-card">
        <h3>Current Balance</h3>
        <h1 className="balance-amount">${balance.toLocaleString()}</h1>
      </div>

      <div className="action-panel">
        <input 
          type="number" 
          placeholder="Enter amount" 
          value={amount} 
          onChange={handleInputChange} 
        />
        <div className="button-group">
          <button className="btn-deposit" onClick={() => handleTransaction('deposit')}>Deposit</button>
          <button className="btn-withdraw" onClick={() => handleTransaction('withdraw')}>Withdraw</button>
        </div>
      </div>

      <div className="activity-feed">
        <h3>Recent Transactions</h3>
        {transactions.map(t => (
          <div key={t.id} className={`tx-item ${t.type}`}>
            <span>{t.date}</span>
            <span>{t.type.toUpperCase()}</span>
            <span>{t.type === 'deposit' ? '+' : '-'}${t.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;