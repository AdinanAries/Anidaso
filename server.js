const express = require("express");
const app = express();
const path = require("path");
const Amadeus = require("amadeus");
const bcrypt = require("bcrypt");
const axios = require('axios');
const { default: Axios } = require("axios");
const fetch = require("node-fetch");
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const aws = require("aws-sdk");
var https = require('https');
var querystring = require('querystring');
var fs = require('fs');
var mongoose = require("mongoose");
require("dotenv").config();

//aws sdk configurations
const S3_BUCKET = process.env.S3_BUCKET;
//aws.config.region = 'eu-west-1';
aws.config.region = 'us-east-2';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4'
});

//express session
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

//instantiating Amandues...
var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_API_SECRETE
});

//stripe connection
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

//mongo db atlass stuff
var mongo_db_url = process.env.MONGO_DB_URL;
mongoose.connect(mongo_db_url, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
  console.log("connected to database successfully")
});

//data models
var cheap_hotel = require("./models/cheap_hotel_model");
var cheap_hotel_login = require("./models/cheap_hotel_login_model");
var cheap_hotel_booking = require("./models/cheap_hotel_bookings_model");
var cheap_hotel_property = require("./models/each_cheap_hotel_building_model");
var cheap_hotel_room = require("./models/cheap_hotel_rooms_model");
var login_user = require("./models/login_user_model");
var signup_user = require("./models/signup_user_model");
var cheap_hotel_inventory_model = require("./models/cheap_hotel_inventory_model");
var cheap_hotel_guest = require("./models/cheap_hotel_guests_Model");
var hotel_deals = require("./models/hotel_deals_model");
var cheap_hotel_invoice = require("./models/cheap_hotel_invoices_model");
var bookings_data = require("./models/bookings_log_model");
//var booked_hotel_data = require("./models/booked_hotels_log");


app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession);

//passport local authentication
passport.use(login_user.createStrategy());
passport.serializeUser(login_user.serializeUser());
passport.deserializeUser(login_user.deserializeUser());

//Globals to store endpoint data
var all_events = [];
var all_attractions = [];
var AmaduesOauthTokenExpires = 0;
var AmadeusAccessToken = "";

//Middlewares
// For parsing application/json 
app.use(express.json()); 
// For parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));
//Path to static assets
app.use(express.static(path.join(__dirname, "public")));

//Setting ports
const PORT = process.env.PORT || 5000;



function convert_date_object_to_db_string_format(dateObj){
    
  let the_month = dateObj.toLocaleString().split(",")[0].split("/")[0];
  let the_day = dateObj.toLocaleString().split(",")[0].split("/")[1];
  let the_year = dateObj.toLocaleString().split(",")[0].split("/")[2];
  //console.log(`${the_year}/${the_month}/${the_day}`)

  let a_date = new Date(`${the_year}/${the_month}/${the_day}`);
  //a_date = new Date(a_date.setDate(a_date.getDate() - 1));

  let date_string = a_date.toISOString(); //eg. 2021-05-02T09:13:26.243Z*/
  return date_string.split("T")[0];

}


//getting Amadues OAuth2 access token
function Amadues_OAuth(){

  //form data
  let req_data = querystring.stringify({
    grant_type: "client_credentials",
    client_id: process.env.AMADEUS_CLIENT_ID,
    client_secret: process.env.AMADEUS_API_SECRETE
  });

  // request option
  var options = {
    host: 'test.api.amadeus.com',
    method: 'POST',
    path: '/v1/security/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': req_data.length
    }
  };

  // request object
  var req = https.request(options, function (res) {
    var result = '';
    res.on('data', function (chunk) {
      result += chunk;
    });
    res.on('end', function () {

      let data = JSON.parse(result)
      AmaduesOauthTokenExpires = data.expires_in;
      AmadeusAccessToken = data.access_token;

      setTimeout(()=>{
        Amadues_OAuth();
      },(data.expires_in * 1000));
      
      console.log("Gotten new access token from Amadues")
      //console.log(result);
    });
    res.on('error', function (err) {
      console.log(err);
    })
  });

  // req error
  req.on('error', function (err) {
    console.log(err);
  });
  
  //send request with the req_data form
  req.write(req_data);
  req.end();
}

if(AmaduesOauthTokenExpires === 0){
  Amadues_OAuth();
}


//Endpoints

//Ticket Master - Getting Public Events Data
app.get('/publicevents/', function(request, response, next){

    if(all_events.length === 0){
      
      const getEvents = async () => {
        try {
            const res = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=3zYxdvHT8NJzOWY01URK1nF5ltjjqB6b&size=100&sort=relevance,asc');
            //console.log(res.data._embedded.events);
            console.log("called api");
            all_events = [...all_events, ...res.data._embedded.events];

            response.send(all_events);
        } catch (err) {
            console.error(err);
        }
    }

    getEvents();
    
    
  }else{
    console.log("returning cached data");
    response.send(all_events);
  }

});

//Ticket Master Getting Public Attractions
app.get("/publicattractions/", (request, response, next)=>{

if(all_attractions.length === 0){

      const getAttractions = async () => {

          try {
              const res = await axios.get('https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=F7RYAvaz0LtW0I55jTJibyZy3SaEnzw1');
              //console.log(res.data._embedded.events);
              console.log("called api");
              all_attractions = [...all_attractions, ...res.data._embedded.attractions];
              //console.log(res);
              response.send(all_attractions);

          } catch (err) {
              console.error(err);
          }

      }
      
      getAttractions();

  }else{
      console.log("returning cached data");
      response.send(all_attractions);
  }

});

//Amadeus - Getting Airports and Cities
app.get('/airportSearch/', function(req,res,next){ 
    amadeus.referenceData.locations.get({ 
      keyword: req.query.term, 
      subType: 'AIRPORT,CITY' 
    }).then(function(response){ 
      res.json(response.data); 
      console.log(response.data.iataCode); 
    }).catch(function(error){ 
      res.json([]); 
      console.log("error"); 
      console.log(error.response); 
    }); 
});

//Amadues - Searching Flight Offers (One-way)
app.post('/searchflight/', (req, res, next)=>{

  //console.log(req.body);
  console.log(req.query);
  
  let search_obj = {};

  //console.log(req.body);
  if(req.body.trip_round === "one-way"){

    let origin = req.body.origin_iata;
    let destination = req.body.destination_iata;
    let depart_date = req.body.departure_date;
    let num_of_adults = req.body.number_of_adults;
    let num_of_children = req.body.number_of_children;
    let num_of_infants = req.body.number_of_infants;
    let flight_class = req.body.flight_class;
    let currency = req.body.currencyCode;
    
    search_obj = {

      currencyCode: currency,
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: depart_date,
      adults: num_of_adults,
      children: num_of_children,
      infants: num_of_infants,
      travelClass: flight_class

    }

    amadeus.shopping.flightOffersSearch.get(search_obj).then(function(response){
      //console.log(response.data);
      res.send(response.data);
  
    }).catch(function(responseError){
      res.json([]);
      console.log(responseError);
  
    });

  }else if(req.body.trip_round === "multi-city"){

    search_obj = req.body.itinerary;

      amadeus.shopping.flightOffersSearch.post(JSON.stringify(search_obj)).then(function(response){
        //console.log(response.data);
        res.send(response.data);
    
      }).catch(function(responseError){
        res.json([]);
        console.log(responseError);
    
      });
  }

  
});

