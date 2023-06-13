//Referenced The Node Starter App

//Citation for the following code
//Date: 7/28/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data


let addOrderForm = document.getElementById('add-order-form');

addOrderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let order_date = document.getElementById("order-date-input");
    let customer_id = document.getElementById("customer-id-input");
    let employee_id = document.getElementById("employee-id-input");
    let order_status = document.getElementById("order-status-input");

    if (order_date.value === '') {
        alert('Invalid Date Entered. Order was not added');
        return; //Return if an invalid date is entered 
    }

    let data = {
        order_date: order_date.value,
        customer_id: customer_id.value,
        employee_id: employee_id.value,
        order_status: order_status.value
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-orders", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRow(xhttp.response);
            order_date.value = '';
            customer_id.value = '';
            employee_id.value = '';
            order_status.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error with the Input was found");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    alert('Succesfully added an Order!'); //Alert for successful order
    window.location.href = '/orders'; //Route to orders page 


});

//Add a new row to the Orders table 
addRow = (data) => {
    let currentTable = document.getElementById("orders-table"); //Select Orders Table Element
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let custIDCell = document.createElement("TD");
    let empIDCell = document.createElement("TD");
    let orderStatusCell = document.createElement("TD");

    // Fill the cells with the data 
    idCell.innerText = newRow.order_id;
    orderDateCell.innerText = newRow.order_date;
    custIDCell.innerText = newRow.customer_id;
    empIDCell.innerText = newRow.employee_id;
    orderStatusCell.innerText = newRow.order_status;

    //Add Delete Buttons to the Right Side of the Order Rows
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteOrder(newRow.order_id); //Upon Clicking, we pass in the Order ID to the deleteOrder function
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(orderDateCell);
    row.appendChild(custIDCell);
    row.appendChild(empIDCell);
    row.appendChild(orderStatusCell);
    row.setAttribute('data-value', newRow.order_id);

    // Add the row to the table
    currentTable.appendChild(row); //Add all the elements to the table
}

