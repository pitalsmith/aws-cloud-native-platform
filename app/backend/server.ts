import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432, // Ensure this matches your RDS port
});

// const pool = new Pool({
//   host: 'localhost', // Changed from 127.0.0.1
//   user: 'user',
//   password: 'password',
//   database: 'banking_ledger',
//   port: 5433,

// });

app.get('/api/balance', async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT current_balance FROM account_balance WHERE id = 1');
    res.json({ balance: result.rows[0].current_balance });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Failed to connect to database" });
  } finally {
    if (client) client.release(); 
  }
});


app.get('/api/balance', async (req, res) => {

});


app.post('/api/transaction', async (req, res) => {
  const { type, amount } = req.body;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const updateQuery = type === 'deposit' 
      ? 'UPDATE account_balance SET current_balance = current_balance + $1 WHERE id = 1' 
      : 'UPDATE account_balance SET current_balance = current_balance - $1 WHERE id = 1';
    
    await client.query(updateQuery, [amount]);
    await client.query('INSERT INTO transactions (type, amount) VALUES ($1, $2)', [type, amount]);
    await client.query('COMMIT');
    res.status(201).send('Success');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    res.status(500).send('Transaction Failed');
  } finally {
    client.release();
  }
});


app.listen(3000, () => console.log('Backend running on port 3000'));