//Amadues - Getting Final Flight Price
app.post('/getfinalflightprice/', async (req, res, next)=>{

  //res.json(req.body);

  let inputFlight = [req.body];

  console.log(inputFlight)

  const responsePricing = await amadeus.shopping.flightOffers.pricing.post(
      JSON.stringify({
        data: {
          type: 'flight-offers-pricing',
          flightOffers: inputFlight
      }})).catch(err=>{
        console.log(err)
      });
        
  try {
    await res.json(JSON.parse(responsePricing.body));
  } catch (err) {
    await res.json(err);
  }

});

//Amadues - Creating Fligh Order
app.post('/amadues_flight_create_order/', async (req, res, next)=>{

  let responseOrder = await amadeus.booking.flightOrders.post(
    JSON.stringify({
      data: {
        type: 'flight-order',
        flightOffers: req.body.data.flightOffers,
        travelers: req.body.data.travelers,
        remarks: req.body.data.remarks,
        contacts: req.body.data.contacts
    }})).catch((err) =>{
      console.log(err);
    });

  try{
    if(responseOrder){
      await res.json(JSON.parse(responseOrder.body));
    }else{
      await res.json({failed: true, msg: "order not fullfilled!"});
    }
  }catch(err){
    await res.json(err);
  }

});

//Amadues - Saving booked Flight
app.post("/save_booked_flight/:anidaso_user_id", async(req, res, next) => {
  
  let flight = await new bookings_data({
    booking_date: new Date().toString(),
    booking_type: "flight",
    is_anidaso_client_user_id: req.params.anidaso_user_id,
    booking_data: req.body
  });

  let saved_flight = await flight.save();

  res.send(saved_flight);
});

//Amadues - Airline Code Lookup
app.get('/getairlinedata/:code', (req, res, next)=>{

  let code = req.params.code;

  amadeus.referenceData.airlines.get({
    airlineCodes : code
  }).then(data =>{
    res.json(data.body);
  })

});

//Amadues - Flight Most Traveled Destinations
app.get('/mosttraveleddestinations/origin/:city/period/:date', (req, res, next)=>{
  //MAD 2021-01
  let _city = req.params.city;
  let _date = req.params.date;

  amadeus.travel.analytics.airTraffic.traveled.get({
    originCityCode : _city,
    period : _date
  }).then(data =>{
    res.json(data.body);
  }).catch(err => {
    console.log(err);
  })
});

//Amadues - Price Flight Analysis
app.get('/flight_price_metric/origin/:o_code/destination/:d_code/date/:date', (req, res, next) =>{

  //'MAD', 'CDG', '2021-03-13'

  let _o_code = req.params.o_code;
  let _d_code = req.params.d_code;
  let _date = req.params.date;

  amadeus.analytics.itineraryPriceMetrics.get({
    originIataCode: _o_code,
    destinationIataCode: _d_code,
    departureDate: _date,
  }).then(data =>{
    res.json(data);
  }).catch(err =>{
      console.log(err);
  });

});

//Getting Flight Price Analysis
app.post('/flightpriceanalysis/', (req, res, next)=>{

  let origin = "";
  let destination = "";
  let depart_date = "";
  let currency = "";
  let is_one_way = "true";

  if(req.body.trip_round === "one-way"){
    origin = req.body.origin_iata;
    destination = req.body.destination_iata;
    depart_date = req.body.departure_date;
    currency = req.body.currencyCode;
  }else if(req.body.trip_round === "multi-city"){
    is_one_way = "false";
    origin = req.body.itinerary.originDestinations[0].originLocationCode;
    destination = req.body.itinerary.originDestinations[0].destinationLocationCode;
    depart_date = req.body.itinerary.originDestinations[0].departureDateTimeRange.date;
    currency = req.body.itinerary.currencyCode;
  }

  /*origin = "MAD";
  destination = "CDG";*/

  //console.log(currency);

  axios.get(
    "https://test.api.amadeus.com/v1/analytics/itinerary-price-metrics?originIataCode="+origin+"&destinationIataCode="+destination+"&departureDate="+depart_date+"&currencyCode="+currency+"&oneWay="+is_one_way,
    {
      headers: {
        "Authorization": ("Bearer "+ AmadeusAccessToken)
      }
  }).then(result =>{

    res.send(result.data);
    //console.log(result.data);

  }).catch(err =>{
    res.send([]);
    console.log(err);

  }).then(()=>{
    //defaults
  });

});

//Hotel Sentiments End Points
app.get('/get_hotel_sentiments/:hotelId', (req, res, next)=>{

  let hotel_id = req.params.hotelId;

  axios.get(
    "https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds="+hotel_id, 
    {

      headers: {
        "Authorization": ("Bearer " + AmadeusAccessToken),
        "Accept": "application/vnd.amadeus+json"
      }
  }).then(data => {
    //console.log(data.data);
    res.send(data.data);
  }).catch(err =>{
    console.log(err);
  }).then(()=>{
    //defaults
  });
});

//Hotel Search End Points
app.post("/get_hotels/", (req, res, next)=>{

  //console.log(req.query);
  console.log(req.body);

  let city = req.body.city;
  let checkinDate = req.body.checkin;
  let checkoutDate = req.body.checkout;
  let roomQuantity = req.body.roomQuantity;
  let adults = req.body.adults;
  let currency = req.body.currency
  let ratings = req.body.ratings;

  axios.get(
    "https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode="+city+"&checkInDate="+checkinDate+"&checkOutDate="+checkoutDate+"&roomQuantity="+roomQuantity+"&adults="+adults+"&currency="+currency+"&ratings="+ratings,//+"&radius=40&ratings="+ratings+"&view=FULL&sort=PRICE",
    {
      headers: {
        "Authorization": ("Bearer "+ AmadeusAccessToken)
      }
  }).then(data => {
    //console.log(data);
    res.send(data.data);
  }).catch(err => {
    console.log(err);
    res.send({data:[]});
  }).then(()=>{
    //defaults
  });
  
})

app.post("/get_hotel_rates/", (req, res, next)=>{

  let all_params = req.body.all_params;
  console.log(all_params);
  //all_params = all_params.toString().replaceAll("^^and", "&").replaceAll("^^equal", "=").replaceAll("^^quo","'").replaceAll("^^quo2", '"');
  
  axios.get("https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?"+all_params,
  {
    headers: {
      "Authorization": ("Bearer "+ AmadeusAccessToken)
    }
}).then(data => {
  console.log(data.data);
  res.send(data.data);
}).catch(err =>{
  console.log(err)
  res.send({data: []});
}).then(()=>{
  //defaults
});

})

app.post("/get_room_final_price/", (req, res, next)=>{

  let url = req.body.url;
  console.log(url);
  //all_params = all_params.toString().replaceAll("^^and", "&").replaceAll("^^equal", "=").replaceAll("^^quo","'").replaceAll("^^quo2", '"');
  
  axios.get(url,
  {
    headers: {
      "Authorization": ("Bearer "+ AmadeusAccessToken)
    }
}).then(data => {
  console.log(data.data);
  res.send(data.data);
}).catch(err =>{
  console.log(err)
  res.send({data: []});
}).then(()=>{
  //defaults
});

})

app.post('/finish_room_booking/', (req, res, next)=> {

  //res.send(req.body);

  axios.post("test.api.amadeus.com/v1/booking/hotel-bookings",
  {
    data: req.body
  },{
    headers: {
      "Authorization": ("Bearer "+ AmadeusAccessToken)
    }
}).then(data=>{
    console.log(data);
    res.send(data);
  }).catch(err=>{
    console.log(err);
    res.send({error: true});
  }).then(()=>{
    //defaults
  });

});

