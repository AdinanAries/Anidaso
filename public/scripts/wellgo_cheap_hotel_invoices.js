function get_all_cheap_hotel_wellgo_invoices(brand_id){
    return $.ajax({
        type: "GET",
        url: "/get_all_cheap_hotel_wellgo_invoices/"+brand_id,
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            return err
        }
    });
}

async function cheap_hotel_render_initial_wellgo_invoices(invoice_obj){

    document.getElementById('logged_in_hotel_invoices_list').innerHTML=`
        <div style="text-align: center; padding: 30px 10px; color: white; border: 1px solid red; background-color: rgba(0,0,0,0.5); font-size: 14px;">
            <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: red;" aria-hidden="true"></i>
            Nothing to show at the moment
        </div>
    `
    if(invoice_obj[0].invoice_items.length > 0){
        document.getElementById('logged_in_hotel_invoices_list').innerHTML='';
        for(let i=0; i<invoice_obj[0].invoice_items.length; i++){
            let card = invoice_obj[0].invoice_items[i].card.number;
            let date = change_iso_date_to_readable_format(invoice_obj[0].invoice_items[i].date_paid || invoice_obj[0].invoice_items[i].date_due);
            let amount = invoice_obj[0].invoice_items[i].total;
            if(i>2) break;
            document.getElementById('logged_in_hotel_invoices_list').innerHTML += `<div class="logged_in_hotel_invoice">
                <p>
                    <span style="font-size: 14px;">
                        <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-file-text-o" aria-hidden="true"></i>
                        <span style="color: rgba(255,255,255,0.6)">${card} </span>
                        on <span style="color: rgba(255,255,255,0.6)">${date} </span>
                        <span style="font-size: 14px; color:rgb(224, 174, 174);">($${amount})</span>
                    </span>
                    <span onclick="show_all_invoices();" class="logged_in_hotel_invoice_view_btn" style="cursor: pointer; font-size: 14px; color: white; padding-left: 20px;">
                        see<i style="color: rgb(137, 204, 235); font-size: 14px; margin-left: 5px;" class="fa fa-eye" aria-hidden="true"></i>
                    </span>
                </p>
            </div>`;
        }
    }
    
}

function save_cheap_hotel_wellgo_invoices(){
    return $.ajax({
        type: "POST",
        url: "/save_cheap_hotel_wellgo_invoices/",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(wellgo_invoices_for_cheap_hotels),
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

//save_cheap_hotel_wellgo_invoices();