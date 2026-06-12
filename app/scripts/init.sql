CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initialize with a starting balance entry or just keep a separate table for balance
CREATE TABLE account_balance (
    id SERIAL PRIMARY KEY,
    current_balance DECIMAL(10, 2) DEFAULT 5000.00
);
INSERT INTO account_balance (current_balance) VALUES (5000.00);