app.post("/save_booked_hotel/:anidaso_user_id", async(req, res, next) => {
  
  let hotel = await new bookings_data({
    booking_date: new Date().toString(),
    booking_type: "hotel",
    is_anidaso_client_user_id: req.params.anidaso_user_id,
    booking_data: req.body
  });

  let saved_hotel = await hotel.save();

  res.send(saved_hotel);

});

app.post("/send_booking_confirmation_email/:email/", (req,res, next)=>{
  let client_email = req.params.email;
  let req_body = req.body;
  res.send({
    email: client_email,
    data: req_body
  });
});

//login and signup routes
app.get('/ensureLoggedIn/',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res, next) => {
    //console.log("slash route");
    //res.sendFile('public/index.html', {root: __dirname});
    res.send({success: true, msg: "user is logged in"});
  }
);

app.get("/login/", (req, res, next)=>{
  res.sendFile(path.join(__dirname + "/public/index.html"));
})
app.get("/signup/", (req, res, next)=>{
  res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.post("/login/", async (req, res, next)=>{

  try{

    /*let encrypted_password = await bcrypt.hash(req.body.password, 10);

    let user = new login_user({
      username: req.body.username,
      password: encrypted_password
    });*/

    passport.authenticate('local',
    (err, user, info) => {

      if (err) {
        return next(err);
      }

      if (!user) {
        //return res.redirect('/login?info=' + info);
        //return res.redirect('/login');
        return res.send({status: "fail", msg: "login failed", desc: info});
      }

      req.logIn(user, function(err) {

        if (err) {
          return next(err);
        }

        //return res.redirect('/');
        return res.send({status: "success", msg: "login successful", data: user});

      });

    })(req, res, next);

    //res.send(req.body);
    //reach database with credentials here
    //I might need some library to provide for session managemet
  }catch(e){
    res.send({error: e})
  }

});

app.post("/signup/", async (req, res, next)=> {

  try{

    let encrypted_password = await bcrypt.hash(req.body.password, 10);

    let user = new signup_user({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      profile_picture: "",
      has_price_alert: false,
      search_history: []
    });

    let existing_user = await signup_user.findOne({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email
    }).exec();
    //console.log(existing_user);

    if(existing_user){
      res.send({failed: true, msg: "user already exist"});
    }else{

      user.save((error, result) =>{

        //res.send(result);

        if(error){
          res.send({failed: true, err: error, msg: "server side error"});
        }else{

          /*let login = new login_user({
            _id: result._id,
            username: result.email,
            password: req.body.password
          });*/
    
          login_user.register({
            _id: result._id,
            username: result.email, 
            active: false 
          }, req.body.password);

          res.send(result);

          /*login.save((err, rslt) =>{

            if(err){
              res.send({failed: true, error: err, msg: "server side error"});
            }else{
              res.send(rslt);
            }

          });*/

        }
  
      });
      
    }
    

  }catch(e){
    res.send({error: e})
  }
  //res.send(req.body);

});

//changing user price alert
app.get("/change_price_alert/:user_id", async (req, res, next)=> {

  let operation = req.query.action;
  let user_id = req.params.user_id;

  //console.log("UserId: ", user_id, " - Opeartion: ", operation);
  let user = await signup_user.findById(user_id);

  if(operation === "activate"){
    user.has_price_alert = true;
  }else if(operation === "deactivate"){
    user.has_price_alert = false;
  }

  let updated_user = await new signup_user(user);

  let saved_user = await updated_user.save();

  res.send(saved_user);

});

//showing register cheap hotels on home page
app.get("/register_hotel_brand/", (req, res, next) =>{
  res.sendFile(path.join(__dirname + "/public/index.html"));
}) 

//user info routes
app.get("/get_login_user/:id", async (req, res, next) =>{
  
  console.log(req.params.id);

  let the_user = await signup_user.findOne({
    _id: req.params.id
  }).exec();
  
  res.send(the_user);

});

//cheap_hotels_login (listed property login)
app.post("/listed_property_login/", async (req, res, next) => {

  console.log(req.body);
  //6063dd3fb6dfe50bc800dd5f 
  //6063e055b6dfe50bc800dd60
  let hotel = await cheap_hotel.findById("6063dd3fb6dfe50bc800dd5f");

  res.send(hotel);

});

app.get("/get_logged_in_hotel_info/:id", async (req, res, next) => {

  console.log(req.params.id);

  let hotel = await cheap_hotel.findById(req.params.id);

  res.send(hotel);
});

//book cheap/book direct routes
//getting cheap hotels by city or name
app.post("/cheap_hotels/", async (req, res, next) =>{

  let search_type = req.body.search_type; //values = ["by_city", "by_name", "by_city_and_name"]
  let city = req.body.city;
  let country = req.body.country;
  let hotel_name = req.body.hotel_name;

  if(search_type === "by_city"){
    let gotit = "got it";
    //search by city and country
  }else if(search_type === "by_name"){
    //search by name
  }
  else{
    //search by name, city and country
  }

  let hotels = await cheap_hotel.find();

  res.send([]);
  //res.send(hotels);
  /*/this code should be replaced with that to read data from DB
  fs.readFile('./book_cheap_hotels_data.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    //this line of code is important
    res.send(data);
    //console.log(data);
  });*/

});

//check if cheap hotel is already registered
app.post('/check_if_cheap_hotel_is_already_registered/', async (req, res, next) => {

  //console.log(req.body)

  try{

    let hotel_name = req.body.name;
    let req_email = req.body.email;
    let req_location = req.body.location;

    let existing_cheap_hotel = await cheap_hotel.findOne({
      name: hotel_name,
      email: req_email,
      location: req_location
    }).exec();

    if(existing_cheap_hotel){
      res.send({success: false, data: existing_cheap_hotel, msg: "this hotel is already registered."});
    }else{
      res.send({success: true});
    }
    

  }catch(e){
    res.send({success: false, data: e, msg: "server error"});
  }
  //res.send(req.body);
});

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
app.post('/stripe-webhook/', async (req, res) => {

    // Retrieve the event by verifying the signature using the raw body and secret.    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    const dataObject = event.data.object;

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
      case 'invoice.paid':
        // Used to provision services after the trial has ended.
        // The status of the invoice will show up as paid. Store the status in your
        // database to reference when a user accesses your service to avoid hitting rate limits.
        break;
      case 'invoice.payment_failed':
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
          // handle a subscription cancelled by your request
          // from above.
        } else {
          // handle subscription cancelled automatically based
          // upon your subscription settings.
        }
        break;
      default:
      // Unexpected event type
    }
    res.sendStatus(200);
  }
);

app.post('/register_cheap_hotel_create_customer/', async(req, res, next) => {
  const customer = await stripe.customers.create({
    name: req.body.name,
    email: req.body.email,
    description: 'Anidaso cheap hotel client',
  });
  res.send({customer: customer});
})

app.post('/register_cheap_hotel_create_subscription/', async (req, res) => {
  // Attach the payment method to the customer
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
  } catch (error) {
    return res.status('402').send({ error: { message: error.message } });
  }

  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(
    req.body.customerId,
    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    }
  );

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: req.body.priceId }],
    expand: ['latest_invoice.payment_intent'],
  });

  res.send(subscription);
});

app.post('/register_cheap_hotel_retry_invoice/', async (req, res) => {
  // Set the default payment method on the customer

  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
    await stripe.customers.update(req.body.customerId, {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    });
  } catch (error) {
    // in case card_decline error
    return res
      .status('402')
      .send({ result: { error: { message: error.message } } });
  }

  const invoice = await stripe.invoices.retrieve(req.body.invoiceId, {
    expand: ['payment_intent'],
  });
  res.send(invoice);
});

