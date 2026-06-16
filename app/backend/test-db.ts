import { Pool } from 'pg';

const pool = new Pool({
  host: '127.0.0.1', // Force IPv4
  user: 'user',
  password: 'password',
  database: 'banking_ledger',
  port: 5432,
});

async function test() {
  try {
    console.log("Attempting to connect...");
    const res = await pool.query('SELECT NOW()');
    console.log("Success! Database time:", res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();