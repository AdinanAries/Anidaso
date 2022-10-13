function get_all_cheap_hotel_wellgo_invoices(brand_id){
    return $.ajax({
        type: "GET",
        url: "/get_all_cheap_hotel_wellgo_invoices/"+brand_id,
        success: res => {
            return res;
        },
        error: err => {
            return err
        }
    });
}