app.post('/register_cheap_hotel_cancel_subscription/', async (req, res) => {
  // Delete the subscription
  const deletedSubscription = await stripe.subscriptions.del(
    req.body.subscriptionId
  );
  res.send(deletedSubscription);
});

app.post("/register_cheap_hotel_payment", (req, res, next)=> {
  //1. this route takes care of payments
  //some payment info has to be sent back to server for further check before allowing hotel information be saved
});

//uploading cheap hotels photos here
app.post("/register_cheap_hotel_upload_photo/", (req, res, next)=> {
    //2. upload photos and get urls for each upload
    //this endpoint should return the photo url from aws s3 buckets to be collected on the clientside
});

//sign url for uploading photo to s3
app.get("/upload_picture_sign_s3/", (req, res, next) =>{

  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.send(returnData);
  });
});

app.delete("/delete_file_from_s3/", async (req, res, next) => {

  let file_name = req.query.file_name;

  const params = {
    Bucket: S3_BUCKET,  /* required # Put your bucket name*/
    Key: file_name         /* required # Put your file name*/
  };

  //The code below deletes file from s3 bucket
  s3.createBucket({ Bucket: S3_BUCKET }, function () {
    s3.deleteObject(params, function (err, data) {
        if (err) {
          console.log(err);
        }
        else{
            console.log("Successfully deleted file from bucket");
        }
        console.log(data);
    });
  });

});

//registering new cheap hotel
app.post('/register_cheap_hotel/', async (req, res, next) =>{
  
  try{

    let new_cheap_hotel = new cheap_hotel({
      name: req.body.name,
      location: req.body.location,
      url: req.body.url,
      price: req.body.price,
      currency: req.body.currency,
      photos: req.body.photos,
      cities_operating: req.body.cities_operating,
      email: req.body.email,
      mobile: req.body.mobile,
      fax: "+0 000 000 0000",
      description: req.body.description,
      rating: req.body.rating,
      reviews: req.body.reviews,
      approved: false,
      subscribed: true,
      number_of_ratings: 1,
      number_of_reviews: 1,
      subscription_id: req.body.subscription_id 
    });

    let new_saved_hotel = await new_cheap_hotel.save();
    res.send({success: true, data: new_saved_hotel, msg: "Hotel registration finished successfully!"});

  }catch(e){
    res.send({success: false, data: e, msg: "Registration failed at the final stage"});
  }

});

//create new hotel property
app.post("/create_new_hotel_property/", async (req, res, next) => {

  try{

    let new_property_obj = new cheap_hotel_property({
      hotel_brand_id: req.body.hotel_brand_id,
      full_location_address: req.body.full_location_address,
      city: req.body.city,
      country: req.body.country,
      zipcode: req.body.zipcode,
      street_address: req.body.street_address,
      town: req.body.town,
      description: req.body.description,
      amenities: req.body.amenities
    });

    let saved_property = await new_property_obj.save();
    res.send({success: true, data: saved_property, msg: "Hotel property added successfully!"});

  }catch(e){
    res.send({success: false, data: e, msg: "Registration failed at the final stage"});
  }

});

//create new hotel room
app.post("/create_new_hotel_room/", async (req, res, next) =>{

  /**
   * cancellation_request: {
        request_status: req.body,
        booking_id: req.body,
        date_requested: req.body,
      }
   */

  try{

    let room_obj = new cheap_hotel_room({
      property_id: req.body.property_id,
      hotel_brand_id: req.body.hotel_brand_id,
      room_number: req.body.room_number,
      closed: req.body.closed,
      booked: req.body.booked,
      room_type: req.body.room_type,
      bed_type: req.body.bed_type,
      room_link: "",
      guest_capacitance: {
        adults: req.body.guest_capacitance.adults,
        children: req.body.guest_capacitance.children
      },
      price: req.body.price,
      description: req.body.description,
      amenities: req.body.amenities,
      next_available_date: req.body.next_available_date,
      next_available_time:  req.body.next_available_time,
      cancellation_policy: {
        time_period: req.body.cancellation_policy.time_period,
        percentage:  req.body.cancellation_policy.percentage
      },
      photo_url: req.body.photo_url,
      cancellation_requests: req.body.cancellation_requests,
      cancellation_history: req.body.cancellation_history
    });

    let saved_room = await room_obj.save();

    saved_room.room_link = `https://anidaso.com/bookcheapnow.html?r=${saved_room._id}`;

    let room_with_link = new cheap_hotel_room(saved_room);

    room_with_link = await room_with_link.save();

    res.send({success: true, data: room_with_link, msg: "room has been added successfully!"});

  }catch(e){
    res.send({success: false, data: e, msg: "Server Error!"});
  }
});

//getting cheap hotel rooms
app.get("/get_cheap_hotel_rooms/:id", async (req, res, next) =>{

  let room = await cheap_hotel_room.find({
    hotel_brand_id: req.params.id
  }).exec();

  res.send(room);

});

app.get("/get_room_by_id/:room_id", async (req, res, next) =>{

  let room = await cheap_hotel_room.findById(req.params.room_id);
  res.send(room);

});

//getting rooms by property id
app.get("/get_cheap_hotel_rooms_by_property_id/:property_id", async (req, res, next) => {
  
  let rooms = await cheap_hotel_room.find({
    property_id: req.params.property_id
  }).exec();

  res.send(rooms);

})

//getting cheap hotel properties
app.get("/get_cheap_hotel_properties/:id", async (req, res, next) =>{

  let property = await cheap_hotel_property.find({
    hotel_brand_id: req.params.id
  }).exec();

  res.send(property);

});

//booking a room
app.post("/book_a_cheap_room/", async (req, res, next) => {

  try{

    let booking_obj = new cheap_hotel_booking({
      hotel_brand_id: req.body.hotel_brand_id,
      property_id: req.body.property_id,
      booking_date: req.body.booking_date,
      rooms: req.body.rooms,
      //full_property_location: req.body.full_property_location,
      all_dates_of_occupancy: req.body.all_dates_of_occupancy,
      price_paid: req.body.price_paid,
      checkin_date: req.body.checkin_date,
      checkout_date: req.body.checkout_date,
      checkin_time: req.body.checkin_time,
      checkout_time: req.body.checkout_time,
      guests: req.body.guests,
      guest_contact: req.body.guest_contact
    });

    let save_booking_res = await booking_obj.save();
    res.send({success: true, data: save_booking_res, msg: "Your booking finished successfully!"});

  }catch(e){
    res.send({success: false, data: e, msg: "Server Error!"});
  }

});

app.post("/update_cheap_hotel_booking/", async (req, res, next) => {

  let booking = await cheap_hotel_booking.findById(req.body._id);

  booking.all_dates_of_occupancy = req.body.all_dates_of_occupancy;
  booking.booking_date = req.body.booking_date;
  booking.checkin_date = req.body.checkin_date
  booking.checkin_time = req.body.checkin_time;
  booking.checkout_date = req.body.checkout_date;
  booking.checkout_time = req.body.checkout_time;
  booking.guest_contact = req.body.guest_contact
  booking.guests = req.body.guests;
  booking.hotel_brand_id = req.body.hotel_brand_id;
  booking.price_paid = req.body.price_paid;
  booking.property_id = req.body.property_id;
  booking.rooms = req.body.rooms;

  let updated_booking = await new cheap_hotel_booking(booking);
  let saved_booking = await updated_booking.save();

  res.send(saved_booking);

});

