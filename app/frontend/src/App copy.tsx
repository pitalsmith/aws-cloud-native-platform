import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import axios from 'axios';
import './App.css';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdraw';
  amount: number;
  date: string;
}

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  console.log("balance:", balance);

  // Load data from backend on startup
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/balance');
      setBalance(Number(res.data.balance));
     
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // 2. Perform database update via POST
  const handleTransaction = async (type: 'deposit' | 'withdraw'): Promise<void> => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    try {
      await axios.post('http://localhost:3000/api/transaction', { 
        type: type === 'withdraw' ? 'withdrawal' : 'deposit', 
        amount: val 
      });

      // Update UI after successful server response
      fetchData(); 
      
      const newTx: Transaction = { 
        id: Date.now(), 
        type, 
        amount: val, 
        date: new Date().toLocaleTimeString() 
      };
      
      setTransactions([newTx, ...transactions]);
      setAmount('');
    } catch (err) {
      alert("Transaction failed");
    }
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