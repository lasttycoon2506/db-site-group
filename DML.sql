SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
SET sql_mode = 'STRICT_ALL_TABLES';

/* Table Creation for all entities*/

CREATE OR REPLACE TABLE Customers(
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
   employee_id int, 
   order_status BOOLEAN NOT NULL DEFAULT FALSE,
   PRIMARY KEY(order_id),
   CONSTRAINT FK_Orders_Customer_Id
   FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
   CONSTRAINT FK_Orders_Employee_Id
   FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE SET NULL
);

CREATE OR REPLACE TABLE Order_Items
(
   order_items_id int NOT NULL AUTO_INCREMENT UNIQUE,
   quantity int NOT NULL,
   surfboard_id int,
   order_id int NOT NULL,
   PRIMARY KEY(order_items_id),
   CONSTRAINT FK_Order_Items_Surfboard_Id
   FOREIGN KEY (surfboard_id) REFERENCES Surfboards(surfboard_id) ON DELETE CASCADE,
   CONSTRAINT FK_Orders_Order_Id
   FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);


/* Insertion of Data into Tables */
-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO Customers (customer_first_name, customer_last_name, customer_email, customer_phone, state, city, street, zip_code) 
VALUES (:customer_first_name, :customer_last_name, :customer_email, :customer_phone, :state, :city, :street, :zip);

INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone, employee_title) 
VALUES (:emp_first_name, :emp_last_name, :emp_email, :emp_phone, :emp_title);

INSERT INTO Surfboards (surfboard_name, color, surfboard_price, surfboard_condition, surfboard_type) 
VALUES (:surfboard_name, :color, :surfboard_price, :surfboard_condition, :surfboard_type);

INSERT INTO Orders (order_date, order_status, customer_id, employee_id) 
VALUES (:oorderdateInput, :oorderstatusInput, :ocustomerid_from_dropdown_Input, :oemployeeid_from_dropdown_Input);

INSERT INTO Order_Items (quantity, surfboard_id, order_id) 
VALUES (:iquantityInput, :isurfboardid_from_dropdown_Input, :iorderid_from_dropdown_Input);

/* Allow Inserting a Null surfboard_id value, used in app.js */ 
INSERT INTO Order_Items(quantity, order_id) 
VALUES (:quantity, :order_id);



/* Displays all for each entity */ 
SELECT * from Customers;
SELECT * from Employees;
SELECT * from Orders;  
SELECT * from Surfboards;


/* DROP DOWN MENU SELECTIONS */
SELECT DISTINCT customer_id, customer_first_name, customer_last_name FROM Customers; /* Select distinct Customer ID, First Name, Last Name rows*/
SELECT DISTINCT employee_id, employee_first_name, employee_last_name FROM Employees; /* Select distinct Employee ID, First Name, Last Name rows*/
SELECT DISTINCT order_id FROM Orders; /* Select distinct Order Ids in Orders*/
SELECT DISTINCT surfboard_id, surfboard_name FROM Surfboards; /* Select distinct Surfboard_Id and Surfboards rowsfor the drop down */


/* Update for Order Items table (intersection table) */
UPDATE Order_Items SET quantity = quantity_from_Order_Items_webpg_Input WHERE order_items_id = order_items_id_from_Order_Items_webpg_text_Input;
Order_Items.quantity, Orders.order_id, Orders.order_date, Orders.customer_id, Orders.employee_id;

/* Order summary after quantity changed for particular order_items_id */
SELECT Order_Items.order_id, order_items_id, quantity, Orders.order_date, Orders.order_status, Orders.customer_id, Orders.employee_id, Order_Items.surfboard_id 
FROM Order_Items INNER JOIN
Orders ON Order_Items.Order_Id = Orders.Order_Id 
ORDER BY order_id;


/* Delete for Orders */ 
DELETE from Orders where order_id = :order_id;

/* Search for Customer(s) */
SELECT customer_last_name from Customers WHERE customer_last_name LIKE :customerLastName;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