app.get("/is_room_booked_on_a_certain_date/:booking_date/:room_id/:room_number", async (req, res, next) =>{

  let answer = {
    isChekin: false,
    isBooked: false,
    isCheckout: false,
    all_dates_of_occupancy: []
  }

  let booked = await cheap_hotel_booking.find({
    checkin_date: req.params.booking_date,
    rooms: {
      "$all": {
        id: req.params.room_id,
        number: req.params.room_number
      }
    }
  }).exec();

  if(booked.length > 0){
    answer.isChekin = true;
    answer.isBooked = true;
    answer.all_dates_of_occupancy = booked[0].all_dates_of_occupancy
  }

  if(booked.length === 0){
    booked = await cheap_hotel_booking.find({
      checkout_date: req.params.booking_date,
      rooms: {
        "$all": {
          id: req.params.room_id,
          number: req.params.room_number
        }
      }
    }).exec();
  }

  if(booked.length > 0 && !answer.isChekin){
    answer.isCheckout = true;
    answer.isBooked = true;
    answer.all_dates_of_occupancy = booked[0].all_dates_of_occupancy
  }

  if(booked.length === 0){
    booked = await cheap_hotel_booking.find({
      all_dates_of_occupancy: {
        "$all": req.params.booking_date
      },
      rooms: {
        "$all": {
          id: req.params.room_id,
          number: req.params.room_number
        }
      }
    }).exec();
  }

  if(booked.length > 0 && !answer.isChekin && !answer.isCheckout){
    answer.isBooked = true;
    answer.all_dates_of_occupancy = booked[0].all_dates_of_occupancy
  }

  res.send(answer);

});

app.get("/get_listed_property_room_bookings/:hotel_id", async (req, res, next) => {

  let bookings = await cheap_hotel_booking.find({
    hotel_brand_id: req.params.hotel_id
  }).exec();

  res.send(bookings);

});

app.post("/get_all_bookings_based_date_range_and_rooms_filter/:hotel_id/:first_date/:last_date/:room_id/:room_number/:property_id", async (req, res, next) => {
  
  let hotel_id = req.params.hotel_id;
  let first_date = req.params.first_date;
  let last_date = req.params.last_date;
  let room_number = req.params.room_number;
  let room_id_p = req.params.room_id;
  let property_id_p = req.params.property_id;

  let dates_list = req.body.dates_list;

 //console.log(dates_list)

  let bookings = [];

  if(property_id_p === "all" && room_id_p === "all"){
    bookings = await cheap_hotel_booking.find({
      hotel_brand_id: hotel_id
    }).exec();
  }else if(property_id_p === "all"){
    bookings = await cheap_hotel_booking.find({
      rooms: {
        "$all": {
          id: room_id_p,
          number: room_number
        }
      },
      hotel_brand_id: hotel_id
    }).exec();
  }else if(room_id_p === "all"){
    bookings = await cheap_hotel_booking.find({
      property_id: property_id_p,
      hotel_brand_id: hotel_id
    }).exec();
  }


  bookings = bookings.filter(booking => {
    return (
      dates_list.includes(booking.checkin_date) ||
      dates_list.includes(booking.checkout_date) 
      )
  });

  res.send(bookings);

})

app.get("/is_room_booked_on_a_date/:room_id/:room_number/:the_date", async (req, res, next)=>{

  let bookings = await cheap_hotel_booking.find({
    all_dates_of_occupancy: the_date,
    rooms: {
      "$all": {
        id: req.params.room_id,
        number: req.params.room_number
      }
    }
  }).exec();

  if(bookings.length > 0){
    res.send({booked: true});
  }else{
    res.send({booked: false});
  }

});

app.get("/get_bookings_by_room_id/:room_id/:room_number", async (req, res, next) => {

  let room = await cheap_hotel_room.findById(req.params.room_id);

    let todays_db_date = convert_date_object_to_db_string_format(new Date());

    let bookings = await cheap_hotel_booking.find({
      all_dates_of_occupancy: todays_db_date,
      rooms: {
        "$all": {
          id: req.params.room_id,
          number: req.params.room_number
        }
      }
    }).exec();

    let is_room_occupied = false;

    if(bookings.length > 0){
      is_room_occupied = true;
    }

    /*for(let i=0; i< bookings.length; i++){

      for(let j=0; j < bookings[i].all_dates_of_occupancy.length; j++){

        let the_year = bookings[i].all_dates_of_occupancy[j].split("-")[0];
        let the_month = bookings[i].all_dates_of_occupancy[j].split("-")[1];
        let the_day = bookings[i].all_dates_of_occupancy[j].split("-")[2];

        let the_date = new Date(`${the_year}/${the_month}/${the_day}`);
        let today = new Date();

        console.log(room.room_number,`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`, "-", `${the_date.getDate()}/${the_date.getMonth()}/${the_date.getFullYear()}`)
        
        if(`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}` === `${the_date.getDate()}/${the_date.getMonth()}/${the_date.getFullYear()}`){
          is_room_occupied = true;
        }

      }

    }*/

    if(!is_room_occupied && room.booked){
      room.booked = false;
    }else if(is_room_occupied && !room.booked){
      room.booked = true;
    }

    let updated_room = new cheap_hotel_room(room);
    let room_save_res = await updated_room.save();

    res.send(bookings);
});

app.get("/get_and_return_guest_by_id/:hotel_brand_id/:property_id/:guest_id", async (req, res, next) => {
  
  let the_guest = await cheap_hotel_guest.findOne({
    _id: req.params.guest_id,
    hotel_brand_id: req.params.hotel_brand_id,
    property_id: req.params.property_id,
  }).exec();

  res.send(the_guest);

})

app.get("/get_property_by_id/:property_id", async (req, res, next) => {
  let building = await cheap_hotel_property.findById(req.params.property_id).exec();

  res.send(building);

});

app.post("/search_room_get_selected_room/:hotel_brand_id", async (req, res, next) => {

  let hotel = await cheap_hotel.findById(req.params.hotel_brand_id);

  hotel.policies_and_restrictions.put({
    type: req.body.type,
    description: req.body.description
  });

  let updated_hotel = new cheap_hotel(hotel);
  let update_res = updated_hotel.save();
  
  res.send(update_res.policies_and_restrictions);

});

app.post("/add_new_inventory_item/", async (req, res, next) => {
  
  let inventory = await cheap_hotel_inventory_model.findOne({hotel_brand_id: req.body.hotel_brand_id});
  let new_inventory;

  let new_item = {
    code: req.body.item.code,
    name: req.body.item.name,
    unit_price: req.body.item.unit_price,
    service_department: req.body.item.service_department,
    property_id: req.body.item.property_id,
    stock_quantity: req.body.item.stock_quantity,
    description: req.body.item.description,
  }

  console.log(new_item);

  if(inventory){
    inventory.items.push(new_item);
    let the_inventory = await new cheap_hotel_inventory_model(inventory);
     new_inventory = await the_inventory.save();
  }else{
    let items_arr = [];
    items_arr.push(new_item);
    let the_inventory = await new cheap_hotel_inventory_model({
      hotel_brand_id: req.body.hotel_brand_id,
      items: items_arr
    });
    new_inventory = await the_inventory.save();
  }

  res.send(new_inventory);
});

app.get("/get_all_hotel_inventory/:hotel_brand_id/:property_id", async (req, res, next) => {
  let inventory = await cheap_hotel_inventory_model.findOne({hotel_brand_id: req.params.hotel_brand_id});
  //if there's null values in iventory items fix it here
  if(inventory){
    inventory.items = inventory.items.filter(each=>each);
    let updated_inventory = await new cheap_hotel_inventory_model(inventory);
    await updated_inventory.save();
  }
  if(inventory){
    if(req.params.property_id !== "all"){
      inventory.items = inventory.items.filter( each => {
        return (each.property_id === req.params.property_id || each.property_id === "all");
      });
    }
    res.send(inventory);
  }else{
    res.send({nonAdded: true});
  }
});

