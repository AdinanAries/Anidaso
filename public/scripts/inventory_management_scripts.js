var new_inventory_item_post_data = {
    hotel_brand_id: "",
    item: {
        name: "",
        unit_price: 0,
        service_department: "",
        property_id: "",
        stock_quantity: 0
    }
}

function get_and_return_all_inventory(hotel_id){   
    return $.ajax({
        type: "GET",
        url: "/get_all_hotel_inventory/"+hotel_id,
        success: data => {
            console.log(data);
            return data
        },
        error: err => {
            console.log(err);
            return err
        }
    });

}

function generate_item_code(len, arr) {

    var ans = localStorage.getItem("ANDSBZID").substring(localStorage.getItem("ANDSBZID").length - 4, localStorage.getItem("ANDSBZID").length -1)
     
    for (var i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
        ans += Math.floor(Math.random() * 9);
    }
    return ans;
}

console.log("random string: ", generate_item_code(6, "Bread"));

function collect_new_inventory_item_info_from_inputs(){
    new_inventory_item_post_data.item.name = document.getElementById("").value;
    new_inventory_item_post_data.item.unit_price = document.getElementById("").value;
    new_inventory_item_post_data.item.stock_quantity = document.getElementById("").value;
    new_inventory_item_post_data.item.service_department = document.getElementById("").value;
    new_inventory_item_post_data.item.property_id = document.getElementById("").value;
}

function add_and_return_new_inventory_item(hotel_id){
    return $.ajax({
        type: "POST",
        url: "/add_new_inventory_item/"+hotel_id,
        data: JSON.stringify(new_inventory_item_post_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: data => {
            console.log(data);
            return data
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}