//Imports 
var express = require('express');
var db = require('./sql_database/db-connector');
const path = require("path");
var app = express();
PORT = 1331; //Port Number being used for Project 

//Handlebars
var exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');

//Express / Project
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set up the routes for the images, JS scripts, and CSS files 
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

//////////////////////////////////////////////////////        Routes        ///////////////////////////////////////////////////////////////////////

//Citation for the following functions: 
//Date: 7/22/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

//Render homepage (index)
app.get('/', function (req, res) {
    res.render('index');
});

//Citation for the following functions: 
//Date: 8/3/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box
app.get('/customers', function (req, res) {
    let query1;
    if (req.query.customerLastName === undefined) {
        query1 = "SELECT * FROM Customers;";
    }
    else {
        query1 = `SELECT * FROM Customers WHERE customer_last_name LIKE "${req.query.customerLastName}%"`
    }
    db.pool.query(query1, function (error, rows, fields) {
        let customers = rows;
        return res.render('customers', { data: customers });
    })
});

//Citation for the following functions: 
//Date: 7/24/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

app.post('/add-customers', function (req, res) {
    let data = req.body;

    //Parse out data information 
    let customer_first_name = data["customer-fname-input"];
    let customer_last_name = data["customer-lname-input"];
    let customer_email = data["customer-email-input"];
    let customer_phone = data["customer-phone-input"];
    let city = data["city-input"];
    let state = data["state-input"];
    let street = data["street-input"];
    let zip = data["zip-input"];


    //Validate customer first name, last name, email, phone, city, state, street, zip
    if (customer_first_name === '') {
        res.send('Enter First Name!');
        return;
    }

    if (customer_last_name === '') {
        res.send('Enter Last Name!');
        return;

    }

    if (customer_email === '') {
        res.send('Enter Email!');
        return;

    }

    if (customer_phone === '') {
        res.send('Enter Phone Number!');
        return;

    }

    if (city === '') {
        res.send('Enter City!');
        return;

    }

    if (state === '') {
        res.send('Enter State!');
        return;

    }

    if (street === '') {
        res.send('Enter Street!');
        return;

    }

    if (zip === '') {
        res.send('Enter Zip!');
        return;

    }

    //Build the SQL INSERT Query from data stored in variables
    let insert_query = `INSERT INTO Customers (customer_first_name, customer_last_name, customer_email, customer_phone, state, city, street, zip_code) VALUES ('${customer_first_name}', '${customer_last_name}', 
'${customer_email}', '${customer_phone}', '${state}', '${city}', '${street}', '${zip}');`;

    db.pool.query(insert_query, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Send Status 400 for a Bad Request
        }
        else {
            res.redirect('/customers'); //Redirect to the customers route (NON-AJAX method)
        }
    })
});

//Citation for the following functions: 
//Date: 7/22/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

//Display all employee table entries
app.get('/employees', function (req, res) {
    let select_query = "SELECT * FROM Employees;";
    db.pool.query(select_query, function (error, rows, fields) {
        res.render('employees', { data: rows }); //Render a view with the data being the rows returned from the query
    })

});

//Citation for the following functions: 
//Date: 7/24/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

app.post('/add-employees', function (req, res) {

    let data = req.body;

    //Parse out data from the request 
    let emp_first_name = data["employee-fname-input"];
    let emp_last_name = data["employee-lname-input"];
    let emp_email = data["employee-email-input"];
    let emp_phone = data["employee-phone-input"];
    let emp_title = data["employee-title-input"];


    //Check for blank entries for first name
    if (emp_first_name === '') {
        res.send('Enter First Name!');
        return;
    }

    //Check for blank entries for last name
    if (emp_last_name === '') {
        res.send('Enter Last Name!');
        return;
    }

    //Check for blank entries for employee email
    if (emp_email === '') {
        res.send('Enter Email!');
        return;
    }

    //Check for blank entries for employee phone #
    if (emp_phone === '') {
        res.send('Enter Phone Number!');
        return;
    }

    //Check for blank employee title
    if (emp_title === '') {
        res.send('Enter Title!');
        return;
    }

    let insert_query = `INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone, employee_title) VALUES ('${emp_first_name}', '${emp_last_name}', 
'${emp_email}', '${emp_phone}', '${emp_title}');`;

    db.pool.query(insert_query, function (error, rows, fields) {
        if (error) {
            console.log(error); //Log the error in the console
            res.sendStatus(400); // Send the Bad Request Status 
        }
        else {
            res.redirect('/employees'); //If no errors inserting, refresh to the employees page to view table
        }
    })

});