app.get("/get_inventory_item_by_name_and_code/:code/:name/:property_id/:brand_id", async(req, res, next)=>{
  let inventory = await cheap_hotel_inventory_model.findOne({hotel_brand_id: req.params.brand_id});
  let items = inventory.items.filter(each=>{
    return (each.code === req.params.code && each.name === req.params.name && each.property_id === req.params.property_id)
  });
  res.send(items[0]);
});

app.post("/edit_inventory_item_by_name_and_code/:code/:name", async(req, res, next)=>{
  let inventory = await cheap_hotel_inventory_model.findOne({hotel_brand_id: req.body.hotel_brand_id});
  let new_inventory;

  console.log(req.params.code, req.params.name);

  let new_item = {
    code: req.body.item.code,
    name: req.body.item.name,
    unit_price: req.body.item.unit_price,
    service_department: req.body.item.service_department,
    property_id: req.body.item.property_id,
    stock_quantity: req.body.item.stock_quantity,
    description: req.body.item.description,
  }

  if(inventory){
    inventory.items = inventory.items.filter(each=>{
      return (each.code !== req.params.code && each.name !== req.params.name);
    });
    inventory.items.push(new_item);
    let the_inventory = await new cheap_hotel_inventory_model(inventory);
     new_inventory = await the_inventory.save();
  }else{
    let items_arr = [];
    items_arr.push(new_item);
    let the_inventory = await new cheap_hotel_inventory_model({
      hotel_brand_id: req.body.hotel_brand_id,
      items: items_arr
    });
    new_inventory = await the_inventory.save();
  }

  res.send(new_inventory);
});

app.post("/search_inventory_item/", async (req, res, next) => {

  let inventory = await cheap_hotel_inventory_model.findOne({hotel_brand_id: req.body.hotel_brand_id});

  let property_inventory = inventory.items;
  if(req.body.property_id !== "all"){
    property_inventory = inventory.items.filter( each => {
      return (each.property_id === req.body.property_id || each.property_id === "all")
    });
  }

  let items = property_inventory.filter( each => {
      return ((each.name.toLowerCase() === req.body.search_param.toLowerCase()) || (each.code.toLowerCase() === req.body.search_param.toLowerCase()))
  });

  res.send(items);

});

app.post("/search_inventory_item_default/", async (req, res, next) => {
  
  let inventory = await cheap_hotel_inventory_model.findOne({hotel_brand_id: req.body.hotel_brand_id});

  let property_inventory = inventory.items;
  if(req.body.property_id !== "all" && req.body.property_id){
    property_inventory = inventory.items.filter( each => {
      return (each.property_id === req.body.property_id || each.property_id === "all")
    });
  }

  let items = property_inventory;
  if(req.body.search_param){
    items = property_inventory.filter( each => {
        return ((each.name.toLowerCase() === req.body.search_param.toLowerCase()) || (each.code.toLowerCase() === req.body.search_param.toLowerCase()))
    });
  }

  res.send(items);

});

app.get("/delete_inventory_item/:code/:name/:property_id/:brand_id", async(req, res, next)=>{
  /*console.log('brand_id',req.params.brand_id);
  console.log('code',req.params.code);
  console.log('name',req.params.name);
  console.log('property_id',req.params.property_id);*/
  try{
    let inventory = await cheap_hotel_inventory_model.findOne({hotel_brand_id: req.params.brand_id});
    /*inventory.items.forEach(each=>{
      console.log('i code',each.code);
      console.log('i name',each.name);
      console.log('i property_id',each.property_id);
    });*/
    inventory.items = inventory.items.filter(each=>{
      return (each.code === req.params.code && each.name === req.params.name && each.property_id === req.params.property_id) ? false : true;
    });
    //cleaning up
    inventory.items = inventory.items.filter(each=>each);
    let updated_inventory = await new cheap_hotel_inventory_model(inventory);
    updated_inventory = await updated_inventory.save();
    res.send(updated_inventory);
  }catch(e){
    console.log(e.message);
    res.send({items:[]});
  }
 
  
});

app.post("/search_cheap_hotel_inhouse_guests/", async(req, res, next)=>{
  
  let res_objects = [];
  
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let req_email = req.body.email;
  let req_mobile = req.body.mobile;

  let bookings = null;
  let the_guests = null;
  let the_invoices = null;

  if(first_name !== "" && last_name !== "" && req_email !== "" && req_mobile !== ""){

    the_guests = await cheap_hotel_guest.find({
      hotel_brand_id: req.body.hotel_brand_id,
      property_id: req.body.property_id,
      email: req_email,
      mobile: req_mobile,
      status: "staying"
    }).exec();

    for(let g=0; g < the_guests.length; g++){
      res_objects.push({
        guest: the_guests[g],
        booking: "",
        invoice: ""
      })
    };
    
    if(res_objects.length > 0){
      for(let i=0; i<res_objects.length; i++){
        
        bookings = await cheap_hotel_booking.find({
          hotel_brand_id: req.body.hotel_brand_id,
          property_id: req.body.property_id,
          "guests.id": res_objects[i].guest._id.toString(),
          /*"guests.first_name": first_name,
          "guests.last_name": last_name,
          guest_contact: {
            mobile: req_mobile,
            email: req_email
          },
          guests: {
            "$all": {
              first_name: first_name,
              last_name: last_name,
              email: email,
              mobile: mobile,
            }
          }*/
        }).exec();
        
        for(let b=0; b < bookings.length; b++){
          res_objects[i].booking = bookings[b];
          /*if(bookings[b].all_dates_of_occupancy.includes(req.body.date)){
            res_objects[i].booking = bookings[b];
          }else{
            let this_guest = await cheap_hotel_guest.findById(res_objects[i].guest._id);
            this_guest.status = "not_staying";
            let updt_guest = await new cheap_hotel_guest(this_guest);
            let saved_updt_guest = await updt_guest.save();
            //res_objects.splice(i,i);
          }*/
        }

      }
    }

    if(res_objects.length > 0){
      for(let i=0; i<res_objects.length; i++){
        
        if(res_objects[i].booking !== ""){
          the_invoices = await cheap_hotel_invoice.find({
            hotel_brand_id: req.body.hotel_brand_id,
            property_id: req.body.property_id,
            "invoice_items.booking_id": res_objects[i].booking._id.toString(),
            "invoice_items.guest_id": res_objects[i].guest._id.toString()
          }).exec();
          res_objects[i].invoice = the_invoices[0];
        }

      }
    }

  }

  res_objects = res_objects.filter( each => each.booking !== "");

  res.send(res_objects);

});

app.get("/get_cheap_hotel_bookings_by_guest/:guest_id/:property_id/:brand_id/", async(req, res, next)=>{

  bookings = await cheap_hotel_booking.find({
    hotel_brand_id: req.params.brand_id,
    property_id: req.params.property_id,
    "guests.id": req.params.guest_id
  }).exec();

  res.send(bookings);

});

