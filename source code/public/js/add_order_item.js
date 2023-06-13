//Referenced The Node Starter App
//Citation for the following code addOrderItemsForm() AND addRow()
//Date: 7/28/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data


let addOrderItemsForm = document.getElementById("add-order-items-form");
addOrderItemsForm.addEventListener("submit", function (e) {

    e.preventDefault(); 
    let quantity = document.getElementById("quantity-input");
    let surfboard_id = document.getElementById("surfboard-id-input");
    let order_id = document.getElementById("order-id-input");

    //Place parsed data into object
    let data = {
        quantity: quantity.value,
        surfboard_id: surfboard_id.value,
        order_id: order_id.value
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-items", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRow(xhttp.response);
            quantity = '';
            surfboard_id = '';
            order_id = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error with the Input was found");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    window.location.href = '/orders'; //Route back to orders 

});

//Referenced The Node Starter App
//Citation for the following code addOrderItemsForm() AND addRow()
//Date: 7/28/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data


addRow = (data) => {
    let currentTable = document.getElementById("order-items-table");
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let oitems_idCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let surf_idCell = document.createElement("TD");
    let order_idCell = document.createElement("TD");

    // Fill the cells with correct data
    oitems_idCell.innerText = newRow.order_items_id;
    quantityCell.innerText = newRow.quantity;
    surf_idCell.innerText = newRow.surfboard_id;
    order_idCell.innerText = newRow.order_id;

    //Add right side edit buttons
    editCell = document.createElement("button");
    editCell.innerHTML = "Delete";
    editCell.onclick = function () {
        edit_Order(newRow.order_items_id); //On Clicking the edit button call editOrder function and pass in the Order items ID for that row
    };

    // Add the cells to the row 
    row.appendChild(oitems_idCell);
    row.appendChild(quantityCell);
    row.appendChild(surf_idCell);
    row.appendChild(order_idCell);

    row.setAttribute('data-value', newRow.order_items_id);

    // Add the row to the table
    currentTable.appendChild(row); //Add to table
}

