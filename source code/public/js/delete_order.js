//Citation for the following function: deleteOrder
//Date: 8/4/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

//Citation for the following function: deleteOrder
//Date: 8/3/2022
//Copied from /OR/ Adapted from /OR/ Based on:
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function delete_Order(order_id) {
    console.log('RUNNING');
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

//Delete the row from a given table row by matching the order id to the order id of the row we want to delete 
function deleteRow(order_id) {
    let table = document.getElementById("orders-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == order_id) {
            table.deleteRow(i);
            break;
        }
    }

}






