-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  category VARCHAR(100),
  stock_quantity INT NOT NULL DEFAULT 0,
  sku VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name, description, price, category, stock_quantity, sku) VALUES 
('Laptop Pro 15"', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 'Electronics', 25, 'LP-15-001'),
('Wireless Mouse', 'Ergonomic wireless mouse with precision tracking', 29.99, 'Electronics', 150, 'WM-001'),
('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 89.99, 'Electronics', 75, 'MK-001'),
('USB-C Hub', '7-in-1 USB-C hub with HDMI and USB 3.0 ports', 49.99, 'Electronics', 100, 'UCH-001'),
('Monitor Stand', 'Adjustable monitor stand with built-in storage', 39.99, 'Accessories', 60, 'MS-001'),
('Webcam HD', '1080p HD webcam with noise cancellation', 79.99, 'Electronics', 40, 'WC-001')
ON DUPLICATE KEY UPDATE 
name = VALUES(name),
description = VALUES(description),
price = VALUES(price),
category = VALUES(category),
stock_quantity = VALUES(stock_quantity),
updated_at = CURRENT_TIMESTAMP;
