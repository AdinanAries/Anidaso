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

    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_payment_loader_animation").style.display = "none";
    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_submit_btn").style.display = "block";

}

var form = document.getElementById('payment-form');

form.addEventListener('submit', function (ev) {
  ev.preventDefault();
  createCustomer().then(()=>{
    //All subsequent steps in this promise callback
  });
});

//step 2. Create customer using email credentials----------------------------------------
async function createCustomer() {

    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_payment_loader_animation").style.display = "block";
    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_submit_btn").style.display = "none";

    let billingEmail = document.getElementById("book_cheap_book_direct_register_hotel_email_input_fld").value;
    return fetch('/register_cheap_hotel_create_customer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: billingEmail,
        name: document.getElementById("book_cheap_book_direct_register_hotel_name_input_fld").value
      }),
    }).then((response) => {
        return response.json();
    }).then((result) => {
        // result.customer.id is used to map back to the customer object
        //step 3. Create payment method with card and customer_id-----------------------------------------
        createPaymentMethod(card, result.customer.id)
        return result;
    });

}

function createPaymentMethod(card_param, customer_id) {

const customerId = customer_id;

// Set up payment method for recurring usage
let billingName = document.getElementById("book_cheap_book_direct_register_hotel_name_input_fld").value;

let priceId = document.getElementById('book_cheap_book_direct_subscription_price_id').innerText;

stripe.createPaymentMethod({
        type: 'card',
        card: card_param,
        billing_details: {
            name: billingName,
        },
    })
    .then((result) => {
    if (result.error) {
        displayError(result);
    } else {
        //step 4. Create subscription with customer_id payment_method_Id and price_id-----------------------------------------------------
        createSubscription({
            customerId: customerId,
            paymentMethodId: result.paymentMethod.id,
            priceId: priceId,
        });
    }
    });
}

function createSubscription({customerId, paymentMethodId, priceId,}) {
return (
    fetch('/register_cheap_hotel_create_subscription', {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            customerId: customerId,
            paymentMethodId: paymentMethodId,
            priceId: priceId,
        }),
    })
    .then((response) => {
        return response.json();
    })
    // If the card is declined, display an error to the user.
    .then((result) => {
        if (result.error) {
        // The card had an error when trying to attach it to a customer.
        throw result;
        }
        return result;
    })
    // Normalize the result to contain the object returned by Stripe.
    // Add the additional details we need.
    .then((result) => {
        return {
        paymentMethodId: paymentMethodId,
        priceId: priceId,
        subscription: result,
        };
    })
    // Some payment methods require a customer to be on session
    // to complete the payment process. Check the status of the
    // payment intent to handle these actions.
    .then(handlePaymentThatRequiresCustomerAction)
    // If attaching this card to a Customer object succeeds,
    // but attempts to charge the customer fail, you
    // get a requires_payment_method error.
    .then(handleRequiresPaymentMethod)
    // No more actions required. Provision your service for the user.
    .then(onSubscriptionComplete)
    .catch((error) => {
        // An error has happened. Display the failure to the user here.
        // We utilize the HTML element we created.
        document.getElementById("book_cheap_hotel_register_new_hotel_subscription_payment_loader_animation").style.display = "none";
        document.getElementById("book_cheap_hotel_register_new_hotel_subscription_submit_btn").style.display = "block";

        displayError(error);
    })
);
}
  
function onSubscriptionComplete(result) {

    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_payment_loader_animation").style.display = "none";
    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_submit_btn").style.display = "block";

    // Payment was successful.
    if (result.subscription.status === 'active') {

        register_cheap_hotel_post_data.subscription_id = result.subscription.id

        show_prompt_to_user("Payment", "Your payment was made successfully!");
        console.log(result);

        toggle_hide_show_cheap_hotel_payments_prompt();

        //time to upload photos
        //then save cheap hotel data to database
        upload_photos_to_cloud_bucket().then(data => {
            console.log(data);
            if(data.success){
                save_cheap_hotel_information_to_db();
            }
        });
        

        // Change your UI to show a success message to your customer.
        // Call your backend to grant access to your service based on
        // `result.subscription.items.data[0].price.product` the customer subscribed to.
    }
}

function handlePaymentThatRequiresCustomerAction({subscription, invoice, priceId, paymentMethodId, isRetry,}) {

    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_payment_loader_animation").style.display = "none";
    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_submit_btn").style.display = "block";

    if (subscription && subscription.status === 'active') {
        // Subscription is active, no customer actions required.
        return { subscription, priceId, paymentMethodId };
    }

    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    let paymentIntent = invoice ? invoice.payment_intent : subscription.latest_invoice.payment_intent;

    if (paymentIntent.status === 'requires_action' ||
        (isRetry === true && paymentIntent.status === 'requires_payment_method')){

        return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
            payment_method: paymentMethodId,
        }).then((result) => {

            if (result.error) {

                // Start code flow to handle updating the payment details.
                // Display error message in your UI.
                // The card was declined (i.e. insufficient funds, card has expired, etc).
                throw result;

            }else{

                if (result.paymentIntent.status === 'succeeded') {
                    // Show a success message to your customer.
                    return {
                        priceId: priceId,
                        subscription: subscription,
                        invoice: invoice,
                        paymentMethodId: paymentMethodId,
                    };
                }
            }
        }).catch((error) => {
            displayError(error);
        });

    } else {
        // No customer action needed.
        return { subscription, priceId, paymentMethodId };
    }
}

function handleRequiresPaymentMethod({subscription, paymentMethodId, priceId}) {

    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_payment_loader_animation").style.display = "none";
    document.getElementById("book_cheap_hotel_register_new_hotel_subscription_submit_btn").style.display = "block";

    if (subscription.status === 'active') {
        // subscription is active, no customer actions required.
        return { subscription, priceId, paymentMethodId };
    } else if (
        subscription.latest_invoice.payment_intent.status ===
        'requires_payment_method'
    ) {
        // Using localStorage to manage the state of the retry here,
        // feel free to replace with what you prefer.
        // Store the latest invoice ID and status.
        localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
        localStorage.setItem(
        'latestInvoicePaymentIntentStatus',
        subscription.latest_invoice.payment_intent.status
        );
        throw { error: { message: 'Your card was declined.' } };
    } else {
        return { subscription, priceId, paymentMethodId };
    }

}
  
function retryInvoiceWithNewPaymentMethod({customerId, paymentMethodId, invoiceId, priceId }){
    return(
        fetch('/register_cheap_hotel_retry_invoice', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                customerId: customerId,
                paymentMethodId: paymentMethodId,
                invoiceId: invoiceId,
            }),
        }).then((response) => {
            return response.json();
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
            if (result.error) {
                // The card had an error when trying to attach it to a customer.
                throw result;
            }
            return result;
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then((result) => {
            return {
                // Use the Stripe 'object' property on the
                // returned result to understand what object is returned.
                invoice: result,
                paymentMethodId: paymentMethodId,
                priceId: priceId,
                isRetry: true,
            };
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(handlePaymentThatRequiresCustomerAction)
        // No more actions required. Provision your service for the user.
        .then(onSubscriptionComplete)
        .catch((error) => {
            // An error has happened. Display the failure to the user here.
            // We utilize the HTML element we created.
            displayError(error);
        })
    );
}

function cancelSubscription() {
    return fetch('/register_cheap_hotel_cancel_subscription', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subscriptionId: subscriptionId,
        }),
    }).then(response => {
        return response.json();
    }).then(cancelSubscriptionResponse => {
        // Display to the user that the subscription has been cancelled.
    });
}
  