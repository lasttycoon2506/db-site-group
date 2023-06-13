SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
SET sql_mode = 'STRICT_ALL_TABLES';

/* Table Creation for all entities*/

CREATE OR REPLACE TABLE Customers
(
    customer_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    customer_first_name VARCHAR(50) NOT NULL,
    customer_last_name VARCHAR(50) NOT NULL,
    customer_email VARCHAR(50) NOT NULL UNIQUE,
    customer_phone  VARCHAR(50) NOT NULL UNIQUE,
    state VARCHAR(50) NOT NULL,  
    city VARCHAR(50) NOT NULL,   
    street VARCHAR(50)  NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    PRIMARY KEY (customer_id)
);

CREATE OR REPLACE TABLE Employees
(
    employee_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    employee_first_name VARCHAR(50) NOT NULL,
    employee_last_name  VARCHAR(50) NOT NULL,
    employee_email  VARCHAR(50) NOT NULL UNIQUE,
    employee_phone  VARCHAR(50) NOT NULL UNIQUE, 
    employee_title  VARCHAR(50) NOT NULL,
    PRIMARY KEY (employee_id)
);

CREATE OR REPLACE TABLE Surfboards
(
    surfboard_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    surfboard_name  VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    surfboard_price  DECIMAL(13,2) NOT NULL, 
    surfboard_condition VARCHAR(50) NOT NULL,
    surfboard_type VARCHAR(50)   NOT NULL,
    PRIMARY KEY (surfboard_id)
);

CREATE OR REPLACE TABLE Orders
(
   order_id int NOT NULL AUTO_INCREMENT UNIQUE,
   order_date date NOT NULL,
   customer_id int NOT NULL,
   employee_id int NOT NULL,
   order_status BOOLEAN NOT NULL DEFAULT FALSE,
   PRIMARY KEY(order_id),
   CONSTRAINT FK_Orders_Customer_Id
   FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
   CONSTRAINT FK_Orders_Employee_Id
   FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) 
);

/*Intersection Table */ 

CREATE OR REPLACE TABLE Order_Items
(
   order_items_id int NOT NULL AUTO_INCREMENT UNIQUE,
   quantity int NOT NULL,
   surfboard_id int, 
   order_id int NOT NULL,
   PRIMARY KEY(order_items_id),
   CONSTRAINT FK_Order_Items_Surfboard_Id
   FOREIGN KEY (surfboard_id) REFERENCES Surfboards(surfboard_id),
   CONSTRAINT FK_Orders_Order_Id
   FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);

/* Insertion of Data into Tables */

INSERT INTO Customers (customer_first_name, customer_last_name, customer_email, customer_phone, state, city, street, zip_code) 
VALUES ('Bobby', 'Mcgee', 'loopy@aol.com', '385-386-3869', 'KY', 'Lex', '482 Beebop Ave', '96028'), 
('Tim', 'Leary', 'timl@yahoo.com', '463-742-3869', 'Montana', 'Boze', '2892 Moose Dr', '29503'), 
('ZZ', 'Top', 'email@email.com', '8396045903', 'TX', 'Austin', '3583 Spelunky Dr', '25839');

INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone, employee_title) 
VALUES ('jj', 'boy', 'bbk@aol.com', '626262', 'Sales'), 
('mm', 'w', 'lmm@aol.com', '325783', 'Management'),
('albert', 'pimmerman', 'wazoo@yahoo.com', '252-474-8957', 'Sales');

INSERT INTO Surfboards (surfboard_name, color, surfboard_price, surfboard_condition, surfboard_type) 
VALUES ('longerdude', 'white', 259.74, 'Like New', 'Longboard'),
('surfsup', 'blonde', 359, 'Lightly Used', 'Shortboard'),
('ahoymatey', 'magenta', 679.49, 'New', 'Regular');

INSERT INTO Orders (order_date, order_status, customer_id, employee_id) 
VALUES ('2022-01-03', True, 1, 2),
('2023-05-07', True, 2, 2),
('2023-05-010', True, 3, 2),
('2028-09-03', False, 1, 1);

/* Intersection Table */

INSERT INTO Order_Items (quantity, surfboard_id, order_id) 
VALUES (3, 2, 1),
(2, 1, 2),
(1, 3, 3),
(1, NULL, 3),
(3, 1, 1);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