//Citation for the following function:
//Date: 7/28/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

app.get('/orders', function (req, res) {
    let select_order_intersect = "SELECT Order_Items.order_id, order_items_id, quantity, Orders.order_date, Orders.order_status, Orders.customer_id, Orders.employee_id, Order_Items.surfboard_id from Order_Items inner join Orders ON Order_Items.Order_Id = Orders.Order_Id ORDER BY order_id;";
    let select_orders = "SELECT * FROM Orders";

    //Dropdown menu selections

    let select_cust_id = "SELECT DISTINCT customer_id, customer_first_name, customer_last_name FROM Customers;";
    let select_emp_id = "SELECT DISTINCT employee_id, employee_first_name, employee_last_name FROM Employees;";
    let select_order_id = "SELECT DISTINCT order_id FROM Orders;";
    let select_surfboard_id = "SELECT DISTINCT surfboard_id, surfboard_name FROM Surfboards";

    db.pool.query(select_orders, function (error, rows, fields) {
        //Select all Orders Query
        //For a returned row, iterate through the row, check the value of order_status, then assign Fulfilled or Unfulfilled based on the Boolean value
        //SQL stores true / false values in tinyint integer format
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].order_status === 1) {
                rows[i].order_status = 'Fulfilled';
            }
            if (rows[i].order_status === 0) {
                rows[i].order_status = 'Unfulfilled';
            }
        }

        let all_orders = rows; //Assign the modified Order rows to all_orders 

        //Select from the Intersection Table and include joins to make the data more readable
        db.pool.query(select_order_intersect, function (error, rows, fields) {

            //Check for Order Status Values in the Intersection table
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].order_status === 1) {
                    rows[i].order_status = 'Fulfilled';
                }

                if (rows[i].order_status === 0) {
                    rows[i].order_status = 'Unfulfilled';
                }
            }

            let order_items = rows;

            db.pool.query(select_cust_id, function (error, rows, fields) {
                let customer_id_rows = rows;

                db.pool.query(select_emp_id, function (error, rows, fields) {
                    let emp_id_rows = rows;
                    db.pool.query(select_surfboard_id, function (error, rows, fields) {
                        let surfboard_id_rows = rows;

                        //Render out all orders and order items information for the page for Handlebars
                        return res.render('orders', { data: all_orders, o_items: order_items, customer_id_rows: customer_id_rows, emp_id_rows: emp_id_rows, surf_rows: surfboard_id_rows });
                    })

                }) //select_ customer_ids
            }) //select_ customer_ids
        }) //select_order_items ends
    }) //select_orders  ends
});

//Citation for the following function:
//Date: 8/4/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

app.post('/add-orders', function (req, res) {

    let data = req.body;
    //Parse out data information 
    let order_date = data["order_date"];
    let cust_id = parseInt(data["customer_id"]);
    let emp_id = data["employee_id"];

    if (emp_id !== 'None') {
        emp_id = parseInt(data["employee_id"]);
    }

    let order_status = parseInt(data["order_status"]);


    //Check for Null Values

    //If NaN set value to null
    if (isNaN(cust_id)) {
        cust_id = 'NULL';
    }

    if (isNaN(emp_id)) {
        cust_id = 'NULL';
    }

    if (isNaN(order_status)) {
        order_status = 'NULL';
    }

    //Build the Insert Query
    let insert_query = `INSERT INTO Orders (order_date, order_status, customer_id, employee_id) VALUES ('${order_date}', '${order_status}', '${cust_id}', '${emp_id}');`;

    db.pool.query(insert_query, function (error, rows, fields) {
        let result = rows;

        if (error) {
            console.log(error); //Log the request in console
            res.sendStatus(400); // Bad Request
        }

        else {
            //If no error, then build select rows from Orders query
            let select_query = 'SELECT * FROM Orders';
            db.pool.query(select_query, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    res.send(rows); //Send information
                }
            })
        }
    })
});


