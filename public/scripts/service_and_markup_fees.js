var all_fees_and_markups = [
    {
        type: "service",
        amount: 3.55,
        currency: "USD",
        Reason: "additional infor mation to be added here"
    },
    {
        type: "markup",
        percentage: 5,
        currency: "USD",
        Reason: "additional information to be added here"
    }
]

function include_service_fee(price, currency){

    let fee_obj = all_fees_and_markups.filter( each => {
        return each.type === "Service"
    });

    
    let fee_price = site_currency_coverter(fee_obj[0].currency, currency, fee_obj[0].amount);

    let new_price = price + (parseFloat(fee_price).toFixed(2));
    
    return new_price;
}

function return_service_fee(currency){

    let fee_obj = all_fees_and_markups.filter( each => {
        return each.type === "service"
    });

    
    let fee_price = site_currency_coverter(fee_obj[0].currency, currency, fee_obj[0].amount);

    return parseFloat(fee_price).toFixed(2);
}