app.post("/search_cheap_hotel_arrival_guests/", async(req, res, next)=>{
  
  let res_objects = [];
  
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let req_email = req.body.email;
  let req_mobile = req.body.mobile;
  
  let bookings = null;
  let the_guests = null;
  let the_invoices = null;

  if(first_name !== "" && last_name !== "" && req_email !== "" && req_mobile !== ""){

    the_guests = await cheap_hotel_guest.find({
      hotel_brand_id: req.body.hotel_brand_id,
      property_id: req.body.property_id,
      email: req_email,
      mobile: req_mobile,
      status: "booked"
    }).exec();

    for(let g=0; g < the_guests.length; g++){
      res_objects.push({
        guest: the_guests[g],
        booking: "",
        invoice: ""
      })
    };
    
    if(res_objects.length > 0){
      for(let i=0; i<res_objects.length; i++){
        
        bookings = await cheap_hotel_booking.find({
          hotel_brand_id: req.body.hotel_brand_id,
          property_id: req.body.property_id,
          "guests.id": res_objects[i].guest._id.toString(),
          /*"guests.first_name": first_name,
          "guests.last_name": last_name,
          guest_contact: {
            mobile: req_mobile,
            email: req_email
          },
          guests: {
            "$all": {
              first_name: first_name,
              last_name: last_name,
              email: email,
              mobile: mobile,
            }
          }*/
        }).exec();
        
        //the for loop below enforces checkin date being the same as today.
        
        for(let b=0; b < bookings.length; b++){

          res_objects[i].booking = bookings[b];
          /*if(bookings[b].checkin_date === req.body.date){
            res_objects[i].booking = bookings[b];
          }else{
            let this_guest = await cheap_hotel_guest.findById(res_objects[i].guest._id);
            this_guest.status = "not_staying";
            let updt_guest = await new cheap_hotel_guest(this_guest);
            let saved_updt_guest = await updt_guest.save();
            //res_objects.splice(i,i);
          }*/

        }

      }
    }

    if(res_objects.length > 0){
      for(let i=0; i<res_objects.length; i++){
        
        if(res_objects[i].booking !== ""){
          the_invoices = await cheap_hotel_invoice.find({
            hotel_brand_id: req.body.hotel_brand_id,
            property_id: req.body.property_id,
            "invoice_items.booking_id": res_objects[i].booking._id.toString(),
            "invoice_items.guest_id": res_objects[i].guest._id.toString()
          }).exec();
          res_objects[i].invoice = the_invoices[0];
        }

      }
    }

  }

  res_objects = res_objects.filter( each => each.booking !== "");

  res.send(res_objects);

});

app.post("/search_booking_by_booking_info/", async(req, res, next)=>{

  console.log(req.body);

  let booking = await cheap_hotel_booking.findOne({
    hotel_brand_id: req.body.hotel_brand_id,
    property_id: req.body.room.property_id,
    "rooms.id": req.body.room.room_id,
    checkin_date: req.body.dates.checkin_date,
    checkout_date: req.body.dates.checkout_date,
    "guests.first_name": req.body.guest.first_name,
    "guests.last_name": req.body.guest.last_name,
    "guests.DOB": req.body.guest.DOB,
    "guests.gender": req.body.guest.gender
  });

  console.log(booking);
  if(booking){
    res.send(booking);
  }else{
    res.send({empty: true})
  }

});

app.get("/get_booking_by_id/:id/", async(req, res, next)=>{
  let booking = await cheap_hotel_booking.findById(req.params.id).exec();
  res.send(booking);
});

app.get("/cheap_hotel_checkin_guest/:guest_id/:booking_id", async(req, res, next)=>{
    console.log(req.params.booking_id);
    console.log(req.params.guest_id);
    setTimeout(()=>{res.send({checkedIn: true})},2000);
    ;
});

app.post("/add_new_cheap_hotel_guest/", async (req, res, next)=> {

  let new_guest = await new cheap_hotel_guest({
    hotel_brand_id: req.body.hotel_brand_id,
    property_id: req.body.property_id,
    profile_pic: req.body.profile_pic,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    guest_type: req.body.guest_type,
    age: req.body.age,
    DOB: req.body.DOB,
    gender: req.body.gender,
    email: req.body.email,
    mobile: req.body.mobile,
    price_paid: req.body.price_paid,
    status: req.body.status,
    assigned_room: req.body.assigned_room,
    home_address: req.body.home_address
  });

  let saved_guest = await new_guest.save();

  res.send(saved_guest);

});

app.post("/edit_existing_cheap_hotel_guest/:guest_id", async (req, res, next)=> {
  let the_guest = await cheap_hotel_guest.findById(req.params.guest_id);

  the_guest.hotel_brand_id = req.body.hotel_brand_id;
  the_guest.property_id = req.body.property_id;
  the_guest.profile_pic = req.body.profile_pic;
  the_guest.first_name = req.body.first_name;
  the_guest.last_name = req.body.last_name;
  the_guest.guest_type = req.body.guest_type;
  the_guest.age = req.body.age;
  the_guest.DOB = req.body.DOB;
  the_guest.gender = req.body.gender;
  the_guest.email = req.body.email;
  the_guest.mobile = req.body.mobile;
  /*the_guest.price_paid = req.body.price_paid;
  the_guest.status = req.body.status;
  the_guest.assigned_room = req.body.assigned_room;*/
  the_guest.home_address = req.body.home_address;

  let new_updated_guest = await new cheap_hotel_guest(the_guest);
  let saved_updated_guest = await new_updated_guest.save();

  res.send(saved_updated_guest);

});

app.post("/search_cheap_hotel_guest/", async (req, res, next)=> {

  let f_name = req.body.first_name;
  let l_name = req.body.last_name;
  let mobile_p = req.body.mobile;
  let DOB_p = req.body.DOB;
  let property_id_p = req.body.property_id;
  let hotel_brand_id_p = req.body.hotel_id;

  let guest = await cheap_hotel_guest.find({
    first_name: f_name,
    last_name: l_name,
    DOB: DOB_p,
    mobile: mobile_p,
    hotel_brand_id: hotel_brand_id_p,
    property_id: property_id_p,
  });

  res.send(guest);

});

app.post("/add_new_cheap_hotel_guest_invoice/", async (req, res, next)=> {
  
  let invoice = await new cheap_hotel_invoice({
    hotel_brand_id: req.body.hotel_brand_id,
    property_id: req.body.property_id,
    date_created: req.body.date_created,
    date_checkedout: req.body.date_checkedout,
    bookings: req.body.bookings, //this will make it easy to find invoice document
    invoice_items: req.body.invoice_items
  });

  let new_invoice = await invoice.save();
  res.send(new_invoice);

});
//update routes
app.post('/update_cheap_hotel_guest_invoice/', async(req, res, next)=>{

  try{
    let p_hotel_brand_id=req.body.hotel_brand_id;
    let p_property_id=req.body.property_id;
    let p_date_created=req.body.date_created;
    let p_date_checkedout=req.body.date_checkedout;
    let p_bookings=req.body.bookings;
    let p_invoice_items=req.body.invoice_items;

    invoice = await cheap_hotel_invoice.findById(req.body._id);
    invoice.hotel_brand_id=p_hotel_brand_id;
    invoice.property_id=p_property_id,
    invoice.date_created=p_date_created,
    invoice.date_checkedout=p_date_checkedout,
    invoice.bookings=p_bookings;
    invoice.invoice_items=p_invoice_items;
    let new_invoice = new cheap_hotel_invoice(invoice);
    let saved_invoice = await new_invoice.save();
    res.send(saved_invoice);
  }catch(e){
    console.log(e.message);
    res.send({message: 'error on server!'});
  }
  
});

