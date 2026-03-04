-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS schooldb;

-- Use the database
USE schooldb;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email) VALUES 
('John Doe', 'john.doe@example.com'),
('Jane Doe', 'jane.doe@example.com')
ON DUPLICATE KEY UPDATE 
name = VALUES(name),
updated_at = CURRENT_TIMESTAMP;
