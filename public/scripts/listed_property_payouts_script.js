async function show_all_payouts() {
    $("#all_payouts_pane").toggle("up");
    cheap_hotel_payouts_object = await get_all_cheap_hotel_payouts(localStorage.getItem("ANDSBZID"));
    await render_all_cheap_hotel_payouts(cheap_hotel_payouts_object);
}

function hide_all_payouts() {
    $("#all_payouts_pane").toggle("up");
}

function render_all_cheap_hotel_payouts(payouts_obj){

    let current = payouts_obj[0].current;
    let cycle = payouts_obj[0].cycle;
    let period = `
            ${change_iso_date_to_readable_format(current.period.split(" - ")[0])} - ${change_iso_date_to_readable_format(current.period.split(" - ")[1])}
        `
    let total = 0;
    current.items_sold.forEach(each=>{
        total += parseFloat(each.total);
    });
    let card = payouts_obj[0].card.number;
    let paydate = change_iso_date_to_readable_format(current.date_due);
    document.getElementById("all_payouts_current_payout_cycle").innerHTML=`
        <div style="cursor: pointer; background-color: rgba(0,0,0,0.5); padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.2); display: flex; justify-content: space-between;">
            <p style="color:rgb(0, 179, 233); font-size: 14px;">
                <span style="font-size: 13px; color: rgb(255, 132, 132); margin-right: 5px;">Next:</span>
                ${card}
            </p>
            <p style="margin-left: 10px; color: white;">
                <span style="margin-left: 5px; font-size: 13px;">$${total}</span>
                <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                <span style="margin-left: 5px; font-size: 13px; color: rgb(255, 132, 132);">${paydate}</span>
                <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                <span style="margin-left: 5px; font-size: 13px; color: rgb(255, 132, 132);">${cycle}</span>
            </p>
        </div>
    `;
    document.getElementById("all_payouts_list_container").innerHTML="";
    if(payouts_obj[0].past.length>0){
        for(let i=0; i<payouts_obj[0].past.length; i++){
            let item = payouts_obj[0].past[i];
            let i_period = `
                    ${change_iso_date_to_readable_format(item.period.split(" - ")[0])} - ${change_iso_date_to_readable_format(item.period.split(" - ")[1])}
                `
            let i_total = 0;
            item.items_sold.forEach(each=>{
                i_total += parseFloat(each.total);
            });
            let i_card = payouts_obj[0].card.number;
            let i_paydate = change_iso_date_to_readable_format(item.date_paid_out);
            document.getElementById("all_payouts_list_container").innerHTML += `
            <div style="padding: 10px;">
            <div style="cursor: pointer; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); display: flex; justify-content: space-between;">
                <p style="color:rgb(0, 179, 233); font-size: 14px;">
                    <span style="font-size: 13px; color: olive; margin-right: 5px;">On:</span>
                    ${i_card}
                </p>
                <p style="margin-left: 10px; color: white;">
                    <span style="margin-left: 5px; font-size: 13px;">$${i_total}</span>
                    <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                    <span style="font-size: 13px;">${i_paydate}</span>
                    <span style="margin-left: 5px; color: rgba(255,255,255,0.2);">|</span>
                    <span style="margin-left: 5px; font-size: 13px;">Monthly</span>
                </p>
            </div>
        </div>
            `;
        }
    }else{
        document.getElementById("all_payouts_list_container").innerHTML=`
            <p style="font-size: 14px; border: 1px solid red; text-align: center; padding: 30px 10px; margin: 10px; color: white; background-color: rgba(0,0,0,0.5);">
                <i style="margin-right: 10px; color: red;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                no past payouts available
            </p>
        `
    }
}

function get_all_cheap_hotel_payouts(hotel_brand_id){
    return $.ajax({
        type: "GET",
        url: "/get_all_cheap_hotel_payouts/"+hotel_brand_id,
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

function save_cheap_hotel_payouts(){
    return $.ajax({
        type: "POST",
        url: "/save_cheap_hotel_payouts/",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cheap_hotel_payouts_object),
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

function cheap_hotel_render_initial_payout_information(payouts_obj){
    let current = payouts_obj[0].current;
    let period = `
            ${change_iso_date_to_readable_format(current.period.split(" - ")[0])} - ${change_iso_date_to_readable_format(current.period.split(" - ")[1])}
        `
    let total = 0;
    current.items_sold.forEach(each=>{
        total += parseFloat(each.total);
    });
    let card = payouts_obj[0].card.number;
    let paydate = change_iso_date_to_readable_format(current.date_due);
    document.getElementById("initial_payouts_card_number_display").innerText=card;
    document.getElementById("cheap_hotel_payouts_info_display").innerHTML = `
        <p class="logged_in_payments_card_display" style="display: none; margin-top: 10px; font-weight: bolder; color: white;"><span style="color:aqua; font-size: 14px;">
            Account:</span>
            ${card}
            <i onclick="toggle_hide_show_anything('loggedin_hotel_edit_payments_forms')" style="color:rgb(127, 144, 175); font-size: 18px; margin-left: 15px; cursor: pointer;" class="fa fa-pencil" aria-hidden="true"></i>
        </p>
        <p style="color: white; font-size: 14px; margin-top: 5px;">
            <span style="color:aqua; font-size: 14px;">Period:</span>
            ${period}
        </p>
        <p style="color: white; font-size: 14px; margin-top: 5px;">
            <span style="color:aqua; font-size: 14px;">Total Sold:</span>
            $${total.toFixed(2)}
        </p>
        <p style="color: white; font-size: 14px; margin-top: 5px;">
            <span style="color:aqua; font-size: 14px;">Pay Date:</span>
            ${paydate}
        </p>
    `;
}

//save_cheap_hotel_payouts();