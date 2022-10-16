async function show_all_invoices() {
    $("#all_invioces_pane").toggle("up");
    current_cheap_hotel_wellgo_invoice = await get_all_cheap_hotel_wellgo_invoices(window.localStorage.getItem("ANDSBZID"));
    await render_all_cheap_hotel_wellgo_invoices(current_cheap_hotel_wellgo_invoice);
}

function hide_all_invoices() {
    $("#all_invioces_pane").toggle("up");
}

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
    `;
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

async function render_all_cheap_hotel_wellgo_invoices(invoice_obj){

    document.getElementById('all_invoices_list_container').innerHTML=`
        <div style="text-align: center; padding: 30px 10px; color: white; border: 1px solid red; background-color: rgba(0,0,0,0.5); font-size: 14px;">
            <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: red;" aria-hidden="true"></i>
            Nothing to show at the moment
        </div>
    `;

    if(invoice_obj[0].invoice_items.length > 0){

        //Current Invoice which is the pending one
        let j = (invoice_obj[0].invoice_items.length - 1);
        if(invoice_obj[0].invoice_items[j].status==="pending"){
            let f_card = invoice_obj[0].invoice_items[j].card.number;
            let f_date = change_iso_date_to_readable_format(invoice_obj[0].invoice_items[j].date_paid || invoice_obj[0].invoice_items[j].date_due);
            let f_amount = invoice_obj[0].invoice_items[j].total;
            let f_status = invoice_obj[0].invoice_items[j].status
            let f_name = invoice_obj[0].invoice_items[j].name.includes("subscription") ? "Subscription" : invoice_obj[0].invoice_items[j].name;
            document.getElementById("all_invoices_current_invoice").innerHTML=`
                <div class="each_invoice_item_flex" style="cursor: pointer; background-color: rgba(0,0,0,0.5); padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.2); display: flex; justify-content: space-between;">
                    <p style="color:rgb(0, 179, 233); font-size: 14px;">
                        <span style="font-size: 14px; margin-right: 5px;">
                            <span style="color: rgba(255,255,255,0.5);">
                            ${f_card}</span>
                            <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                            ${f_name}
                            <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                            (current)
                        </span>
                    </p>
                    <p style="margin-left: 10px; color: white;">
                        <span style="font-size: 14px; color: rgb(255, 132, 132);">${f_date}</span>
                        <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                        <span style="margin-left: 5px; font-size: 14px;">$${f_amount}</span>
                    </p>
                </div>
            `;
        }
        

        document.getElementById('all_invoices_list_container').innerHTML='';
        for(let i=0; i<invoice_obj[0].invoice_items.length; i++){
            let card = invoice_obj[0].invoice_items[i].card.number;
            let date = change_iso_date_to_readable_format(invoice_obj[0].invoice_items[i].date_paid || invoice_obj[0].invoice_items[i].date_due);
            let amount = invoice_obj[0].invoice_items[i].total;
            let status = invoice_obj[0].invoice_items[i].status;
            if(status.toLowerCase().includes('paid')){
                status = `
                    <i class="fa fa-check" style="margin-right: 5px; color: lightgreen;" aria-hidden="true"></i>
                    ${status}
                `;
            }else{
                status = `
                    <span style="color: red; font-size: 14px;">
                        <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: red;" aria-hidden="true"></i>
                        ${status}
                    </span>
                `;
                
            }
            let name = invoice_obj[0].invoice_items[j].name.includes("subscription") ? "Subscription" : invoice_obj[0].invoice_items[j].name;
            document.getElementById("all_invoices_list_container").innerHTML += `
                <div style="padding: 10px;">
                    <div class="each_invoice_item_flex" style="cursor: pointer; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); display: flex; justify-content: space-between;">
                        <p style="font-size: 14px; color: lightgreen;">
                            <span style="font-size: 14px; margin-right: 5px;">
                                <span style="color: rgba(255,255,255,0.5);">
                                ${card}</span>
                                <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                                ${name}
                                <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                                (${status})
                            </span>
                        </p>
                        <p style="margin-left: 10px; color: white;">
                            <span style="font-size: 14px;">${date}</span>
                            <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                            <span style="margin-left: 5px; font-size: 13px;">$${amount}</span>
                        </p>
                    </div>
                </div>
            `;
        }
    }
}

$(function() {
    $('#wellgo_cheap_hotel_invoices_date_filter_input').daterangepicker({
      opens: 'left',
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
  
      setTimeout(()=>{
        document.getElementById("wellgo_cheap_hotel_invoices_date_filter_input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
      }, 100);
  
      /*rooms_grid_view_config.picked_dates.checkin = start.format('YYYY-MM-DD');
      rooms_grid_view_config.picked_dates.checkout = end.format('YYYY-MM-DD');

      rooms_grid_view_config.calendar.first = start.format('YYYY-MM-DD');
      rooms_grid_view_config.calendar.last = end.format('YYYY-MM-DD');

      make_reservations_post_data.checkin_date = start.format('YYYY-MM-DD');
      make_reservations_post_data.checkout_date = end.format('YYYY-MM-DD');

      //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
      //fligh_search_data.return_date = end.format('YYYY-MM-DD');
  
      //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
  
      //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));*/
    });
});

//save_cheap_hotel_wellgo_invoices();