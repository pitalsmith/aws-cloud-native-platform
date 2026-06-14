import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  try {
    console.log("Running migration...");
    const sql = `
      CREATE TABLE IF NOT EXISTS transactions (
          id SERIAL PRIMARY KEY,
          type VARCHAR(10) NOT NULL,
          amount DECIMAL(10, 2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS account_balance (
          id SERIAL PRIMARY KEY,
          current_balance DECIMAL(10, 2) DEFAULT 5000.00
      );
      INSERT INTO account_balance (current_balance) VALUES (5000.00);
    `;
    await pool.query(sql);
    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await pool.end();
  }
}

runMigration();