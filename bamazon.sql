DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE  bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    dept_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(10) NULL,
    PRIMARY KEY(id)
);


INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Wrist Wrap Ice Pack", "Health", 24.90, 100),
("Coleman 4-Person Cabin Tent", "Outdoors", 99.99, 100),
("22 AWG Wire Box", "Electronics", 12.99, 100),
("AA Battery Holder with On-Off Switch", "Electronics", 7.99, 100),
("Anker Soundcore Wakey Alarm Clock", "Electronics", 99.99, 100),
("Anker Soundcore Motion+ Bluetooth Speaker", "Electronics", 99.99, 100),
("Tools of Titans", "Books", 16.61, 100),
("Detroit Become Human", "Games", 17.71, 100),
("Galanz Mini Fridge", "Kitchen", 199.99, 100),
("Kill All Humans!", "Games", 59.99, 100);