app.post('/add-order-items', function (req, res) {
    let data = req.body;
    //Get all Order Items Information
    let quantity = parseInt(data["quantity"]);
    let order_id = parseInt(data["order_id"]);
    let insert_query = '';
    let surfboard_id = parseInt(data["surfboard_id"]);

    if (isNaN(surfboard_id)) {
        surfboard_id = null;
        //Insert null value by skipping the surfboard_id parameter
        //Avoids adding the string 'NULL' and will add the value of NULL into SQL database
        insert_query = `INSERT INTO Order_Items(quantity, order_id) VALUES (${quantity}, '${order_id}');`;
    }

    else {
        //If surfboard_id is not a number then just insert using the full query
        insert_query = `INSERT INTO Order_Items(quantity, surfboard_id, order_id) VALUES ('${quantity}', '${surfboard_id}', '${order_id}');`;
    }

    //Query the insert query 
    db.pool.query(insert_query, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad Request
        }

        else {
            let select_query = 'SELECT * FROM Order_Items'; //Select all from Order Items table
            db.pool.query(select_query, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    res.send(rows);
                }
            })
        }
    })

});


//Get surfboard information 
app.get('/surfboards', function (req, res) {
    //Build Select All Query
    let query_surfboards = "SELECT * FROM Surfboards;";
    db.pool.query(query_surfboards, function (error, rows, fields) {
        res.render('surfboards', { data: rows }); //Render Select All From Surfboards Query 
    })
});

//Add Surfboards Route
app.post('/add-surfboards', function (req, res) {
    let data = req.body;
    //Parse out data information 
    let surfboard_name = data["surfboard-name-input"];
    let color = data["surfboard-color-input"];
    let surfboard_price = data["surfboard-price-input"];
    let surfboard_condition = data["surfboard-cond-input"];
    let surfboard_type = data["surfboard-type-input"];

    if (surfboard_name === '') {
        res.send('Enter Surfboard Name!');
        return;
    }

    if (color === '') {
        res.send('Enter Color!');
        return;
    }

    if (surfboard_price === '') {
        res.send('Enter Price!');
        return;
    }

    if (surfboard_condition === '') {
        res.send('Enter Condition!');
        return;
    }

    if (surfboard_type === '') {
        res.send('Enter Surfboard Type!');
        return;
    }

    let insert_query = `INSERT INTO Surfboards (surfboard_name, color, surfboard_price, surfboard_condition, surfboard_type) VALUES ('${surfboard_name}', '${color}', 
'${surfboard_price}', '${surfboard_condition}', '${surfboard_type}');`;

    db.pool.query(insert_query, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad Request
        }

        else {
            res.redirect('/surfboards'); //Redirect to surfboards route 
        }
    })

});


//Citation for the following functions: app.put('/update-order-items')
//Date: 8/5/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data


app.put('/update-order-items', function (req, res, next) {
    let data = req.body;
    let order_items_id = parseInt(data["order_items_id"]);
    let order_quantity = parseInt(data["quantity"]);
    let surfboard_id = parseInt(data["surfboard_id"]);
    let order_id = parseInt(data["order_id"]);

    //If surfbaord isn't a numeric value, (None value selected) set to NULL
    if (isNaN(surfboard_id)) {
        surfboard_id = 'NULL';
    }

    let update_query = `UPDATE Order_Items SET quantity = ${order_quantity}, surfboard_id = ${surfboard_id}, order_id = ${order_id}  WHERE Order_Items.order_items_id = ${order_items_id}`;
    let select_query = `SELECT * FROM Order_Items WHERE order_items_id = ?`;

    db.pool.query(update_query, [order_items_id, order_quantity], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(select_query, [order_items_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    res.send(rows);
                }
            })
        }
    })
});


//Citation for the following functions: 
//Date: 7/28/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

app.delete('/delete-order', function (req, res, next) {
    let data = req.body; // Get request body information
    let order_id = parseInt(data.order_id);

    //Queries
    let intersection_delete_query = 'DELETE FROM Order_Items WHERE order_id = ?'; //Remove order from the intersection table 
    let main_delete_query = 'DELETE FROM Orders WHERE order_id = ?'; //Remove from main table

    db.pool.query(intersection_delete_query, [order_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); //Bad Request 
        }
        else {
            db.pool.query(main_delete_query, [order_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.sendStatus(204);
                }
            })
        }
    })
});




/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

