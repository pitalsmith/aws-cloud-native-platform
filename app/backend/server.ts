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
  port: 5432, 
  ssl: { rejectUnauthorized: false }
});

async function connectToDb() {
  try {
    await pool.query('SELECT 1'); // Simple heartbeat query
    console.log("Database connection successful!");
  } catch (err) {
    console.error("Database connection failed, but app will continue running:", err);
  }
}

connectToDb();



app.get('/api/balance', async (req, res) => {
  try {
    // Use 'current_balance' instead of 'balance'
    const result = await pool.query('SELECT current_balance FROM account_balance LIMIT 1');
    
    if (result.rows.length > 0) {
      // Return the value using the correct key
      res.json({ balance: result.rows[0].current_balance });
    } else {
      res.status(404).json({ error: 'No balance found' });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
});

app.get('/debug-db', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'account_balance'
    `);
    res.json(result.rows);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
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




app.listen(5000, () => console.log('Backend running on port 5000'));