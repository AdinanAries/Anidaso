let stripe = Stripe('pk_test_0etJCeBvPiJRDEEzxSLVXgBW009YQmsWbU');
let elements = stripe.elements();

//Step 1. Create Card with payment details----------------------------------------
let card = elements.create('card');
card.mount('#card-element');

card.on('change', function (event) {
    displayError(event);
});

function displayError(event) {

    //changeLoadingStatePrices(false);
    let displayErrorElement = document.getElementById('card-element-errors');
    if (event.error) {
        displayErrorElement.textContent = event.error.message;
    } else {
        displayErrorElement.textContent = '';
    }

    //document.getElementById("book_cheap_hotel_register_new_hotel_subscription_payment_loader_animation").style.display = "none";
    //document.getElementById("book_cheap_hotel_register_new_hotel_subscription_submit_btn").style.display = "block";

}