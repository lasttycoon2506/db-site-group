//Referenced The Node Starter App

//Citation for the following code
//Date: 8/3/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: 
//https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data


let updateOrderItemsForm = document.getElementById("update-order-items-form"); //Grab Order Items Form Element

updateOrderItemsForm.addEventListener("submit", function (e) {

    e.preventDefault(); //Prevent default submission 
    let order_items_id = document.getElementById("oitems-id-input");
    let quantity = document.getElementById("u-quantity-input");
    let surfboard_id = document.getElementById("u-surfboard-id-input");
    let order_id = document.getElementById("u-order-id-input");

    //Place parsed data values an object
    let data = {
        order_items_id: order_items_id.value,
        quantity: quantity.value,
        surfboard_id: surfboard_id.value,
        order_id: order_id.value
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-order-items", true); //Send a PUT request to the route update-order-items
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response);
            order_items_id = '';
            quantity = '';
            surfboard_id = '';
            order_id = '';


        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error with the Input was found"); //Log error if error was found
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data)); //Convert data into JSON string 

    alert('Successfully Editted Order Items!'); //Alert the user that a successful update has occured 
    window.location.href = '/orders'; //Route back to orders page 

});

updateRow = (data) => {
    let currentTable = document.getElementById("order-items-table");
}
