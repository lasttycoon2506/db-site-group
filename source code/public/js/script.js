//Citation for the following functions:  showModal(), closeModal(), showUpdateOrderItemsModal(), closeUpdateOrderItemsModal
//showAddOrderItemsModal(), and closeAddOrderItemsModal()
//Date: 8/2/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://www.youtube.com/watch?v=gLWIYk0Sd38&t=843s&ab_channel=RichardCodes

function showModal() {
    document.querySelector('.bg-modal').style.display = 'flex';
}

function closeModal() {
    document.querySelector('.bg-modal').style.display = 'none';
}

function showUpdateOrderItemsModal() {
    document.getElementById('oitems-modal').style.display = 'flex';
}

function closeUpdateOrderItemsModal(order_items_id) {
    document.getElementById('oitems-modal').style.display = 'none';
}

function showAddOrderItemsModal(order_items_id) {
    document.getElementById('add-oitems-modal').style.display = 'flex';
}

function closeAddOrderItemsModal() {
    document.getElementById('add-oitems-modal').style.display = 'none';
}

//////////////////////////////////////////

//Delete Order Function Ajax 

//Citation for the following function: deleteOrder
//Date: 8/4/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function delete_Order(order_id) {
    let link = '/delete-order';
    let data = {
        order_id: order_id
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(order_id);
        }
    });
}

//Delete Row ajax 
//Citation for the following function: deleteOrder
//Date: 8/3/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteRow(order_id) {
    let table = document.getElementById("orders-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == order_id) {
            table.deleteRow(i);
            break;
        }
    }
    location.reload(); //Reload the current page after adding
}


//Update Order Items AJAX Function edit_OrderItems()
//Date: 8/3/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: 
//https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

function edit_OrderItems(order_item_id) {

    let link = '/update-order-items';
    let data = {
        order_items_id: order_items_id
    };

    $.ajax({
        url: link,
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            editRow(order_items_id);
        }
    });
}

//Citation for editRow() function
//Date: 8/3/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: 
//https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

function editRow(order_id) {
    let table = document.getElementById("order-items-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == order_items_id) {
            table.editRow(i);
            break;
        }
    }
    location.reload(); //Reload the current page after updating
}