app.post("/update_hotel_room/:room_id", async (req, res, next) => {

  console.log(req.params.room_id);

  try{

    let the_room = await cheap_hotel_room.findById(req.params.room_id);

    the_room.property_id = req.body.property_id;
    the_room.hotel_brand_id = req.body.hotel_brand_id;
    the_room.room_number = req.body.room_number;
    the_room.closed = req.body.closed;
    the_room.booked = req.body.booked;
    the_room.room_type = req.body.room_type;
    the_room.bed_type = req.body.bed_type;
    the_room.guest_capacitance.adults = req.body.guest_capacitance.adults;
    the_room.guest_capacitance.children = req.body.guest_capacitance.children;
    the_room.price = req.body.price;
    the_room.description = req.body.description;
    the_room.amenities = req.body.amenities;
    the_room.next_available_date = req.body.next_available_date;
    the_room.next_available_time =  req.body.next_available_time;
    the_room.cancellation_policy.time_period = req.body.cancellation_policy.time_period;
    the_room.cancellation_policy.percentage =  req.body.cancellation_policy.percentage;
    the_room.photo_url = req.body.photo_url;
    the_room.cancellation_requests = req.body.cancellation_requests;
    the_room.cancellation_history = req.body.cancellation_history;

    

    let room_obj = new cheap_hotel_room(the_room);
    
    let saved_room = await room_obj.save();

    res.send({success: true, data: saved_room, msg: "room has been updated successfully!"});

  }catch(e){
    res.send({success: false, data: e, msg: "Server Error!"});
  }
});

app.post("/open_or_close_room/:room_id/:close_or_open", async (req, res, next) => {

  let room = await cheap_hotel_room.findById(req.params.room_id);
  if(req.params.close_or_open === "open"){
    room.closed = false;
  }else{
    room.closed = true;
  }

  let updated_room = new cheap_hotel_room(room);
  let updated_room_res = await updated_room.save();

  res.send(updated_room_res);

});

app.post("/update_cheap_hotel_email/:hotel_brand_id", async (req, res, next) => {

  let new_email = req.query.new_email;
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.email = new_email;

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.email);

});

app.post("/update_cheap_hotel_mobile/:hotel_brand_id", async (req, res, next) => {

  let new_mobile = req.query.new_mobile;
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.mobile = new_mobile;

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.mobile);

});

app.post("/update_cheap_hotel_fax/:hotel_brand_id", async (req, res, next) => {

  let new_fax = req.query.new_fax;
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.fax = new_fax;

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.fax);

});

app.post("/update_cheap_hotel_avg_price/:hotel_brand_id", async (req, res, next) => {

  let new_avg_price = req.query.new_avg_price;
  new_avg_price = new_avg_price.replace("$", "");
  
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.price = new_avg_price;

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(new_avg_price);

});

app.post("/update_cheap_hotel_web_url/:hotel_brand_id", async (req, res, next) => {

  let new_url = req.query.new_url;
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.url = new_url;

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.url);

});

app.post("/update_cheap_hotel_main_office_location/:hotel_brand_id", async (req, res, next) => {
  console.log("called");
  let new_location = req.query.new_office_location;
  let brand_id = req.params.hotel_brand_id;
  console.log(new_location)
  let hotel = await cheap_hotel.findById(brand_id);

  hotel.location = new_location;

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.location);

});

app.post("/update_cheap_hotel_description/:hotel_brand_id", async (req, res, next) => {

  let new_description = req.query.new_description;
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.description = new_description;

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.description);

});

app.post("/update_cheap_hotel_name/:hotel_brand_id", async (req, res, next) => {

  let new_name = req.query.new_name;
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.name = new_name;

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.name);

});

app.post("/update_amenity/:hotel_brand_id", async (req, res, next) => {

  let new_amenity = req.query.new_amenity;
  let old_amenity = req.query.old_amenity;
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.amenities = hotel.amenities.map( each => {
    if(each === old_amenity){
      return new_amenity;
    }else
      return each;
  });

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(new_amenity);

});

app.post("/remove_photo_url_from_photos/:hotel_brand_id", async (req, res, next) => {

  let hotel = await cheap_hotel.findById(req.params.hotel_brand_id);
  hotel.photos = hotel.photos.filter(each => {
    return each !== req.body.removed_photo
  });

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.photos);

});

app.get("/get_all_cheap_hotel_photos/:hotel_brand_id", async (req, res, next) => {

  let hotel = await cheap_hotel.findById(req.params.hotel_brand_id);
  res.send(hotel.photos);

});

//add new stuff routes
app.post("/save_newly_uploaded_photo_url/:hotel_brand_id", async (req, res, next) => {

    let hotel = await cheap_hotel.findById(req.params.hotel_brand_id);
    hotel.photos.push(req.body.new_url);

    let new_hotel = new cheap_hotel(hotel);
    let update_hotel = await new_hotel.save();

    res.send(update_hotel.photos);

});

app.post("/add_new_amenity/:hotel_brand_id", async (req, res, next) => {

  let amenity = req.query.amenity;
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);
  //removing current amenity if it exists
  hotel.amenities = hotel.amenities.filter(each=>(each.trim().toLowerCase()===req.query.amenity.trim().toLowerCase() ? false : true));
  hotel.amenities.push(amenity);

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.amenities);

});

app.post("/add_new_amenities_as_list/:hotel_brand_id", async (req, res, next) => {

  let amenities = req.body.items;
  amenities=amenities.map(each=>each.trim());

  let brand_id = req.params.hotel_brand_id;
  let hotel = await cheap_hotel.findById(brand_id);
  
  //Removing duplicates
  amenities.forEach(emenity=>{
    hotel.amenities.splice(hotel.amenities.indexOf(emenity.trim()), 1);
  });
  //hotel.amenities = hotel.amenities.filter(each=>(each.trim().toLowerCase()===req.query.amenity.trim().toLowerCase() ? false : true));
  hotel.amenities=[].concat(hotel.amenities,amenities);

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.amenities);

});

//add new city
app.post("/add_new_city/:hotel_brand_id", async (req, res, next) => {

  let the_city = req.query.new_city.split(",")[0];
  let the_country = req.query.new_city.split(",")[1];

  let city_obj = {
    city: the_city.trim(),
    country: the_country.trim()
  }
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);
  //removing new entry if it already exists to avoid duplicates
  hotel.cities_operating = hotel.cities_operating.filter(each=>
    (each.city.trim().toLowerCase()===city_obj.city.trim().toLowerCase() 
    && each.country.trim().toLowerCase()===city_obj.country.trim().toLowerCase() ? false : true));
  hotel.cities_operating.push(city_obj);

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.cities_operating);

});

//get all cheap hotel cities
app.get("/get_all_cities/:hotel_brand_id", async (req, res, next) => {

  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);
  
  res.send(hotel.cities_operating);

});

//get all cheap hotel amenities
app.get("/get_all_amenities/:hotel_brand_id", async (req, res, next) => {

  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);
  
  res.send(hotel.amenities);

});

//get all cheap hotel policies
app.get("/get_all_policies/:hotel_brand_id", async (req, res, next) => {

  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);
  
  res.send(hotel.policies_and_restrictions);

});

app.delete("/remove_city_op/:hotel_brand_id", async(req, res, next) => {

  let the_city = req.query.q_city.split(",")[0];
  let the_country = req.query.q_city.split(",")[1];

  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.cities_operating = hotel.cities_operating.filter( each => {
    return (each.city !== the_city &&
            each.country !== the_country);
  });

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.cities_operating);

});

app.delete("/remove_amenity/:hotel_brand_id", async(req, res, next) => {

  let amenity = req.query.q_amenity;
  let brand_id = req.params.hotel_brand_id;

  let hotel = await cheap_hotel.findById(brand_id);

  hotel.amenities = hotel.amenities.filter( each => {
    return each !== amenity;
  });

  let new_hotel = new cheap_hotel(hotel);
  let update_hotel = await new_hotel.save();

  res.send(update_hotel.cities_operating);

});

//Spinning the server here
app.listen(PORT, () => {
  console.log("Server started on " + PORT);
});
