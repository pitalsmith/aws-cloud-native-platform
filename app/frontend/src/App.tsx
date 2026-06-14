import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import axios from 'axios';
import './App.css';


const BASE_URL = "http://a9d66f2ee554e4bc889b98acb188321a-1651196171.us-east-1.elb.amazonaws.com";

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 2. Updated to use BASE_URL
      const res = await axios.get(`${BASE_URL}/balance`);
      setBalance(Number(res.data.balance));
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTransaction = async (type: 'deposit' | 'withdraw'): Promise<void> => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    try {
      // 3. Updated to use BASE_URL
      await axios.post(`${BASE_URL}/transaction`, { 
        type: type === 'withdraw' ? 'withdrawal' : 'deposit', 
        amount: val 
      });

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