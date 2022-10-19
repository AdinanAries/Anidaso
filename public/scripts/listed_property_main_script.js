const taxRate = 0.15; //percentage
var the_full_screen_loader = document.getElementById("full_screen_loader");
var main_all_hotel_amenity_options = [
    "Business Center",
    "Coffee Shop",
    "Disabled Facilities",
    "Wheelchair Accessible Elevators",
    "Handrails Bathroom",
    "Adapt Room Doors",
    "Wheelchair Accessible Room",
    "Wheelchair Accessible Public Area",
    "Baby-Sitting",
    "Internet Hotspots",
    "Free Internet",
    "Laundry Service",
    "Air Conditioning",
    "Hair Dryer",
    "Non Smoking Rooms",
    "Direct Dial Phone",
    "Television",
    "Wi-fi in Room",
    "First Aid Staf",
    "Interior Room Entry",
    "Emergency Lighting",
    "Fire Detectors",
    "Extinguishers",
    "Fire Safety",
    "Restricted Public Access",
    "Safe Deposit Box",
    "Smoke Detector",
    "Sprinklers",
    "Video Surveilance",
    "Fitness Center",
]
var all_hotel_amenity_options = main_all_hotel_amenity_options;
var new_hotel_amenities_list_to_save = {
    items: []
};

var main_all_hotel_services = [
    "Car Rental Services",
    "Catering Services",
    "Concierge Services",
    "Courier Services",
    "Doctor on Call",
    "Dry Cleaning",
    "Excursions & Guided Tours",
    "Flower Arrangement",
    "Ironing Service",
    "Laundry and Valet Service",
    "Mail Services",
    "Massages",
    "Room Service",
    "Shoeshine Service",
    "Ticket Service",
    "Chauffeur - Limousine Services",
    "Turndown Service",
    "Valet Parking",
]
var all_hotel_services = main_all_hotel_services;
var new_hotel_services_list_to_save = {
    items: []
};

var main_all_hotel_facilities = [
    "Banquet Facilities",
    "Bar",
    "Computer Facility",
    "Conference & Meeting Facilities",
    "Disabled Room",
    "Fitness Room",
    "Health Club",
    "Sauna and Steam Bath",
    "Lounge",
    "Luggage Storage",
    "Non-smoking Rooms",
    "Parking Outside Hotel",
    "Pet Friendly",
    "Restaurant",
    "Smoking Rooms",
    "Summer Terrace",
    "Throughout Hotel Wifi",
]
var all_hotel_facilities = main_all_hotel_facilities;
var new_hotel_facilities_list_to_save = {
    items: []
};

var main_cheap_hotel_payouts_object = {
    hotel_brand_id: window.localStorage.getItem("ANDSBZID"),
    card: {
        number: "***2552",
        exp: "09/25",
        cvv: 902,
        holder: "Mohammed Adinan"
    },
    current: {
        period: "2022-10-14 - 2022-11-14",
        date_due: "2022-11-14",
        date_paid_out: "",
        status: "pending",
        items_sold: [
            {
                name: "Room 5D",
                item_id: "",
                invoice_id: "",
                total: 83.2
            }
        ],
        invoices: [
            "invoice id",
            "invoice id",
        ],
        cards: [
            {
                number: "***2552",
                exp: "09/25",
                cvv: 902,
                holder: "Mohammed Adinan"
            }
        ],
        cycle: "monthly"
    },
    cycle: "monthly",
    past: [
        {
            period: "2022-09-14 - 2022-10-14",
            date_due: "2022-10-14",
            date_paid_out: "2022-10-14",
            status: "pending",
            items_sold: [
                {
                    name: "Room 10C",
                    item_id: "",
                    invoice_id: "",
                    total: 45.2
                },
                {
                    name: "Room 5D",
                    item_id: "",
                    invoice_id: "",
                    total: 83.2
                }
            ],
            invoices: [
                "invoice id",
                "invoice id",
            ],
            cards: [
                {
                    number: "***2552",
                    exp: "09/25",
                    cvv: 902,
                    holder: "Mohammed Adinan"
                }
            ],
            cycle: "monthly"
        }
    ]
}
var cheap_hotel_payouts_object = main_cheap_hotel_payouts_object;

var all_room_types = [
    "Single Room",
    "Double Room",
    "Triple Room",
    "Quad Room",
    "Queen Room",
    "King Room",
    "Twin Room",
    "Hollywood Twin Room",
    "Double-Double Room",
    "Studio Room",
    "Suites",
    "Junior Suites",
    "The Presidential Suite",
    "Apartments",
    "Connecting Rooms",
    "The Murphy Room",
    "A Cabana Room",
    "Villas"
]

var all_bed_types = [
    "Single (36 x 75)",
    "Twin (39 x 75)",
    "Twin XL (39 x 80)",
    "Double/Full (54 x 74)",
    "Queen (60 x 84)",
    "King (76 x 80)",
    "California King (72 x 84)"
]

var add_services_post_data = {
    hotel_brand_id: "",
    services: [
        {
            name: "",
            description: "",
            price_per_order: 0
        }
    ]
}

var add_facilities_post_data = {
    hotel_brand_id: "",
    facilities: [
        {
            name: "",
            description: "",
            cost_of_usage: 0
        }
    ]
}

var all_running_invoices = [];
var running_invoice = {
    hotel_brand_id: "",
    property_id: "",
    date_created: "",
    date_checkedout: "",
    bookings: [], //this will make it easy to find invoice document
    invoice_items: [
        {
            guest_id: "",
            booking_id: "", //this will make it easy to associate guest with booking
            guest_items: [
                {
                    name: "",
                    price: 0,
                    quantity: 0,
                    total: this.price * this.quantity
                }
            ]

        }
    ]
}

var current_edit_booking_object = {
    rooms_and_guests: {
        booking_id: "",
        booking_total_adults: 0,
        booking_total_children: 0,
        room_guests: [
            /*{
                id: "",
                number: "",
                total_adults: 0,
                total_children: 0,
                guests: [
                    "adult",
                    "child",
                ]
            }*/
        ]
    },
    booking: {}
};

var rooms_grid_view_config = {
    calendar: {
        first: "",
        last: ""
    },
    picked_dates: {
        checkin: "",
        checkout: ""
    },
    rooms_id: "",
    property_id: ""
}

var make_reservations_post_data = {
    hotel_brand_id: "",
    property_id: "",
    booking_status: "before-stay", //staying, before-stay, after-stay, no-show, cancelled
    booking_date: "",
    rooms: [
        {
            id: "",
            number: ""
        }
    ],
    //full_property_location: "New York, 1223 Mont Gomery, United States",
    all_dates_of_occupancy: [],
    price_paid: 0,
    checkin_date: "",
    checkout_date: "",
    checkin_time: "12:00",
    checkout_time: "12:00",
    guests: [],
    guest_contact: {
        mobile: "",
        email: ""
    },
    current_room: {
        number: '',
        id: '',
        capacitance: {
            adults: 0,
            children: 0,
        }
    }
}
var search_inventory_item_post_data = {
    hotel_brand_id: "",
    property_id: "all",
    search_param: "",
}
var new_inventory_item_post_data = {
    hotel_brand_id: "",
    item: {
        code: "",
        name: "",
        unit_price: 0,
        service_department: "",
        property_id: "",
        stock_quantity: 0,
        description: "",
    }
}
var update_inventory_old_obj = {
    code: "",
    name: ""
}

let add_invoice_item_post_obj = {
    bookings: [],
    invoice_items: {
        guest_id: "",
        booking_id: "",
        guest_items: []
    },
    hotel_brand_id: localStorage.getItem("ANDSBZID"),
    property_id: "",
};

let wellgo_invoices_for_cheap_hotels = {
    hotel_brand_id: window.localStorage.getItem("ANDSBZID"),
    date_created: "10/13/2022",
    invoice_items: [
        {
            name: "subscription invoice",
            status: 'paid',
            amount: 500,
            tax: 0,
            penalty: 0,
            deductions: 0,
            discounts: 0,
            total: 500,
            card: {
                number: "***2345",
                holder: "Mohammed Adinan",
                ccv: "123",
                exp: "09/25"
            },
            date_due: "09/10/2022",
            date_paid: "09/10/2022",
            period: "09/10/2022 - 10/10/2022"
        },
        {
            name: "subscription invoice",
            status: 'pending',
            amount: 500,
            tax: 0,
            penalty: 0,
            deductions: 0,
            discounts: 0,
            total: 500,
            card: {
                number: "***2345",
                holder: "Mohammed Adinan",
                ccv: "123",
                exp: "09/25"
            },
            date_due: "09/10/2022",
            date_paid: "09/10/2022",
            period: "09/10/2022 - 10/10/2022"
        },
    ],
    status: "pending",
    due: "11/11/2022",
    card: {
        number: "***2345",
        holder: "Mohammed Adinan",
        ccv: "123",
        exp: "09/25"
    }
}
let current_cheap_hotel_wellgo_invoice = wellgo_invoices_for_cheap_hotels;

var current_highlighted_guests = [];
var current_selected_guest;

let todays_date = new Date();
let todays_date2 = new Date();

var is_there_overlap = false;

let global_is_room_for_update = false;
let global_room_update_id = "";

var logged_in_hotel_ratings_area = document.getElementById("logged_in_hotel_ratings_area");
var logged_in_hotel_description_input = document.getElementById("logged_in_hotel_description_input");

var current_info_update_type = "name"; //[name, email, mobile, web_url, fax, avg_price, description, office_location]
var current_misc_edit_elem_id;
var current_contact_edit_elem_id;
var current_amenity_edit_elem_id;
var current_service_edit_elem_id;
var current_edited_amenity_obj;
var current_op_cities_edit_elem_id;
var global_is_room_closed = false;
var search_result_current_room_id;

function is_today_covered_in_date_range(first_date, last_date) {

    const today = new Date();
    const firstDate = new Date(first_date);
    const lastDate = new Date(last_date);
    lastDate.setDate(lastDate.getDate() + 1)

    let isCovered = false;

    if (today >= firstDate && today <= lastDate)
        isCovered = true;

    return isCovered;
}
function is_today_before_date(the_date_p) {

    const today = new Date();
    const theDate = new Date(the_date_p);
    theDate.setDate(theDate.getDate() + 1)

    let isBefore = false;

    if (today < theDate)
        isBefore = true;

    return isBefore;
}
function change_date_from_iso_to_long_date(isoString) {

    let the_year = isoString.split("-")[0];
    let the_month = isoString.split("-")[1];
    let the_day = isoString.split("-")[2];

    let the_date = new Date(`${the_year}/${the_month}/${the_day}`);
    let n = the_date.toString().split(" ");
    let formatted_date = `${n[1]} ${n[2]}, ${n[3]}`;

    return formatted_date;
}
function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
function calculateAge(birthday) {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
function change_iso_date_to_readable_format(isoString) {

    let the_year = isoString.split("-")[0];
    let the_month = isoString.split("-")[1];
    let the_day = isoString.split("-")[2];

    let the_date = new Date(`${the_year}/${the_month}/${the_day}`);
    let n = the_date.toString().split(" ");
    let formatted_date = `${n[0]} ${n[1]} ${n[2]}`;

    return formatted_date;
}
function calculatePriceTotals(price = 0, discount = 0, tax = taxRate) {
    let obj = {
        base: parseFloat(price),
        taxRate: parseFloat(tax),
        taxAmount: (parseFloat(price) * parseFloat(tax)),
        discountAmount: parseFloat(discount),
        total: 0
    }
    obj.total = ((obj.taxAmount + obj.base) - obj.discountAmount)
    return obj
}
//console.log(calculatePriceTotals(100));
//alert(calculateAge("1995-03-23"));
//alert(is_today_before_date("2022-10-01"));
//console.log(calculate_age(new Date(1992, 03, 23)));
//alert(is_today_covered_in_date_range("2022-09-23", "2022-09-27"));
//console.log(change_date_from_iso_to_long_date("2021-12-15"));

function show_confirmation_dialog_to_confirm_user_action(title, msg, yes_action, no_action = () => { }) {
    $("#confirmation_dialog_to_confirm_user_action").toggle("up");
    document.getElementById("confirmation_dialog_to_confirm_user_action_title").innerHTML = `
        <i style="color: orangered; font-size: 22px; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        ${title}
    `;
    document.getElementById("confirmation_dialog_to_confirm_user_action_msg").innerHTML = `
        <span >
            ${msg}
        </span>
    `;
    document.getElementById("confirmation_dialog_to_confirm_user_action_yes_btn").onclick = yes_action;
    document.getElementById("confirmation_dialog_to_confirm_user_action_no_btn").onclick = () => {
        $('#confirmation_dialog_to_confirm_user_action').toggle('up');
        no_action();
    }
}
function confirmation_required_action_finished_call_back() {
    $("#confirmation_dialog_to_confirm_user_action").toggle("up");
}

function return_new_hotel_guest_obj(hotel_brand_id_param, property_id_param, profile_pic_param, first_name_param, last_name_param,
    guest_type_param, DOB_param, gender_param, email_param, mobile_param, price_paid_param, status_param, booking_id_param,
    room_id_param, room_number_param, street_address_param, city_param, town_param, country_param, zipcode_param) {
    return {
        hotel_brand_id: hotel_brand_id_param,
        property_id: property_id_param,
        profile_pic: profile_pic_param,
        first_name: first_name_param,
        last_name: last_name_param,
        guest_type: guest_type_param,
        age: 0,
        DOB: DOB_param,
        gender: gender_param,
        email: email_param,
        mobile: mobile_param,
        price_paid: price_paid_param,
        status: status_param,
        assigned_room: {
            booking_id: booking_id_param,
            room_id: room_id_param,
            room_number: room_number_param
        },
        home_address: {
            street_address: street_address_param,
            city: city_param,
            town: town_param,
            country: country_param,
            zipcode: zipcode_param
        }
    }
}

async function set_properties_and_rooms_for_select_inputs(properties_select, rooms_select, index) {

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById(properties_select).innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById(properties_select).innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }
    //document.getElementById(properties_select).value=;

    let rooms = await get_and_return_cheap_hotel_rooms_by_property_id(document.getElementById(properties_select).value);

    document.getElementById(rooms_select).innerHTML = '';
    for (let i = 0; i < rooms.length; i++) {
        document.getElementById(rooms_select).innerHTML += `
            <option value='${rooms[i]._id}'>${rooms[i].room_number}</option>
        `;
    }
    document.getElementById(rooms_select).value = current_edit_booking_object.rooms_and_guests.room_guests[index].id;

    document.getElementById(properties_select).onchange = async e => {

        let rooms = await get_and_return_cheap_hotel_rooms_by_property_id(document.getElementById(properties_select).value);

        document.getElementById(rooms_select).innerHTML = '';
        for (let i = 0; i < rooms.length; i++) {
            document.getElementById(rooms_select).innerHTML += `
                <option value='${rooms[i]._id}'>${rooms[i].room_number}</option>
            `;
        }

    }
}

document.getElementById("top_nav_add_new_drop_down_btn").addEventListener("click", e => {
    if (document.getElementById("top_nav_add_new_drop_down_menu").style.display === "none")
        document.getElementById("top_nav_add_new_drop_down_menu").style.display = "block";
    else
        document.getElementById("top_nav_add_new_drop_down_menu").style.display = "none";
});
document.getElementById("top_nav_more_menu_drop_down_btn").addEventListener("click", e => {
    if (document.getElementById("top_nav_more_menu_drop_down_menu").style.display === "none")
        document.getElementById("top_nav_more_menu_drop_down_menu").style.display = "block";
    else
        document.getElementById("top_nav_more_menu_drop_down_menu").style.display = "none";
});
document.getElementById("top_nav_front_desk_drop_down_btn").addEventListener("click", e => {
    if (document.getElementById("top_nav_front_desk_drop_down_menu").style.display === "none")
        document.getElementById("top_nav_front_desk_drop_down_menu").style.display = "block";
    else
        document.getElementById("top_nav_front_desk_drop_down_menu").style.display = "none";
});

function toggle_show_view_booking_div() {
    $("#view_booking_div").toggle("up");
}

async function toggle_show_edit_booking_edit_page() {

    document.getElementById("full_screen_loader").style.display = "flex";

    document.getElementById("edit_booking_search_page").style.display = "none";
    document.getElementById("edit_booking_results_page").style.display = "none";
    if (document.getElementById("edit_booking_edit_page").style.display === "none") {
        $("#edit_booking_edit_page").toggle("up");
    }

    setTimeout(() => {
        load_country_calling_codes_on_select_input("edit_booking_guest_mobile_country_code_select");
        preprocess_bookings_rooms_and_guests();//
    }, 510);

}

function toggle_show_edit_booking_search_page() {
    document.getElementById("edit_booking_results_page").style.display = "none";
    document.getElementById("edit_booking_edit_page").style.display = "none";
    if (document.getElementById("edit_booking_search_page").style.display === "none") {
        $("#edit_booking_search_page").toggle("up");
    }

    set_properties_and_rooms_for_select_inputs("search_booking_property_select", "search_booking_room_number_select");

}

function toggle_show_edit_booking_results_page() {
    document.getElementById("edit_booking_search_page").style.display = "none";
    document.getElementById("edit_booking_edit_page").style.display = "none";
    if (document.getElementById("edit_booking_results_page").style.display === "none") {
        $("#edit_booking_results_page").toggle("up");
    }
}

let search_booking_checkin = convert_date_object_to_db_string_format(new Date());
let search_booking_checkout = convert_date_object_to_db_string_format(new Date());
let search_booking_DOB = "";
$(function () {
    $('#search_booking_checkin_checkout_input').daterangepicker({
        opens: 'left',
        locale: {
            cancelLabel: 'Clear'
        }
    }, function (start, end, label) {

        setTimeout(() => {
            document.getElementById("search_booking_checkin_checkout_input").value = start.toString().substring(0, 11) + "  -  " + end.toString().substring(0, 11);
        }, 100);

        search_booking_checkin = start.format('YYYY-MM-DD');
        search_booking_checkout = end.format('YYYY-MM-DD');

    });
});

$(function () {
    $('#search_booking_DOB_input').daterangepicker({
        singleDatePicker: true,
        autoUpdateInput: false,
        showDropdowns: true,

        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'), 10)
    }, function (start, end, label) {
        setTimeout(() => {
            //document.getElementById("search_booking_DOB_input").value = start.toString().substring(4,15);
            document.getElementById("search_booking_DOB_input").value = start.format('YYYY-MM-DD');
        }, 100);

        search_booking_DOB = start.format('YYYY-MM-DD');
    });
});

async function search_booking_onclick() {

    document.getElementById("view_booking_result_details").innerHTML = `
        <div style="width: 100%; text-align: center; padding: 20px 0;" class="loader loader--style2" title="1">
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <path fill="orangered" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
            <animateTransform attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"/>
            </path>
            </svg>
            <p style="text-align: center; font-size: 14px; color:white;">
            loading...
            </p>
        </div>
    `;

    toggle_show_edit_booking_results_page();

    let first_name = document.getElementById("search_booking_first_name_input").value;
    let last_name = document.getElementById("search_booking_last_name_input").value;
    let DOB = search_booking_DOB;
    let gender = document.getElementById("search_booking_gender_input").value;
    let property_id = document.getElementById("search_booking_property_select").value;
    let room_id = document.getElementById("search_booking_room_number_select").value;

    let search_booking_post_obj = return_search_booking_post_object(window.localStorage.getItem("ANDSBZID"), first_name, last_name, DOB, gender, property_id, room_id, search_booking_checkin, search_booking_checkout);
    let booking = await search_booking_post_function(search_booking_post_obj);
    if (booking.empty) {
        document.getElementById("view_booking_result_details").innerHTML = `
        <div style="padding: 40px 10px; text-align: center; font-size: 14px; color: white; background-color: rgba(0,0,0,0.4); border: 1px solid rgba(255, 255, 255, 0.2);">
            <i aria-hidden="true" class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;"></i>
            booking not found
        </div>
        `;
    } else {
        render_search_booking_results_markup(booking);
        current_edit_booking_object.booking = booking;
    }

}

function return_search_booking_post_object(hotel_id, f_name, l_name, DOB_p, gender_p, prop_id, room_id_p, checkin, checkout) {
    return {
        hotel_brand_id: hotel_id,
        guest: {
            first_name: f_name,
            last_name: l_name,
            DOB: DOB_p,
            gender: gender_p,
        },
        room: {
            property_id: prop_id,
            room_id: room_id_p,
        },
        dates: {
            checkin_date: checkin,
            checkout_date: checkout
        }
    }
}

async function start_search_booking() {

    if (document.getElementById("view_booking_div").style.display === "none") {
        toggle_show_view_booking_div();
    }
    toggle_show_edit_booking_search_page();

}

function search_booking_post_function(post_obj) {
    return $.ajax({
        type: "POST",
        url: "/search_booking_by_booking_info/",
        data: JSON.stringify(post_obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
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

function get_and_return_booking_by_id(id) {
    return $.ajax({
        type: "GET",
        url: "/get_booking_by_id/" + id,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
        }
    });
}

async function render_search_booking_results_markup(booking) {

    let invoice = await get_cheap_hotel_guest_invioce(booking.guests[0].id, booking._id, localStorage.getItem("ANDSBZID"), booking.property_id);
    all_running_invoices = [];
    all_running_invoices.push(invoice);
    let property = await get_and_return_hotel_property_by_id(booking.property_id);
    let first_guest = await get_and_return_hotel_guest_by_id(localStorage.getItem("ANDSBZID"), booking.property_id, booking.guests[0].id);

    let property_city = property.city;
    let property_country = property.country;
    let property_street = property.street_address;

    let rooms = booking.rooms;
    let booking_checkin_date = booking.checkin_date;
    let booking_checkout_date = booking.checkout_date;
    let price_paid = booking.price_paid;
    let room_guests = booking.guests;

    let room_number = rooms[0].number;
    let room_guests_markup = "";

    let other_rooms_included = "";

    if (rooms.length > 1) {
        other_rooms_included = "<p style='margin: 10px 0; font-size: 12px; text-align: center; color: white; letter-spacing: 1px;'> Rooms Included: ";

        for (let r = 0; r < rooms.length; r++) {
            other_rooms_included += "<span style='color: orangered; font-size: 12px;'>" + rooms[r].number + "</span>, ";
        }

        other_rooms_included = other_rooms_included.substring(0, other_rooms_included.length - 2);

        other_rooms_included += "</p>"
    }

    let checkin_or_checkout_btn = `
        <div id="booking_editor_checkin_btn_main" onclick="start_guest_checkin('${first_guest._id}','${booking._id}', '${property._id}', 0, 'booking_editor');" style="border: 1px solid rgb(55, 97, 107); background-color: rgba(41, 66, 88, 0.555); color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 5px; border-radius: 4px; font-size: 13px;">
            <i style="color:rgb(255, 179, 136); margin-right: 5px;" class="fa fa-bed" aria-hidden="true"></i>
            Checkin
        </div>            
    `;
    if (first_guest.status.includes("staying")) {
        checkin_or_checkout_btn = `
            <div onclick="go_to_checkout_from_inhouse_guests('${room_guests[0].id}', '${property._id}', '${booking._id}', 'booking_editor');" style="background-color: brown; color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 5px; border-radius: 4px; font-size: 13px;">
                <i style="color:rgb(255, 179, 136); margin-right: 5px;" class="fa fa-credit-card" aria-hidden="true"></i>
                Checkout
            </div>
        `;
    }

    for (let g = 0; g < room_guests.length; g++) {
        room_guests_markup += `
            <div style="padding-bottom: 10px;">
                <p style="letter-spacing: 1px; color: slateblue; font-size: 13px; margin-bottom: 5px;">
                    <i class="fa fa-check" aria-hidden="true"></i>
                    <span style="letter-spacing: 1px; margin-left: 5px; font-size: 15px; color:rgb(245, 196, 151);">
                        ${room_guests[g].first_name} ${room_guests[g].last_name}</span>
                </p>
                <p style="margin-left: 30px; letter-spacing: 1px; font-size: 13px; margin-top: 5px; color:rgb(245, 196, 151);">
                        <span style="font-size: 12px; color: white;">DOB:</span> ${change_date_from_iso_to_long_date(room_guests[g].DOB)}, 
                    </p>
                    <p style="margin-left: 30px; letter-spacing: 1px; font-size: 13px; margin-top: 5px; color:rgb(245, 196, 151);"> 
                        <span style="font-size: 12px; color: white;">Gender:</span> ${room_guests[g].gender}
                    </p>
            </div>
        `
        break; // this code may be removed if all room guests have to be displayed
    }

    document.getElementById("view_booking_result_details").innerHTML = `
        <div style="padding: 10px 5px; border-radius: 4px; background-color:rgba(41, 66, 88, 0.555);">
            <p style="display: none; margin: 15px; color:rgb(209, 84, 0); font-size: 14px; font-weight: bolder;">Last Booked</p>
            <p style="letter-spacing: 1px; color: white; font-size: 15px; text-align: center; font-weight: bolder;">
                Room ${room_number}:
                <span style="letter-spacing: 1px; margin-left: 10px; font-size: 14px; color:rgb(168, 195, 218);">
                    Booked
                    <i style="color:rgb(137, 235, 174); margin-left: 5px;" aria-hidden="true" class="fa fa-check"></i>
                </span>
            </p>
            ${other_rooms_included}
            <p style="margin-top: 5px; letter-spacing: 1px; text-align: center; color: rgb(205, 218, 168); font-size: 13px; margin-bottom: 5px;">
                ${property_city}
                <span style="color:rgb(127, 144, 175); font-size: 12px; letter-spacing: 1px;">
                    - ${property_street} (${property_country})
                </span>
            </p>
            <div class="flex_row_default_flex_column_mobile" style="margin-top: 20px;">
                <div class="flex_child_of_two">
                    <p style="letter-spacing: 1px; margin-bottom: 10px; font-size: 13px; color:rgb(127, 144, 175); font-weight: bolder;">
                        Details</p>
                    <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                        Checkin:
                        <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                            ${change_date_from_iso_to_long_date(booking_checkin_date)}</span>
                    </p>
                    <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                        Checkout:
                        <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                            ${change_date_from_iso_to_long_date(booking_checkout_date)}</span>
                    </p>
                    <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                        Room Price:
                        <span style="letter-spacing: 1px; margin-left: 10px; font-size: 15px; color:rgb(245, 196, 151);">
                            $${parseFloat(price_paid).toFixed(2)}</span>
                    </p>
                    <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                        Booking total:
                        <span style="letter-spacing: 1px; margin-left: 10px; font-size: 15px; color:rgb(245, 196, 151);">
                            $${parseFloat(price_paid).toFixed(2)}</span>
                    </p>
                </div>
                <div class="flex_child_of_two flex_non_first_child" style="position: relative;">
                    <div id="booking_editor_all_guests_div" style="position: absolute; background-color: #000d1a; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);
                                display: none; box-shadow: 1px 2px 5px rgba(0,0,0,0.4); bottom: 5px; right: 0; padding: 10px; z-index: 1; min-width: 100%; min-height: 100%;">
                        <p onclick="$('#booking_editor_all_guests_div').slideUp('fast');" style="position: absolute; top: 0; right: 0; cursor: pointer; 
                            padding: 10px; color: red;"><i class="fa fa-times" aria-hidden="true"></i><p>
                        <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 5px; text-align: center;">
                         Guests</p>
                        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 5px;">
                            <p style="letter-spacing: 1px; color: slateblue; font-size: 13px; padding: 5px; background-color: rgba(255,255,255,0.2); cursor: pointer; margin-bottom: 1px;">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <span style="letter-spacing: 1px; margin-left: 5px; font-size: 13px; color:rgb(245, 196, 151);">
                                    Mohammed Adinan</span>
                            </p>
                            <p style="letter-spacing: 1px; color: slateblue; font-size: 13px; padding: 5px; background-color: rgba(255,255,255,0.2); cursor: pointer; margin-bottom: 1px;">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <span style="letter-spacing: 1px; margin-left: 5px; font-size: 13px; color:rgb(245, 196, 151);">
                                    Mohammed Adinan</span>
                            </p>
                            <p style="letter-spacing: 1px; color: slateblue; font-size: 13px; padding: 5px; background-color: rgba(255,255,255,0.2); cursor: pointer; margin-bottom: 1px;">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <span style="letter-spacing: 1px; margin-left: 5px; font-size: 13px; color:rgb(245, 196, 151);">
                                    Mohammed Adinan</span>
                            </p>
                        </div>
                    </div>
                    <p style="letter-spacing: 1px; margin-bottom: 10px; font-size: 13px; color:rgb(127, 144, 175); font-weight: bolder;">
                        Room Guest(s)</p>
                        ${room_guests_markup}
                        <div onclick="$('#booking_editor_all_guests_div').slideDown('fast');" style="font-size: 13px; color: rgb(132, 216, 255); padding-bottom: 10px; margin-bottom: 5px; padding-left: 0; cursor: pointer;">
                            see all booked guests
                            <i style="color:rgb(136, 255, 199); margin-left: 5px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </div>
                </div>
            </div>
            <div style="background-color: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); padding: 10px;">
                <p style="letter-spacing: 1px; margin-bottom: 10px; font-size: 13px; color:rgb(127, 144, 175); font-weight: bolder;">
                    Summary & Actions</p>
                <p style="color: rgba(255,255,255,0.5); margin-bottom: 10px; font-size: 14px;">Guest(s) Status: <span style="color: lightgreen; font-size: 14px;">
                    ${first_guest.status}
                </span></p>
                <div style="border-top: 1px solid rgba(255,255,255,0.2); padding: 10px 0;">
                    <p style="color: rgba(255,255,255,0.5); margin-bottom: 10px; font-size: 14px;">
                        <i style="color:lightgreen; margin-right: 5px;" class="fa fa-info-circle" aria-hidden="true"></i>
                        Notice:
                    </span></p>
                    <p style="color: white; font-size: 14px; color: rgba(255,255,255,0.7);">
                    This booking may include extra services and additional rooms and guests. Click on "see invoice" button below to see all items included</p>
                </div>
                <div id="booking_editor_checkin_loader" style="display: none; flex-direction: row !important;">
                    <div id="booking_editor_checkin_loader_spinner">
                        <div style="width: 100%; text-align: center; padding: 10px 0; background-color: rgba(0,0,0,0.5);" class="loader loader--style2" title="1">
                            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                            <path fill="orangered" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                            <animateTransform attributeType="xml"
                                attributeName="transform"
                                type="rotate"
                                from="0 25 25"
                                to="360 25 25"
                                dur="0.6s"
                                repeatCount="indefinite"/>
                            </path>
                            </svg>
                            <p style="text-align: center; font-size: 14px; color:white;">
                            pleas wait...
                            </p>
                        </div>
                    </div>
                    <div id="booking_editor_checkin_confirm_msg" style="display: none; background-color: rgba(0,0,0,0.5); padding: 10px;">
                        <p id="booking_editor_checkin_confirm_msg_p" style="color: white; margin-bottom: 10px; font-size: 14px;">
                            
                        </p>
                        <div onclick="document.getElementById('booking_editor_checkin_loader').style.display='none';document.getElementById('booking_editor_guest_checkin_btn_set').style.display='flex';" 
                            style="background-color:rgb(55, 97, 107); text-align: center; color: white; cursor: pointer; padding: 10px; margin-right: 10px; border-radius: 4px; font-size: 13px;">
                            OK
                        </div>
                    </div>
                </div>
                <div id="booking_editor_guest_checkin_btn_set" style="display: flex;">
                    <div id="booking_editor_already_checked_in_msg" style="display: none; background-color:rgba(0,0,0,0.5); border: 1px solid lightgreen; color: white; width: fit-content; padding: 10px; margin-right: 10px; font-size: 13px;">
                        <i class="fa fa-check" style="margin-right: 10px; color: lightgreen;" aria-hidden="true"></i>
                        Guest Staying!
                    </div>
                    ${checkin_or_checkout_btn}
                    <div style="display: flex; flex-direction: row !important;">
                        <div onclick="view_each_guest_running_bill(0);" style="border: 1px solid rgb(55, 107, 75); color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 5px; border-radius: 4px; font-size: 13px;">
                            <i style="color:rgb(255, 179, 136); margin-right: 5px;" class="fa fa-bars" aria-hidden="true"></i>    
                            Invoice
                        </div>
                        <div onclick="show_include_services_in_booking_div('${room_guests[0].id}', '${property._id}', 0);" style="border: 1px solid rgb(55, 97, 107); color: white; cursor: pointer; width: fit-content; padding: 10px; margin-right: 5px; border-radius: 4px; font-size: 13px;">
                            <i style="color:rgb(255, 179, 136); margin-right: 5px;" class="fa fa-plus" aria-hidden="true"></i>
                            Add Service
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; flex-direction: row !important; justify-content: space-between; margin-top: 10px;">
                <div onclick="start_edit_booking();" style="cursor: pointer; font-size: 14px; padding: 10px; border-radius: 4px; background-color: rgb(8, 42, 58); color: white; border: 1px solid rgba(255,255,255,0.2);">
                    <i style="color: rgb(124, 240, 255); margin-right: 5px;" class="fa fa-pencil" aria-hidden="true"></i>
                    Edit Booking
                </div>
                <div style="cursor: pointer; padding: 10px; color: white; font-size: 14px;">
                    <i aria-hidden="true" class="fa fa-trash" style="margin-right: 5px; color:rgb(255, 53, 53);"></i>
                    Cancel Booking
                </div>
            </div>
            
        </div>
    `;
}

function start_edit_booking() {
    if (document.getElementById("view_booking_div").style.display === "none") {
        toggle_show_view_booking_div();
    }
    toggle_show_edit_booking_edit_page()
}

async function show_view_booking_div(booking_id, source = 'default') {

    if (source === 'all_bookings') {
        $('#booked_rooms_container').toggle('up');
    }

    if (document.getElementById("view_booking_div").style.display === "none") {
        toggle_show_view_booking_div();
    }
    toggle_show_edit_booking_results_page();

    if (booking_id) {

        document.getElementById("view_booking_result_details").innerHTML = `
            <div style="width: 100%; text-align: center; padding: 20px 0;" class="loader loader--style2" title="1">
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="orangered" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"/>
                </path>
                </svg>
                <p style="text-align: center; font-size: 14px; color:white;">
                loading...
                </p>
            </div>
        `;

        toggle_show_edit_booking_results_page();

        let booking = await get_and_return_booking_by_id(booking_id);
        console.log(booking);
        if (booking.empty) {
            document.getElementById("view_booking_result_details").innerHTML = `
            <div style="padding: 40px 10px; text-align: center; font-size: 14px; color: white; background-color: rgba(0,0,0,0.4); border: 1px solid rgba(255, 255, 255, 0.2);">
                <i aria-hidden="true" class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;"></i>
                booking not found
            </div>
            `;
        } else {
            render_search_booking_results_markup(booking);
            current_edit_booking_object.booking = booking;
        }

    }
}

function toggle_show_guests_invoice_div() {
    $("#guests_invoice_div").toggle("up");
}

function show_guests_invoice_div() {
    toggle_show_guests_invoice_div();
}

async function view_each_guest_running_bill(index) {
    show_guests_invoice_div();
    console.log(all_running_invoices);
    let item_sum = 0;
    running_invoice = all_running_invoices[index];
    let all_item_names = [];
    running_invoice.invoice_items.forEach(each => {
        each.guest_items.forEach(item => {
            if (!all_item_names.includes(item.name)) {
                all_item_names.push(item.name);
                item_sum += parseFloat(item.total);
            }

        })
    });
    document.getElementById("guest_invoice_checkout_btn").onclick = () => go_to_checkout_from_inhouse_guests(running_invoice.invoice_items[0].guest_id, running_invoice.property_id, running_invoice.bookings[0], 'invoice_div');
    let totals = calculatePriceTotals(item_sum);
    document.getElementById("running_invoice_sub_total_display_span").innerText = `$${parseFloat(totals.base).toFixed(2)}`;
    document.getElementById("running_invoice_discount_display_span").innerText = `$${parseFloat(totals.discountAmount).toFixed(2)}`;
    document.getElementById("running_invoice_tax_display_span").innerText = `$${parseFloat(totals.taxAmount).toFixed(2)}`;
    document.getElementById("running_invoice_main_total_display_span").innerText = `$${parseFloat(totals.total).toFixed(2)}`;
    document.getElementById("running_invoice_number_display_span").innerHTML = `${running_invoice._id.toString().substring(0, 10)}...`;
    document.getElementById("guests_invoices_date_created").innerText = change_iso_date_to_readable_format(running_invoice.date_created);
    document.getElementById("guests_invoice_div_all_guests_items_list").innerHTML = "";
    for (let i = 0; i < running_invoice.invoice_items.length; i++) {

        let guest = await get_and_return_hotel_guest_by_id(window.localStorage.getItem("ANDSBZID"), running_invoice.property_id, running_invoice.invoice_items[i].guest_id);

        document.getElementById("guests_invoice_div_all_guests_items_list").innerHTML += `
            <div>
                <p style="display: flex; flex-direction: row !important; justify-content: space-between; margin-top: 15px; margin-bottom: 5px;">
                    <span style="font-size: 13px; color: rgba(255,255,255,0.5);">
                        Guest ${i + 1}</span>
                    <span style="display: none; cursor: pointer; font-size: 14px; color:rgb(255, 79, 79); margin-left: 20px; font-weight: in;">
                        <i style="margin-right: 5px; color: crimson;" class="fa fa-trash" aria-hidden="true"></i>
                        Remove Guest
                    </span>
                </p>
                <p style=" margin-left: 10px; font-weight: bolder; font-size: 13px; color:rgb(82, 177, 255);">
                    ${guest.first_name} ${guest.last_name}</p>
                <p style=" margin-left: 10px; font-size: 13px; color:rgb(157, 211, 255);">
                    ${guest.gender}, ${calculateAge(guest.DOB)}yrs</p>
                <div style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2);">
                    <table style="width: 100%; border-spacing: 5px;">
                        <tbody id="each_guest_invoice_items_list_${i}">
                            <tr>
                                <td style="font-size: 13px; color: rgba(255,255,255,0.5); padding: 5px; border-bottom: 2px solid rgb(255, 165, 62);">
                                    Item
                                </td>
                                <td style="font-size: 13px; color: rgba(255,255,255,0.5); padding: 5px; border-bottom: 2px solid rgb(255, 165, 62);">
                                    Quantity
                                </td>
                                <td style="font-size: 13px; color: rgba(255,255,255,0.5); padding: 5px; border-bottom: 2px solid rgb(255, 165, 62);">
                                    Unit Cost
                                </td>
                                <td style="font-size: 13px; color: rgba(255,255,255,0.5); padding: 5px; border-bottom: 2px solid rgb(255, 165, 62);">
                                    Total
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        for (let k = 0; k < running_invoice.invoice_items[i].guest_items.length; k++) {
            document.getElementById(`each_guest_invoice_items_list_${i}`).innerHTML += `
                <tr>
                    <td style="font-size: 13px; color: white; padding: 5px; background-color: rgba(0, 0, 0, 0.4); border-radius: 4px;">
                        ${running_invoice.invoice_items[i].guest_items[k].name}
                    </td>
                    <td style="font-size: 13px; color: white; padding: 5px; background-color: rgba(0, 0, 0, 0.4); border-radius: 4px;">
                        ${running_invoice.invoice_items[i].guest_items[k].quantity}
                    </td>
                    <td style="font-size: 13px; color: white; padding: 5px; background-color: rgba(0, 0, 0, 0.4); border-radius: 4px;">
                        ${running_invoice.invoice_items[i].guest_items[k].price}
                    </td>
                    <td style="font-size: 13px; color: white; padding: 5px; background-color: rgba(0, 0, 0, 0.4); border-radius: 4px;">
                        ${running_invoice.invoice_items[i].guest_items[k].total}
                    </td>
                </tr>
            `;
        }

    }
}

function view_many_guests_running_invoice() {
    show_guests_invoice_div();
}

function toggle_show_front_desk_accounts() {
    $("#front_desk_accounts_container").toggle("up");
}

function show_front_desk_accounts() {
    toggle_show_front_desk_accounts()
}

function toggle_show_mobile_menu() {
    $("#mobile_menu_div").toggle("up");
}

function toggle_show_guests_checkout_div() {
    $("#in_guests_checkout_div").toggle("up");
}

async function show_guests_checkout() {
    document.getElementById("guests_manager_div").style.display = "none";
    toggle_show_guests_checkout_div();
    setTimeout(() => {
        load_country_calling_codes_on_select_input("checkout_guests_search_country_calling_code_select");
    }, 510);

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("checkout_guests_search_property_select").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("checkout_guests_search_property_select").innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }

}
function toggle_show_in_house_guests_div() {
    $("#in_house_guests_div").toggle("up");
}

async function show_in_house_guests() {
    document.getElementById("guests_manager_div").style.display = "none";
    toggle_show_in_house_guests_div();
    setTimeout(() => {
        load_country_calling_codes_on_select_input("inhouse_guests_search_country_calling_code_select");
    }, 510);

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("in_house_guests_search_property_select").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("in_house_guests_search_property_select").innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }

}

function toggle_show_guests_manager_div() {
    $("#guests_manager_div").toggle("up");
}

async function show_guests_manager() {
    show_guest_manager_menu();
    toggle_show_guests_manager_div();
}

function toggle_show_guest_manager_find_guest() {
    $("#guest_manager_search_guest_div").toggle("up");
}

async function show_guest_manager_find_guest() {
    document.getElementById("guest_manager_menu_div").style.display = "none";
    document.getElementById("guest_manager_add_new_guest_div").style.display = "none";
    toggle_show_guest_manager_find_guest()

    setTimeout(() => {
        load_country_calling_codes_on_select_input("guests_manager_search_guest_calling_code_select");
    }, 510);

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("guests_manager_search_property_select").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("guests_manager_search_property_select").innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }
}
function toggle_show_guest_manager_edit_guest() {
    $("#guest_manager_edit_guest_div").toggle("up");
}
async function show_guest_manager_edit_guest_div() {

    if (document.getElementById("guests_manager_div").style.display === "none") {
        toggle_show_guests_manager_div();
    }
    document.getElementById("guest_manager_search_guest_div").style.display = "none";
    document.getElementById("guest_manager_add_new_guest_div").style.display = "none";
    document.getElementById("guest_manager_view_guest_profile_div").style.display = "none";
    document.getElementById("guest_manager_menu_div").style.display = "none";

    setTimeout(() => {
        load_country_calling_codes_on_select_input("guest_manager_edit_guest_country_calling_code_input");
    }, 510);

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("guest_manager_edit_guest_property_select").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("guest_manager_edit_guest_property_select").innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }

    toggle_show_guest_manager_edit_guest();
    let first_name = current_selected_guest.first_name;
    let last_name = current_selected_guest.last_name;
    let guest_current_address = `
        <i style="margin-right: 5px; color: rgb(137, 235, 174);" class="fa fa-plus" aria-hidden="true"></i>
        add address
    `;
    if (current_selected_guest.home_address.street_address !== "") {
        guest_current_address = `
            <i style="margin-right: 5px; color: rgb(137, 235, 174);" class="fa fa-building" aria-hidden="true"></i>
            ${current_selected_guest.home_address.street_address}.., <span style="color: rgba(255,255,255,0.6);">edit<span>
        `;
    }
    document.getElementById("guest_manager_edit_guest_address_btn").innerHTML = guest_current_address;
    document.getElementById("guest_manager_edit_guest_first_name_input").value = first_name;
    document.getElementById("guest_manager_edit_guest_last_name_input").value = last_name;
}

function toggle_show_guest_manager_menu() {
    $("#guest_manager_menu_div").toggle("up");
}

function show_guest_manager_menu() {
    document.getElementById("guest_manager_search_guest_div").style.display = "none";
    document.getElementById("guest_manager_add_new_guest_div").style.display = "none";
    document.getElementById("guest_manager_edit_guest_div").style.display = "none";
    document.getElementById("guest_manager_view_guest_profile_div").style.display = "none";
    if (document.getElementById("guest_manager_menu_div").style.display = "none") {
        toggle_show_guest_manager_menu();
    }
}

function toggle_show_guest_manager_add_new_guest() {
    $("#guest_manager_add_new_guest_div").toggle("up");
}

async function show_guest_manager_add_new_guest() {
    document.getElementById("guest_manager_search_guest_div").style.display = "none";
    document.getElementById("guest_manager_menu_div").style.display = "none";
    document.getElementById("guest_manager_edit_guest_div").style.display = "none";
    document.getElementById("guest_manager_view_guest_profile_div").style.display = "none";
    toggle_show_guest_manager_add_new_guest();

    setTimeout(() => {
        load_country_calling_codes_on_select_input("guest_manager_new_or_existing_guest_country_calling_code_input");
    }, 510);

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("guest_manager_new_or_existing_guest_property_select").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("guest_manager_new_or_existing_guest_property_select").innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }
}

function toggle_show_guest_manager_add_new_guest_address() {
    $("#guest_manager_add_guest_address").toggle("up");
}

function show_guest_manager_add_new_guest_address() {
    toggle_show_guest_manager_add_new_guest_address();
}

function toggle_show_guest_manager_edit_guest_address() {
    $("#guest_manager_edit_guest_address").toggle("up");
}

function show_guest_manager_edit_guest_address() {
    toggle_show_guest_manager_edit_guest_address();
}

function guest_manager_save_new_guest_address() {
    toggle_show_guest_manager_add_new_guest_address();
}

function toggle_show_guest_manager_add_new_guest_photo() {
    $("#guest_manager_add_guest_profile_photo").toggle("up");
}

function show_guest_manager_add_new_guest_photo() {
    toggle_show_guest_manager_add_new_guest_photo();
}

function toggle_show_guest_manager_edit_guest_photo() {
    $("#guest_manager_edit_guest_profile_photo").toggle("up");
}

function show_guest_manager_edit_guest_photo() {
    toggle_show_guest_manager_edit_guest_photo();
}

function toggle_show_guest_manager_view_guest_profile_div() {
    $("#guest_manager_view_guest_profile_div").toggle("up");
}

async function show_guest_manager_view_guest_profile_div(index = 0) {
    current_selected_guest = current_highlighted_guests[index];
    if (document.getElementById("guests_manager_div").style.display === "none") {
        toggle_show_guests_manager_div();
    }
    document.getElementById("guest_manager_search_guest_div").style.display = "none";
    document.getElementById("guest_manager_add_new_guest_div").style.display = "none";
    document.getElementById("guest_manager_edit_guest_div").style.display = "none";
    document.getElementById("guest_manager_menu_div").style.display = "none";
    document.getElementById("guest_manager_view_guest_profile_div").style.display = "none";

    toggle_show_guest_manager_view_guest_profile_div();
    render_guest_full_profile_markup();
}

async function render_guest_full_profile_markup() {
    console.log('selected guest', current_selected_guest);

    let first_name = current_selected_guest.first_name;
    let last_name = current_selected_guest.last_name;
    let guest_current_address = `
        <i style="margin-right: 5px; color: red;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        address not added.
    `;
    if (current_selected_guest.home_address.street_address !== "") {
        guest_current_address = `
            <i style="margin-right: 5px; color: rgb(137, 235, 174);" class="fa fa-building" aria-hidden="true"></i>
            ${current_selected_guest.home_address.street_address}, ${current_selected_guest.home_address.city}
        `;
    }
    let guest_age = calculateAge(current_selected_guest.DOB);
    let guest_gender = current_selected_guest.gender;

    guest_profile_manager_basic_info.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 55px; height: 55px; overflow: hidden; background-color: rgba(255,255,255, 0.3); border: 1px solid rgba(255, 255, 255, 0.548);">
            <p style="text-align: center;">
                <i style="font-size: 40px; color: rgba(255, 255, 255, 0.548);" class="fa fa-user" aria-hidden="true"></i>
            </p>
        </div>
        <div style="margin-left: 5px; display: flex; flex-direction: column; justify-content: flex-end;">
            <div style="margin-bottom: 5px; font-size: 14px; color: white;">
                <i style="margin-right: 5px; color: rgb(137, 235, 174);" class="fa fa-user" aria-hidden="true"></i>
                ${first_name} ${last_name}
            </div>
            <div style="font-size: 13px; color: white;">
                ${guest_current_address}
            </div>
            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin-top: 5px;">
                ${guest_age} years, ${guest_gender}</p>
        </div>
    `;

    //Booking history
    let bookings = await get_bookings_using_guest_id(current_selected_guest._id, current_selected_guest.property_id, current_selected_guest.hotel_brand_id);
    document.getElementById("guest_profile_manager_bookings_list").innerHTML = `
        <div style="padding: 40px 20px; font-size: 14px; text-align: center; color: white; border: 1px solid red;">
            <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: red;"></i>
            guest has no bookings
        </div>
    `;
    if (bookings.length > 0) {
        document.getElementById("guest_profile_manager_bookings_list").innerHTML = ``;
        for (let b = 0; b < bookings.length; b++) {
            let booking = bookings[b];
            let room_number = booking.rooms[0].number;
            let checkin = change_iso_date_to_readable_format(booking.checkin_date);
            let checkout = change_iso_date_to_readable_format(booking.checkout_date);
            document.getElementById("guest_profile_manager_bookings_list").innerHTML += `
                <p style="border-bottom: 1px solid rgba(255,255,255,0.2); padding: 10px; color: white; font-size: 13px;">
                    <!--i class="fa fa-bed" style="margin-right: 5px; color: lightgreen;" aria-hidden="true"></i-->
                    <i class="fa fa-history" style="margin-right: 5px; color: lightgreen;" aria-hidden="true"></i>
                    <span style="color:rgb(235, 137, 137);">${room_number}</span>
                    <span style="color: rgba(255,255,255,0.3); margin: 0 6px;">|</span>
                    ${checkin} - ${checkout}
                    <span style="color: rgba(255,255,255,0.3); margin: 0 6px;">|</span>
                    ${booking.guests.length} guest(s)
                </p>
            `;
        }
    }
}

function guest_manager_save_new_guest_photo() {
    toggle_show_guest_manager_add_new_guest_photo();
}

function toggle_show_hide_arrival_guests_div() {
    $("#arrival_guests_div").toggle("up");
}

async function show_arrival_guests() {
    document.getElementById("guests_manager_div").style.display = "none";
    toggle_show_hide_arrival_guests_div();
    setTimeout(() => {
        load_country_calling_codes_on_select_input("arrival_guests_search_country_calling_code_select");
    }, 510);

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("arrival_guests_search_property_select").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("arrival_guests_search_property_select").innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }

}

function toggle_show_hide_page_full_screen_prompt() {
    $("#page_full_screen_prompt").toggle("up");
}

function show_prompt_to_user(title, msg, status = 'fail') {
    toggle_show_hide_page_full_screen_prompt();
    document.getElementById("page_full_screen_prompt_title").innerHTML = title;
    document.getElementById("page_full_screen_prompt_msg").innerHTML = msg;
    if (status === 'success') {
        document.getElementById("page_full_screen_prompt_title").style.backgroundColor = "green";
    }
    if (status == "warning") {
        document.getElementById("page_full_screen_prompt_title").style.backgroundColor = "rgb(212, 113, 0)";
    }
}

function toggle_show_notifications_div() {
    if (document.getElementById("view_notifications_div").style.display === "none") {
        $("#view_notifications_div").show("slide", { direction: "right" }, 300);
    }
    else {
        $("#view_notifications_div").hide("slide", { direction: "right" }, 300);
    }
}

function show_notifications() {
    toggle_show_notifications_div();
}

function reservation_bind_guest_dob_chooser(type, input, index) {
    $(function () {
        $('#' + input).daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: false,
            showDropdowns: true,
            minYear: 1901,
            maxYear: parseInt(moment().format('YYYY'), 10)
        }, function (start, end, label) {
            setTimeout(() => {

                let year = start.format('YYYY-MM-DD').split("-")[0];
                let month = start.format('YYYY-MM-DD').split("-")[1];
                let d_date = start.format('YYYY-MM-DD').split("-")[2];

                let age = calculate_age(new Date(parseInt(year), parseInt(month), parseInt(d_date)));

                if (type === "adult") {
                    if (age < 18) {
                        document.getElementById(input).value = "";
                        document.getElementById(input).placeholder = "adults must be atleast 18";
                    } else {
                        document.getElementById(input).value = start.format('YYYY-MM-DD');
                        make_reservations_post_data.guests[index].DOB = start.format('YYYY-MM-DD');
                    }
                } else {
                    if (age > 17) {
                        document.getElementById(input).value = "";
                        document.getElementById(input).placeholder = "children must be below 18";
                    } else {
                        document.getElementById(input).value = start.format('YYYY-MM-DD');
                        make_reservations_post_data.guests[index].DOB = start.format('YYYY-MM-DD');
                    }
                }
            }, 100);
        });
    });
}

function edit_booking_bind_guest_dob_chooser(type, input, room_index, guest_index) {
    $(function () {
        $('#' + input).daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: false,
            showDropdowns: true,
            minYear: 1901,
            maxYear: parseInt(moment().format('YYYY'), 10)
        }, function (start, end, label) {
            setTimeout(() => {

                let year = start.format('YYYY-MM-DD').split("-")[0];
                let month = start.format('YYYY-MM-DD').split("-")[1];
                let d_date = start.format('YYYY-MM-DD').split("-")[2];

                let age = calculate_age(new Date(parseInt(year), parseInt(month), parseInt(d_date)));

                if (type === "adult") {
                    if (age < 18) {
                        document.getElementById(input).value = "";
                        document.getElementById(input).placeholder = "adults must be atleast 18";
                    } else {
                        document.getElementById(input).value = start.format('YYYY-MM-DD');
                        current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests[guest_index].DOB = start.format('YYYY-MM-DD');
                    }
                } else {
                    if (age > 17) {
                        document.getElementById(input).value = "";
                        document.getElementById(input).placeholder = "children must be below 18";
                    } else {
                        document.getElementById(input).value = start.format('YYYY-MM-DD');
                        current_edit_booking_object.rooms_and_guests.room_guests[room_index].guests[guest_index].DOB = start.format('YYYY-MM-DD');
                    }
                }
            }, 100);
        });
    });
}

function bind_guest_dob_chooser(type, input) {
    $(function () {
        $('#' + input).daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: false,
            showDropdowns: true,
            minYear: 1901,
            maxYear: parseInt(moment().format('YYYY'), 10)
        }, function (start, end, label) {
            setTimeout(() => {

                let year = start.format('YYYY-MM-DD').split("-")[0];
                let month = start.format('YYYY-MM-DD').split("-")[1];
                let d_date = start.format('YYYY-MM-DD').split("-")[2];

                let age = calculate_age(new Date(parseInt(year), parseInt(month), parseInt(d_date)));

                if (type === "adult") {
                    if (age < 18) {
                        document.getElementById(input).value = "";
                        document.getElementById(input).placeholder = "adults must be atleast 18";
                    } else {
                        document.getElementById(input).value = start.format('YYYY-MM-DD');
                    }
                } else {
                    if (age > 17) {
                        document.getElementById(input).value = "";
                        document.getElementById(input).placeholder = "children must be below 18";
                    } else {
                        document.getElementById(input).value = start.format('YYYY-MM-DD');
                    }
                }
            }, 100);

            search_booking_DOB = start.format('YYYY-MM-DD');
        });
    });
}

function convert_date_object_to_db_string_format(dateObj) {

    let the_month = dateObj.toLocaleString().split(",")[0].split("/")[0];
    let the_day = dateObj.toLocaleString().split(",")[0].split("/")[1];
    let the_year = dateObj.toLocaleString().split(",")[0].split("/")[2];
    //console.log(`${the_year}/${the_month}/${the_day}`)

    let a_date = new Date(`${the_year}/${the_month}/${the_day}`);
    //a_date = new Date(a_date.setDate(a_date.getDate() - 1));

    let date_string = a_date.toISOString(); //eg. 2021-05-02T09:13:26.243Z*/
    return date_string.split("T")[0];

}

function return_weeks_from_days(days) {
    let trailing_days = days % 7;
    if (trailing_days !== 0) {
        if (trailing_days === 1)
            trailing_days = ` and ${trailing_days} day`;
        else
            trailing_days = ` and ${trailing_days} days`;
    } else {
        trailing_days = "";
    }
    let weeks = parseInt(days / 7);
    return weeks > 1 ? `${weeks} weeks${trailing_days}` : `${weeks} week${trailing_days}`
}
function return_months_from_days() {

}

function convert_days_counts_to_week_month_year_counts(days) {
    if (days === 1) {
        return "1 day";
    } else if (days < 7) {
        return `${days} days`
    } else if (days >= 7) {
        return return_weeks_from_days(days);
    }
    return null;
}

function get_cancellation_amount_from_percentage(percentage, total_amount) {
    return (percentage / 100) * total_amount;
}

function is_first_greater_than_second_iso_string_dates_comparison(date1, date2) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);

    if (dt1 > dt2) {
        return true;
    }

    return false;
}

function is_first_less_than_second_iso_string_dates_comparison(date1, date2) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);

    if (dt1 > dt2) {
        return false;
    }

    return true;
}

function general_build_dates_list_from_range(first_date, last_date) {

    let the_year = first_date.split("-")[0];
    let the_month = first_date.split("-")[1];
    let the_day = first_date.split("-")[2];

    let the_year2 = last_date.split("-")[0];
    let the_month2 = last_date.split("-")[1];
    let the_day2 = last_date.split("-")[2];

    let startDate = new Date(`${the_year}/${the_month}/${the_day}`);
    let endDate = new Date(`${the_year2}/${the_month2}/${the_day2}`);

    //let startDate = new Date(first_date);
    //let endDate = new Date(last_date);

    startDate = new Date(startDate.setDate(startDate.getDate() - 1));

    let currentDate = startDate;
    let datesList = [];

    while (endDate > currentDate) {

        datesList.push({
            obj: currentDate
        });

        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));

    }

    return datesList;
}

var cheap_hotel_building = {
    hotel_brand_id: "6063dd3fb6dfe50bc800dd5f",
    full_location_address: "2122 Estate Junc, Sepe Tinpom, Kumasi, Ghana",
    city: "Kumasi",
    country: "Ghana",
    zipcode: "1121",
    street_address: "2122 Estate Junc",
    town: "Sepe Tinpom",
    description: "This branch is one of our main focul points when serving international clientell. It has all the needed services to ensure QOS for our clients.",
    amenities: [
        "Free Wifi", "Cable", "Other"
    ]
};

var cheap_hotel_room = {
    property_id: "607304a562a84645bccdf40b",
    hotel_brand_id: "6063dd3fb6dfe50bc800dd5f",
    room_number: "6D",
    closed: "false",
    booked: "false",
    room_type: "Delux",
    guest_capacitance: {
        adults: 1,
        children: 4
    },
    price: 47.00,
    description: "This room is one of our main focul points when serving international clientell. It has all the needed services to ensure QOS for our clients.",
    amenities: [
        "Free Wifi", "Cable", "Other"
    ],
    next_available_date: "3-5-2020",
    next_available_time: "10:15",
    cancellation_policy: {
        time_period: 14,
        percentage: 50,
    },
    photo_url: "",
    cancellation_requests: []
};

function toggle_show_full_Screen_photo_viewer() {
    $("#full_page_picture_viewer").toggle("up");
}

function view_image_on_full_screen(img_url) {
    //console.log(img_url);
    toggle_show_full_Screen_photo_viewer();
    document.getElementById("full_page_picture_viewer_img").src = img_url;
}

function toggle_show_add_new_photo_div() {
    $("#add_new_photo_div").toggle("up");
}

function return_cheap_hotel_rating_markup(rating_number = 1) {

    let rating_remark;

    if (rating_number === 1) {
        rating_remark = `
            <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            (Worst)
        `;
    } else if (rating_number === 2) {
        rating_remark = `
            <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            (Bad)
        `;
    } else if (rating_number === 3) {
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Average)
        `;
    } else if (rating_number === 4) {
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Good)
        `;
    } else if (rating_number === 5) {
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Excellent)
        `;
    }

    let rating_percentage = (rating_number * 20)

    return `
            <p style="margin-top: 10px; margin-bottom: 5px; color: aliceblue; font-weight: bolder; font-size: 13px; letter-spacing: 1px;">
                    Brand Quality 
                    <span style="font-size: 12px; color: rgb(137, 204, 235); margin-left: 10px;">
                        ${rating_remark}
                    </span>
                </p>
            <div style="position: relative; width: 300px; background: linear-gradient(to right, rgb(201, 43, 15), tomato, rgb(206, 255, 71),rgb(88, 236, 51),rgb(6, 175, 14));">
                <p style="position: absolute; text-align: center; color: white; font-size: 12px; top: 2px; left: 4px; text-shadow: 1px 2px 3px rgba(0,0,0,0.8)">
                    Overall Rating<p>    
                <div style="padding: 3px; border-right: black 4px solid; width: calc(${rating_percentage}% - 12px);">
                    <p style="font-size: 12px; font-weight: bolder; text-align: right;">${rating_percentage}%</p>
                </div>
            </div>
            <div style="width: 300px; height: 60px; display: flex; flex-direction: row !important; margin: 10px 0; margin-top: 5px;">
                <div style="position: relative; width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <p style="position: absolute; text-align: center; color: white; font-size: 12px; top: 1px; text-shadow: 1px 2px 3px rgba(0,0,0,0.8)">
                        Verified Account<p>   
                    <div style="background-color: rgb(201, 43, 15);  height: 45%;"></div>
                </div>
                <div style="position: relative; width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <p style="position: absolute; text-align: center; color: white; font-size: 12px; top: 1px; text-shadow: 1px 2px 3px rgba(0,0,0,0.8)">
                        Room Quality<p>
                    <div style="background-color: tomato; height: 30%;"></div>
                </div>
                <div style="position: relative; width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <p style="position: absolute; text-align: center; color: white; font-size: 12px; top: 1px; text-shadow: 1px 2px 3px rgba(0,0,0,0.8)">
                        Guest Review<p>
                    <div style="background-color: rgb(206, 255, 71); height: 40%;"></div>
                </div>
                <div style="position: relative; width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <p style="position: absolute; text-align: center; color: white; font-size: 12px; top: 1px; text-shadow: 1px 2px 3px rgba(0,0,0,0.8)">
                        Amenity Mark<p>
                    <div style="background-color: rgb(88, 236, 51); height: 35%;"></div>
                </div>
                <div style="position: relative; width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                    <p style="position: absolute; text-align: center; color: white; font-size: 12px; top: 1px; text-shadow: 1px 2px 3px rgba(0,0,0,0.8)">
                        Market
                        Access<p>    
                    <div style="background-color: rgb(6, 175, 14); height: 90%;"></div>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-between; background-color: rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.2); padding: 3px; align-items: center;">
                    <p style="font-size: 11px; color: orange; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 2px;">
                    100%</p>
                    <p style="font-size: 11px; color: orange; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 2px;">
                    50%</p>
                    <p style="font-size: 11px; color: orange;">
                    0%</p>
                </div>
            </div>
    `;
}

async function update_description_info_onsubmit() {
    let elem = document.getElementById("logged_in_hotel_description_input");

    if (elem.value === "") {
        elem.focus();
        elem.placeholder = "please enter description";
    } else {
        document.getElementById("full_screen_loader").style.display = "flex";
        let returned_description = await update_info_item("description", elem.value, window.localStorage.getItem("ANDSBZID"));
        display_logged_in_hotel_description(returned_description);
        toggle_show_edit_desc_info_form();
        document.getElementById("full_screen_loader").style.display = "none";
    }
}

//for misc info
function toggle_show_edit_mis_info_form(elem_id) {
    $("#logged_in_hotel_edit_misc_info_form").toggle("up");
    $("#" + elem_id).toggle("up");
}

function toggle_hide_edit_mis_info_form() {
    toggle_show_edit_mis_info_form(current_misc_edit_elem_id)
}

function start_edit_misc_info(elem_id, info, title) {
    if (document.getElementById("logged_in_hotel_edit_misc_info_form").style.display === "none") {
        toggle_show_edit_mis_info_form(elem_id);
    } else {
        $("#" + elem_id).toggle("up");
        if (current_misc_edit_elem_id) {
            $("#" + current_misc_edit_elem_id).toggle("up");
        }
    }
    current_misc_edit_elem_id = elem_id;
    document.getElementById("logged_in_hotel_edit_misc_form_title").innerText = title;
    document.getElementById("logged_in_hotel_edit_misc_form_input").value = info;

    if (title === "Edit URL") {
        current_info_update_type = "web_url"; //[name, email, mobile, web_url, fax, avg_price, description, office_location]
    } else if (title === "Edit Office") {
        current_info_update_type = "office_location";
    } else if (title === "Edit Avg. Room Price") {
        current_info_update_type = "avg_price";
    }
}

async function update_misc_info_onsubmit() {
    let elem = document.getElementById("logged_in_hotel_edit_misc_form_input");

    if (elem.value === "") {
        elem.focus();
        elem.placeholder = "please enter information";
    } else {

        document.getElementById("full_screen_loader").style.display = "flex";

        let returned_misc = await update_info_item(current_info_update_type, elem.value, window.localStorage.getItem("ANDSBZID"));

        if (current_info_update_type === "web_url") {
            render_each_loggin_hotel_info_item("logged_in_hotel_url_infor_item", "URL", returned_misc, "start_edit_misc_info");
        }
        if (current_info_update_type === "office_location") {
            render_each_loggin_hotel_info_item("logged_in_hotel_office_location_infor_item", "Office", returned_misc, "start_edit_misc_info");
        }
        if (current_info_update_type === "avg_price") {
            let avg_room_price = `$${returned_misc}`;
            render_each_loggin_hotel_info_item("logged_in_hotel_avg_price_infor_item", "Avg. Room Price", avg_room_price, "start_edit_misc_info");
        }

        if (current_misc_edit_elem_id) {
            $("#" + current_misc_edit_elem_id).toggle("up");
        }
        $("#logged_in_hotel_edit_misc_info_form").toggle("up");
        document.getElementById("full_screen_loader").style.display = "none";
    }
}

//for contacts info
function toggle_show_edit_contact_info_form(elem_id) {
    $("#logged_in_hotel_edit_contact_info_form").toggle("up");
    $("#" + elem_id).toggle("up")
}

function toggle_hide_edit_contact_info_form() {
    toggle_show_edit_contact_info_form(current_contact_edit_elem_id)
}

function start_edit_contact_info(elem_id, info, title) {
    if (document.getElementById("logged_in_hotel_edit_contact_info_form").style.display === "none") {
        toggle_show_edit_contact_info_form(elem_id)
    } else {
        $("#" + elem_id).toggle("up");
        if (current_contact_edit_elem_id) {
            $("#" + current_contact_edit_elem_id).toggle("up");
        }
    }
    current_contact_edit_elem_id = elem_id;
    document.getElementById("logged_in_hotel_edit_contact_form_title").innerText = title;
    document.getElementById("logged_in_hotel_edit_contact_form_input").value = info;

    if (title === "Edit Email") {
        current_info_update_type = "email"; //[name, email, mobile, web_url, fax, avg_price, description, office_location]
    } else if (title === "Edit Mobile") {
        current_info_update_type = "mobile";
    } else if (title === "Edit Fax") {
        current_info_update_type = "fax";
    }

}

async function update_contact_info_onsubmit() {

    document.getElementById("full_screen_loader").style.display = "flex";

    let elem = document.getElementById("logged_in_hotel_edit_contact_form_input");

    if (elem.value === "") {
        elem.focus();
        elem.placeholder = "please enter contact information";
    } else {
        let returned_contact = await update_info_item(current_info_update_type, elem.value, window.localStorage.getItem("ANDSBZID"));

        if (current_info_update_type === "email") {
            render_each_loggin_hotel_info_item("logged_in_hotel_email_infor_item", "Email", returned_contact, "start_edit_contact_info");
        }
        if (current_info_update_type === "mobile") {
            render_each_loggin_hotel_info_item("logged_in_hotel_mobile_infor_item", "Mobile", returned_contact, "start_edit_contact_info");
        }
        if (current_info_update_type === "fax") {
            render_each_loggin_hotel_info_item("logged_in_hotel_Fax_infor_item", "Fax", returned_contact, "start_edit_contact_info");
        }

        if (current_contact_edit_elem_id) {
            $("#" + current_contact_edit_elem_id).toggle("up");
        }
        $("#logged_in_hotel_edit_contact_info_form").toggle("up");
        document.getElementById("full_screen_loader").style.display = "none";
    }
}

//for operating cities info
function toggle_show_edit_op_cities_info_form(elem_id) {
    $("#logged_in_hotel_edit_op_cities_info_form").toggle("up");
    $("#" + elem_id).toggle("up")
}

function toggle_hide_edit_op_cities_info_form() {
    toggle_show_edit_op_cities_info_form(current_op_cities_edit_elem_id)
}

function start_edit_op_cities_info(elem_id, info, title) {
    if (document.getElementById("logged_in_hotel_edit_op_cities_info_form").style.display === "none") {
        toggle_show_edit_op_cities_info_form(elem_id)
    } else {
        $("#" + elem_id).toggle("up");
        if (current_op_cities_edit_elem_id) {
            $("#" + current_op_cities_edit_elem_id).toggle("up");
        }
    }
    current_op_cities_edit_elem_id = elem_id;
    document.getElementById("logged_in_hotel_edit_op_cities_form_title").innerText = title;
    document.getElementById("register_cheap_hotels_location_text_field").value = info;

}

async function add_new_cities_op_onclick() {

    if (document.getElementById("register_cheap_hotels_location_text_field").value === "") {
        document.getElementById("register_cheap_hotels_location_text_field").placeholder = "please enter new city";
        document.getElementById("register_cheap_hotels_location_text_field").focus();
        return null;
    }

    document.getElementById("full_screen_loader").style.display = "flex";

    let city = document.getElementById("register_cheap_hotels_location_text_field").value;
    let returned_cities = await add_new_cities_op(city, window.localStorage.getItem("ANDSBZID"));
    if (document.getElementById("no_cities_to_display_msg"))
        document.getElementById("no_cities_to_display_msg").style.display = "none";
    document.getElementById("logged_in_hotel_cities_op_list").innerHTML += render_each_operation_city(returned_cities[returned_cities.length - 1].city, returned_cities[returned_cities.length - 1].country);

    toggle_hide_show_anything("logged_in_hotel_edit_op_cities_info_form");
    toggle_hide_show_anything("logged_in_hotel_add_op_city_btn");
    document.getElementById("full_screen_loader").style.display = "none";
}

function delete_city_op_submit(elem_id, city) {
    remove_city_op(elem_id, city, window.localStorage.getItem("ANDSBZID"));
}

function render_each_loggin_hotel_info_item(info_elem_item_id, title, info, func_name) {
    document.getElementById(info_elem_item_id).innerHTML = `
        <p style="color: white; font-size: 14px;">
            <span style="color:aqua; font-size: 14px;">${title}:</span>
            ${info}
            <i onclick="${func_name}('${info_elem_item_id}', '${info}', 'Edit ${title}');" class="fa fa-pencil" aria-hidden="true"></i>
        </p>
    `;
}

//description infor funcs
var heightLimit = 200;

logged_in_hotel_description_input.oninput = function () {
    logged_in_hotel_description_input.style.height = ""; /* Reset the height*/
    logged_in_hotel_description_input.style.height = Math.min(logged_in_hotel_description_input.scrollHeight, heightLimit) + "px";
};

function toggle_show_edit_desc_info_form() {
    $("#logged_in_hotel_edit_desc_info_form").toggle("up");
    $("#logged_in_hotel_desc_info_txt_and_btn").toggle("up")

    setTimeout(() => {
        logged_in_hotel_description_input.style.height = ""; /* Reset the height*/
        logged_in_hotel_description_input.style.height = Math.min(logged_in_hotel_description_input.scrollHeight, heightLimit) + "px";
    }, 500);
}

var is_after_search_pane_opened = false;
async function set_rooms_for_search_selection() {

    document.getElementById("search_room_select_room_input").innerHTML = '';

    let rooms = await get_and_return_cheap_hotel_rooms_by_property_id(document.getElementById("search_room_select_property_input").value);
    for (let i = 0; i < rooms.length; i++) {
        document.getElementById("search_room_select_room_input").innerHTML += `
            <option value='${rooms[i]._id}'>${rooms[i].room_number}</option>
        `;
    }

    //run the search_room_get_selected_room function only after the first time
    if (is_after_search_pane_opened)
        search_room_get_selected_room();

    is_after_search_pane_opened = true;

}

function hide_room_search_pane() {
    $("#search_room_panel").toggle("up");
}

async function toggle_show_search_room_pane() {

    document.getElementById("add_room_form_panel").style.display = "none";
    $("#search_room_panel").toggle("up");

    let rooms = await get_and_return_rooms(window.localStorage.getItem("ANDSBZID"));
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    set_search_room_inputs_options(properties);

    if (rooms) {
        if ((rooms.length === 0)) {
            show_prompt_to_user(
                `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
                NOT ALLOWED`,
                `You don't have any rooms on your account. Please add rooms first`);
            toggle_show_add_room_pane();
            return null;
        }
    } else {
        show_prompt_to_user(
            `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
            NOT ALLOWED`,
            `You don't have any rooms on your account. Please add rooms first`);
        toggle_show_add_room_pane();
        return null;
    }

    rooms[0].checkin = "N/A";
    rooms[0].checkout = "N/A";
    let guest_name = "N/A";
    let guest_age = "N/A";
    let guest_gender = "N/A";

    rooms[0].booked = false;

    let booking = await get_and_return_current_booking_by_room_id(rooms[0]._id, rooms[0].room_number);
    for (let y = 0; y < booking.length; y++) {

        for (let j = 0; j < booking[y].all_dates_of_occupancy.length; j++) {

            let the_year = booking[y].all_dates_of_occupancy[j].split("-")[0];
            let the_month = booking[y].all_dates_of_occupancy[j].split("-")[1];
            let the_day = booking[y].all_dates_of_occupancy[j].split("-")[2];

            let the_date = new Date(`${the_year}/${the_month}/${the_day}`);
            let today = new Date();

            if (`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}` === `${the_date.getDate()}/${the_date.getMonth()}/${the_date.getFullYear()}`) {
                rooms[0].checkin = change_date_from_iso_to_long_date(booking[y].checkin_date);
                rooms[0].checkout = change_date_from_iso_to_long_date(booking[y].checkout_date);
                guest_name = booking[y].guests[0].first_name + " " + booking[y].guests[0].last_name;
                guest_age = booking[y].guests[0].age;
                guest_gender = booking[y].guests[0].gender;
                rooms[0].booked = true;
            }

        }
    }

    search_result_current_room_id = rooms[0]._id;

    document.getElementById("room_search_result_room_details").innerHTML =
        room_search_result_return_markup(rooms[0], guest_name, guest_age, guest_gender);

}

async function search_room_get_selected_room() {

    let room = await get_and_return_hotel_room_by_id(document.getElementById("search_room_select_room_input").value);

    search_result_current_room_id = room._id;
    global_is_room_closed = room.closed;

    room.checkin = "N/A";
    room.checkout = "N/A";
    let guest_name = "N/A";
    let guest_age = "N/A";
    let guest_gender = "N/A";
    room.booked = false;

    let booking = await get_and_return_current_booking_by_room_id(room._id, room.room_number);
    for (let y = 0; y < booking.length; y++) {

        for (let j = 0; j < booking[y].all_dates_of_occupancy.length; j++) {

            let the_year = booking[y].all_dates_of_occupancy[j].split("-")[0];
            let the_month = booking[y].all_dates_of_occupancy[j].split("-")[1];
            let the_day = booking[y].all_dates_of_occupancy[j].split("-")[2];

            let the_date = new Date(`${the_year}/${the_month}/${the_day}`);
            let today = new Date();

            if (`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}` === `${the_date.getDate()}/${the_date.getMonth()}/${the_date.getFullYear()}`) {
                room.checkin = change_date_from_iso_to_long_date(booking[y].checkin_date);
                room.checkout = change_date_from_iso_to_long_date(booking[y].checkout_date);
                guest_name = booking[y].guests[0].first_name + " " + booking[y].guests[0].last_name;
                guest_age = booking[y].guests[0].age;
                guest_gender = booking[y].guests[0].gender;
                room.booked = true;
            }

        }
    }

    document.getElementById("room_search_result_room_details").innerHTML =
        room_search_result_return_markup(room, guest_name, guest_age, guest_gender);

}

async function set_search_room_inputs_options(properties, property_id = "", room_id = "") {

    document.getElementById("search_room_select_property_input").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("search_room_select_property_input").innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }

    if (property_id)
        document.getElementById("search_room_select_property_input").value = property_id;

    await set_rooms_for_search_selection();
    if (room_id)
        document.getElementById("search_room_select_room_input").value = room_id;


}

async function view_selected_room_full_details(room_id) {

    is_after_search_pane_opened = false;

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    $("#search_room_panel").toggle("up");

    let room = await get_and_return_hotel_room_by_id(room_id);
    set_search_room_inputs_options(properties, room.property_id, room._id);

    //document.getElementById("search_room_select_room_input").value = room._id;

    room.checkin = "N/A";
    room.checkout = "N/A";
    let guest_name = "N/A";
    let guest_age = "N/A";
    let guest_gender = "N/A";

    room.booked = false;

    let booking = await get_and_return_current_booking_by_room_id(room._id, room.room_number);
    for (let y = 0; y < booking.length; y++) {

        for (let j = 0; j < booking[y].all_dates_of_occupancy.length; j++) {

            let the_year = booking[y].all_dates_of_occupancy[j].split("-")[0];
            let the_month = booking[y].all_dates_of_occupancy[j].split("-")[1];
            let the_day = booking[y].all_dates_of_occupancy[j].split("-")[2];

            let the_date = new Date(`${the_year}/${the_month}/${the_day}`);
            let today = new Date();

            if (`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}` === `${the_date.getDate()}/${the_date.getMonth()}/${the_date.getFullYear()}`) {
                room.checkin = change_date_from_iso_to_long_date(booking[y].checkin_date);
                room.checkout = change_date_from_iso_to_long_date(booking[y].checkout_date);
                guest_name = booking[y].guests[0].first_name + " " + booking[y].guests[0].last_name;
                guest_age = booking[y].guests[0].age;
                guest_gender = booking[y].guests[0].gender;
                room.booked = true;
            }

        }
    }

    search_result_current_room_id = room._id;

    document.getElementById("room_search_result_room_details").innerHTML =
        room_search_result_return_markup(room, guest_name, guest_age, guest_gender);

}

async function get_all_room_of_property(property_id) {

    document.getElementById("hotel_property_all_rooms_list").innerHTML = ``;

    let rooms = await get_and_return_cheap_hotel_rooms_by_property_id(property_id);
    let property = await get_and_return_hotel_property_by_id(property_id);

    document.getElementById('hotel_property_all_rooms_building_location').innerHTML = `
        <i style="color:rgb(211, 87, 5); margin-right: 5px; font-size: 20px;" class="fa fa-building" aria-hidden="true"></i>
        ${property.city},
        <span style="font-weight: initial; color:rgb(31, 42, 65); font-size: 12px; letter-spacing: 1px;">
            ${property.street_address}, ${property.country}
        </span>
    `;

    if (rooms.length === 0) {
        document.getElementById("hotel_property_all_rooms_body_title").innerHTML = `
            <div style="font-weight: initial; padding: 30px 10px; margin-top: 10px; border: 1px solid red; background-color: rgba(0,0,0,0.5);">
                <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;" aria-hidden="true"></i>
                no rooms were found
            </div>`;

        return null;
    }

    document.getElementById("hotel_property_all_rooms_body_title").innerText = `${rooms.length} room(s) on this property`;

    for (let i = 0; i < rooms.length; i++) {

        let checkin = "N/A";
        let checkout = "N/A";

        rooms[i].booked = false;

        let booking = await get_and_return_current_booking_by_room_id(rooms[i]._id, rooms[i].room_number);
        for (let y = 0; y < booking.length; y++) {

            for (let j = 0; j < booking[y].all_dates_of_occupancy.length; j++) {

                let the_year = booking[y].all_dates_of_occupancy[j].split("-")[0];
                let the_month = booking[y].all_dates_of_occupancy[j].split("-")[1];
                let the_day = booking[y].all_dates_of_occupancy[j].split("-")[2];

                let the_date = new Date(`${the_year}/${the_month}/${the_day}`);
                let today = new Date();

                if (`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}` === `${the_date.getDate()}/${the_date.getMonth()}/${the_date.getFullYear()}`) {
                    checkin = change_date_from_iso_to_long_date(booking[y].checkin_date);
                    checkout = change_date_from_iso_to_long_date(booking[y].checkout_date);
                    rooms[i].booked = true;
                }

            }
        }

        document.getElementById("hotel_property_all_rooms_list").innerHTML +=
            all_rooms_return_each_room_markup(rooms[i], checkin, checkout);
    }
}

function all_rooms_return_each_room_markup(room, checkin, checkout) {

    let property_id = room.property_id;
    let room_id = room._id;
    let is_closed = room.closed;
    let is_booked = room.booked;
    let room_number = room.room_number;
    let room_price = room.price;
    let room_type = room.room_type;
    let bed_type = room.bed_type;
    let number_of_adults = room.guest_capacitance.adults;
    let number_of_children = room.guest_capacitance.children;
    let cancellation = `
        ${convert_days_counts_to_week_month_year_counts(room.cancellation_policy.time_period)}, $${parseFloat(get_cancellation_amount_from_percentage(room.cancellation_policy.percentage, room.price)).toFixed(2)} 
        <span style="color:rgb(168, 195, 218); font-size: 12px;">(${room.cancellation_policy.percentage}%)</span>
    `;

    let room_booked_status = `
        <i aria-hidden="true" class="fa fa-circle" style="color:rgb(88, 236, 51); margin-right: 2px;"></i> 
        (<i aria-hidden="true" class="fa fa-check" style="color: lightgreen; margin-right: 2px;"></i>
        vacant)
    `;
    if (is_booked) {
        room_booked_status = `
            <i aria-hidden="true" class="fa fa-circle" style="color: crimson; margin-right: 2px;"></i> 
            (<i aria-hidden="true" class="fa fa-bed" style="color: lightgreen; margin-right: 2px;"></i>
            occupied)
        `;
    }

    if (is_closed) {
        room_booked_status = `
            <i aria-hidden="true" class="fa fa-circle" style="color: crimson; margin-right: 2px;"></i> 
            (<i aria-hidden="true" class="fa fa-lock" style="color: orangered; margin-right: 2px;"></i> 
            closed)
        `;
    }

    return `
        <div class="each_property_info" style="background-color: rgba(0, 0, 0, 0.4); border-bottom: 1px solid rgba(255,255,255,0.2); padding: 10px;">
            <div class="all_rooms_each_room_item_info" style="display: flex; justify-content: space-between; padding: 10px; padding-top: 0;">
                <div onclick="view_selected_room_full_details('${room_id}');" style="display: flex; cursor: pointer;">
                    <p style="letter-spacing: 1px; color: white; font-size: 15px; text-align: center;">
                        ${room_number}
                        <span style="color: rgba(255,255,255,0.2); margin-left: 5px;">|</span>
                        <span style="letter-spacing: 1px; margin-left: 5px; font-size: 13px; color:rgb(168, 195, 218);">
                            ${room_booked_status}
                        </span>
                    </p>
                    <p style="color: rgba(255,255,255,0.5); font-size: 13px;">
                        <span style="color: rgba(255,255,255,0.2); margin-left: 5px;">|</span>
                        <span style="font-size: 13px; color: orange;">${room_type} </span>
                        , <span style="font-size: 13px; color: orange;">${bed_type}</span>
                    </p>
                </div>
                <div style="cursor: pointer;" onclick="$('#all_rooms_list_each_room_item_details${room_id}').toggle('left'); var ard_elem_icon=document.getElementById('all_rooms_toggle_show_details_btn_icon${room_id}'); ard_elem_icon.style.transform==='rotate(180deg)' ? ard_elem_icon.style.transform='rotate(0)' : ard_elem_icon.style.transform='rotate(180deg)'">
                    <span style="color: rgba(255,255,255,0.2); margin-left: 5px; margin-right: 10px;">|</span>
                    <i id="all_rooms_toggle_show_details_btn_icon${room_id}" class="fa fa-caret-down" style="color: orangered; transition: all 0.5s" aria-hidden="true"></i>
                </div>
            </div>    
            <div id="all_rooms_list_each_room_item_details${room_id}" style="display: none !important; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2);" class="flex_row_default_flex_column_mobile">
                <div class="flex_child_of_two">
                    <p style="margin-bottom: 10px; font-size: 15px; color:rgba(212, 228, 241, 0.6);">
                        Room ${room_number}
                        <span style="display: none; color: white; font-weight: initial; margin-left: 10px; font-size: 12px; letter-spacing: 1px;">
                            ${room_booked_status}
                        </span>
                    </p>
                    <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                        Room type: 
                        <span style="font-size: 13px; color: white;">
                            ${room_type}</span></p>
                    <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                        Bed type: 
                        <span style="font-size: 13px; color: white;">
                            ${bed_type}</span></p>
                    <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                        Price: 
                        <span style="font-size: 13px; color: white;">
                            $${parseFloat(room_price).toFixed(2)}</span></p>
                    <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                        Guests Capacitance: 
                        <span style="font-size: 13px; color: white;">
                            ${number_of_adults} adult, ${number_of_children} children
                        </span>
                    </p>
                    <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                        Cancellation: 
                        <span style="font-size: 13px; color: white;">
                            ${cancellation}
                        </span>
                    </p>
                </div>
                <div class="flex_child_of_two flex_non_first_child rooms_list_second_each_flex_child">
                    <p style="color: rgba(255,255,255,0.5); margin-bottom: 10px; font-size: 13px; letter-spacing: 1px;">
                        Current Stay</p>
                    <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                        Checkin: 
                        <span style="font-size: 13px; color: white;">
                            ${checkin}</span></p>
                    <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                        Checkout: 
                        <span style="font-size: 13px; color: white;">
                            ${checkout}</span></p>
                    <div style="display: flex; flex-direction: row !important; width: 250px; margin-top: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                        <div onclick="show_room_availability('${room_id}', '${property_id}');" style="padding: 10px 0; width: 50%; cursor: pointer; background-color: rgb(4, 35, 47); border-top-left-radius: 4px; border-bottom-left-radius: 4px; font-size: 13px; text-align: center; letter-spacing: 1px; color: white;">
                            book new guest
                        </div>
                        <div onclick="view_a_room_bookings('${room_id}', '${room_number}');" style="padding: 10px 0; width: 50%; cursor: pointer; background-color: rgb(0, 16, 27); border-top-right-radius: 4px; border-bottom-right-radius: 4px; font-size: 13px; text-align: center; letter-spacing: 1px; color: white;">
                            see bookings
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: row !important; width: 250px; margin-top: 5px; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                        <div onclick="view_selected_room_full_details('${room_id}')" style="padding: 10px 0; width: 50%; cursor: pointer; background-color: rgba(41, 66, 88, 0.555); border-top-left-radius: 4px; border-bottom-left-radius: 4px; font-size: 13px; text-align: center; letter-spacing: 1px; color: white;">
                            view this room
                        </div>
                        <div onclick="edit_hotel_room_func('${room._id}');" style="padding: 10px 0; width: 50%; cursor: pointer; background-color: rgb(3, 70, 97); border-top-right-radius: 4px; border-bottom-right-radius: 4px; font-size: 13px; text-align: center; letter-spacing: 1px; color: white;">
                            <i style="color: rgba(255,255,255,0.5);" class="fa fa-pencil" aria-hidden="true"></i> edit this room
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function room_search_result_return_markup(room, guest_name, guest_age, guest_gender) {

    //let room_desc = .replaceAll("'", "@apostrophe@").replaceAll(",", "@comma@");

    let is_booked = room.booked;
    let is_closed = room.closed;
    let room_number = room.room_number;
    let room_type = room.room_type;
    let bed_type = room.bed_type;
    let room_price = room.price;
    let room_desc = room.description;
    let checkin = room.checkin;
    let checkout = room.checkout;
    let amenities_list = room.amenities;
    let guest_capacitance = room.guest_capacitance;
    let room_link = room.room_link;
    let cancellation = `
        ${convert_days_counts_to_week_month_year_counts(room.cancellation_policy.time_period)}, $${parseFloat(get_cancellation_amount_from_percentage(room.cancellation_policy.percentage, room.price)).toFixed(2)} 
        <span style="color:rgb(168, 195, 218); font-size: 12px;">(${room.cancellation_policy.percentage}%)</span>
    `;

    let current_guest_info = "";
    if (guest_name !== "N/A") {
        current_guest_info = `
            <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                Guest: 
                <span style="font-size: 13px; color: white;">
                    ${guest_name}, ${guest_age}yrs, ${guest_gender}
                </span>
            </p>
        `;
    }
    let the_room_link = room_link;

    if (the_room_link.length > 40) {
        the_room_link = `
            ${room_link.substring(0, 40)} <br/> ${room_link.substring(41, room_link.length)}`;
    }

    let amenities_display = amenities_list.join(", ");

    let room_booked_status = `
        <i aria-hidden="true" class="fa fa-circle" style="color:rgb(88, 236, 51); margin-right: 2px;"></i> 
        (vacant)
    `;
    if (is_booked) {
        room_booked_status = `
            <i aria-hidden="true" class="fa fa-circle" style="color: crimson; margin-right: 2px;"></i> 
            (occupied)
        `;
    }

    let room_is_closed_msg_display = "none";
    let room_closed_status = `
    <input onclick="open_close_rooms_function('${room._id}');" style="margin-bottom: -1px;" checked="true" id="room_status_switch_toggle" type="checkbox" />
    <label for="room_status_switch_toggle">
        <span style="font-size: 12px;" id="room_status_switch_toggle_display">
            Close Room
            <span style="font-size: 12px; color: rgba(255, 255, 255, 0.7); font-weight: bolder; margin-left: 10px;">
            (room is open)</span>
        </span>
    </label>
    `;
    if (is_closed) {

        room_is_closed_msg_display = "block";
        global_is_room_closed = true;
        room_closed_status = `
            <input onclick="open_close_rooms_function('${room._id}');" style="margin-bottom: -1px;" id="room_status_switch_toggle" type="checkbox" />
            <label for="room_status_switch_toggle">
                <span style="font-size: 12px;" id="room_status_switch_toggle_display">
                    Open Room
                    <span style="font-size: 12px; color: rgba(255, 255, 255, 0.7); font-weight: bolder; margin-left: 10px;">
                    (room is closed)</span>
                </span>
            </label>
        `;

        room_booked_status = `
            <i aria-hidden="true" class="fa fa-circle" style="color: crimson; margin-right: 2px;"></i> 
            (<i aria-hidden="true" class="fa fa-lock" style="color: orangered; margin-right: 2px;"></i> 
            closed)
        `;

    }

    //let room_desc = description.replaceAll("@apostrophe@", "'").replaceAll("@comma@", ",");
    return `
        <div class="flex_row_default_flex_column_mobile">
            <div class="flex_child_of_two">
                <p style="margin-bottom: 20px; font-size: 15px; color:rgb(212, 228, 241); font-weight: bolder;">
                    Room ${room_number} 
                    <span style="color: white; font-weight: initial; margin-left: 10px; font-size: 12px; letter-spacing: 1px;">
                        ${room_booked_status}
                    </span>
                </p>
                
                <p style="cursor: pointer; font-size: 12px; color: rgb(245, 210, 210); letter-spacing: 1px;">
                    ${room_closed_status}
                </p>
                <p style="display: ${room_is_closed_msg_display}; font-size: 13px; letter-spacing: 1px; color: rgb(245, 210, 210); margin-top: 5px;" id="room_search_result_room_is_closed_status">
                    <i style="color: orangered; margin-right: 5px" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    Closed rooms can't be booked.
                </p>
                <div style="display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; width: 250px; margin: 10px 0;">
                    <div onclick="add_new_hotel_room_func();" style="padding: 10px 0; width: 50%; cursor: pointer; background-color: rgba(41, 66, 88, 0.555); border-top-left-radius: 4px; border-bottom-left-radius: 4px; font-size: 13px; text-align: center; letter-spacing: 1px; color: white;">
                        <i style="color: rgba(255,255,255,0.5);" class="fa fa-plus" aria-hidden="true"></i> add new room
                    </div>
                    <div onclick="edit_hotel_room_func('${room._id}');" style="padding: 10px 0; width: 50%; cursor: pointer; background-color: rgb(3, 70, 97); border-top-right-radius: 4px; border-bottom-right-radius: 4px; font-size: 13px; text-align: center; letter-spacing: 1px; color: white;">
                        <i style="color: rgba(255,255,255,0.5);" class="fa fa-pencil" aria-hidden="true"></i> edit this room
                    </div>
                </div>
                <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Room type: 
                    <span style="font-size: 13px; color: white;">
                        ${room_type}</span></p>
                <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Bed type: 
                    <span style="font-size: 13px; color: white;">
                        ${bed_type}</span></p>
                <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Amenities: 
                    <span style="font-size: 13px; color: white;">
                        ${amenities_display}...</span></p>
                <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Price: 
                    <span style="font-size: 13px; color: white;">
                        $${parseFloat(room_price).toFixed(2)}</span></p>
                <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Description: 
                    <span style="font-size: 13px; color: white;">
                        ${room_desc}
                    </span></p>
            </div>
            <div class="flex_child_of_two flex_non_first_child">
                <p style="color: rgba(255,255,255,0.4); margin-bottom: 10px; font-size: 12px; letter-spacing: 1px;;">
                    CURRENT GUEST</p>
                <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Checkin: 
                    <span style="font-size: 13px; color: white;">
                        ${checkin}</span></p>
                <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Checkout: 
                    <span style="font-size: 13px; color: white;">
                        ${checkout}</span></p>
                ${current_guest_info}
                <!--p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Paid: 
                    <span style="font-size: 13px; color: white;">
                        $75.00</span></p-->
                <p onclick="view_a_room_bookings('${room._id}', '${room_number}');" style="cursor: pointer; font-size: 13px; color: rgb(245, 210, 210); padding: 10px; letter-spacing: 1px;">
                    view room ${room_number} bookings
                    <i style="margin-left: 5px; color:rgb(235, 137, 137);" aria-hidden="true" class="fa fa-long-arrow-right"></i>
                </p>
                <p style="color: rgba(255,255,255,0.4); margin-bottom: 10px; margin-top: 10px; font-size: 12px; letter-spacing: 1px;;">
                    ROOM LINK</p>
                <p style="margin: 10px; font-size: 13px; letter-spacing: 1px; color: rgb(121, 223, 252);">
                    The link below can be directly used to book this room. You may share to customers so that they find and book 
                    this room.</p>
                <p class="room_sharing_link">
                    <i class="fa fa-copy" aria-hidden="true"></i> 
                    <span style="font-size: 13px; color: white;">
                        ${the_room_link}
                    </span>
                    <span class="tooltip">
                        Click to copy link</span>
                </p>
                <p style="margin-top: 20px; color: rgba(255,255,255,0.4); margin-bottom: 10px; font-size: 12px; letter-spacing: 1px;">
                    AVAILABILITY</p>
                <!--p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    March 23, 2022 
                    <span style="font-size: 13px; color: white;">
                    - 12:30PM</span></p-->
                <p onclick="show_room_availability('${room._id}', '${room.property_id}');" style="cursor: pointer; font-size: 13px; color: rgb(245, 210, 210); padding: 10px; padding-top: 0; letter-spacing: 1px;">
                    view room ${room_number} availability
                    <i style="margin-left: 5px; color:rgb(235, 137, 137);" aria-hidden="true" class="fa fa-long-arrow-right"></i>
                </p>
            </div>
        </div>
        <div class="flex_row_default_flex_column_mobile">
            <div class="flex_child_of_two" style="margin-top: 20px;">
                <p style="color: rgba(255,255,255,0.4); margin-bottom: 10px; font-size: 12px; letter-spacing: 1px;">
                    MISC</p>
                <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Guests Capacitance: 
                    <span style="font-size: 13px; color: white;">
                        ${guest_capacitance.adults} adult, ${guest_capacitance.children} children
                    </span>
                </p>
                <p style="letter-spacing: 1px; margin-bottom: 5px; font-size: 13px; color:rgb(255, 136, 0);">
                    Cancellation: 
                    <span style="font-size: 13px; color: white;">
                        ${cancellation}
                    </span>
                </p>
                <p onclick="view_image_on_full_screen('${room.photo_url}')" style="cursor: pointer; font-size: 13px; color: rgb(245, 210, 210); padding: 10px; letter-spacing: 1px;">
                    view room photo
                    <i style="margin-left: 5px; color:rgb(235, 137, 137);" aria-hidden="true" class="fa fa-long-arrow-right"></i>
                </p>
                <p style="cursor: pointer; font-size: 13px; color: rgb(245, 210, 210); padding: 10px; letter-spacing: 1px;">
                    <i style="margin-right: 5px; color:rgb(255, 78, 78);" aria-hidden="true" class="fa fa-trash"></i>
                    delete this room
                </p>
            </div>
            <div style="margin-bottom: 20px; margin-top: 20px;" class="flex_child_of_two flex_non_first_child">
                <p style="color: rgba(255,255,255,0.4); margin-bottom: 10px; font-size: 12px; letter-spacing: 1px;">
                    CANCELLATION REQUESTS</p>
                    <p style="color: whitesmoke; font-size: 13px; letter-spacing: 1px; margin-bottom: 10px;">
                        Guest(s) requested booking cancellation. Click on the button below to view cancellation requests
                        <span style="color:rgb(255, 97, 6); font-size: 13px;">
                            with cancellation fee of $90.00</span>
                    </p>
                    <p style="background-color: rgba(41, 66, 88, 0.555); color: white; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); padding: 10px; margin-bottom: 20px; text-align: center; width: 160px; font-size: 13px; letter-spacing: 1px;">
                        View Requests
                    </p>
            </div>
        </div>
    `
}

async function open_close_rooms_function(room_id) {

    $("#room_search_result_room_is_closed_status").toggle("up");

    if (global_is_room_closed) {
        //open the room
        await open_close_rooms_ajax(room_id, "open");
        global_is_room_closed = false;
        document.getElementById("room_status_switch_toggle_display").innerHTML = `
            Close Room
            <span style="font-size: 12px; color: rgba(255, 255, 255, 0.7); font-weight: bolder; margin-left: 10px;">
            (room is open)</span>
        `;

    } else {
        //close the room
        await open_close_rooms_ajax(room_id, "close");
        global_is_room_closed = true;
        document.getElementById("room_status_switch_toggle_display").innerHTML = `
            Open Room
            <span style="font-size: 12px; color: rgba(255, 255, 255, 0.7); font-weight: bolder; margin-left: 10px;">
            (room is closed)</span>
        `;
    }
}

function open_close_rooms_ajax(room_id, close_or_open) {

    return $.ajax({
        type: "POST",
        url: "/open_or_close_room/" + room_id + "/" + close_or_open,
        /*data: "",
        dataType: "json",
        contentType: "application/json; charset=utf-8",*/
        success: data => {
            //console.log(data);
            return data;
        },
        error: err => {
            //console.log(err);
            return err
        }
    });
}

async function toggle_show_add_room_pane() {

    document.getElementById("add_room_form_properties_select").innerHTML = '';
    document.getElementById("search_room_panel").style.display = "none";

    $("#add_room_form_panel").toggle("up");
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    if (properties) {
        if (properties.length === 0) {
            document.getElementById("add_room_form_properties_select").style.backgroundColor = "red";
            //document.getElementById("add_room_form_properties_select").addEventListener('click', toggle_show_add_hotel_property_pane);
            document.getElementById("add_room_form_properties_select").disabled = true;
            document.getElementById("add_room_form_properties_select").innerHTML = `
            <option>
                add a new propterty first
            </option>
            `
        } else {
            for (let i = 0; i < properties.length; i++) {
                document.getElementById("add_room_form_properties_select").innerHTML += `
                <option value="${properties[i]._id}">
                    ${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}
                </option>`;
            }
        }
    } else {

        document.getElementById("add_room_form_properties_select").style.backgroundColor = "red";
        //document.getElementById("add_room_form_properties_select").addEventListener('click', toggle_show_add_hotel_property_pane);
        document.getElementById("add_room_form_properties_select").disabled = true;
        document.getElementById("add_room_form_properties_select").innerHTML = `
            <option>
                <i class="fa fa-exclamation-triangle" style="margin-right: 5px;"></i>
                add a new propterty first
            </option>
            `
    }
}

function add_new_hotel_room_func() {
    toggle_show_add_room_pane();
}

async function toggle_show_add_hotel_property_pane() {
    $("#add_hotel_property_form_panel").toggle("up");
    document.getElementById("all_hotel_properties_container").style.display = "none";

    let cities_operating = await get_all_cities(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("add_hotel_property_form_city_country_select").innerHTML = "";
    for (let i = 0; i < cities_operating.length; i++) {
        document.getElementById("add_hotel_property_form_city_country_select").innerHTML += `
            <option value="${cities_operating[i].city}, ${cities_operating[i].country}">
                ${cities_operating[i].city}, ${cities_operating[i].country}
            </option>
        `;
    }

}

function toggle_show_make_room_reservation_div() {
    $("#make_reservation_pane").toggle("up");
}

async function continue_room_reservation() {

    toggle_show_make_room_reservation_div();
    toggle_show_make_reservation_find_spot_pane();

    setTimeout(() => {
        load_country_calling_codes_on_select_input("mk_reservation_guest_mobile_country_code_select");
    }, 510);

    let the_rooms = await get_and_return_rooms(window.localStorage.getItem("ANDSBZID"));
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    if (the_rooms) {
        if ((the_rooms.length === 0)) {
            show_prompt_to_user(
                `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
                NOT ALLOWED`,
                `You don't have any rooms on your account. Please add rooms first`);
            setTimeout(() => {
                document.getElementById("make_reservation_pane").style.display = "none";
                toggle_show_add_room_pane();
            }, 500)
            return null;
        }
    } else {
        show_prompt_to_user(
            `<i style='margin-right: 5px; color: crimson;' class='fa fa-exclamation-triangle'></i>
            NOT ALLOWED`,
            `You don't have any rooms on your account. Please add rooms first`);
        setTimeout(() => {
            document.getElementById("make_reservation_pane").style.display = "none";
            toggle_show_add_room_pane();
        }, 500)
        return null;
    }

    document.getElementById("make_reservation_property_select").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("make_reservation_property_select").innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }

    document.getElementById("make_reservation_room_select").innerHTML = '';

    let rooms = await get_and_return_cheap_hotel_rooms_by_property_id(document.getElementById("make_reservation_property_select").value);
    for (let i = 0; i < rooms.length; i++) {
        document.getElementById("make_reservation_room_select").innerHTML += `
            <option value='${rooms[i]._id}'>${rooms[i].room_number}</option>
        `;
    }

    rooms_grid_view_config.property_id = document.getElementById("make_reservation_property_select").value;
    rooms_grid_view_config.rooms_id = document.getElementById("make_reservation_room_select").value;

    let room = await get_and_return_hotel_room_by_id(rooms_grid_view_config.rooms_id);
    make_reservations_post_data.current_room.capacitance.adults = room.guest_capacitance.adults;
    make_reservations_post_data.current_room.capacitance.children = room.guest_capacitance.children;
    make_reservations_post_data.current_room.id = room._id;
    make_reservations_post_data.current_room.number = room.room_number;

    make_guests_list_from_number_input_values("make_reservation_number_of_adults_input", "make_reservation_number_of_children_input", true);
    generate_and_display_grid_view_bookings();

}

async function show_room_availability(room_id, property_id) {

    toggle_show_make_room_reservation_div();

    //let the_rooms = await get_and_return_rooms(window.localStorage.getItem("ANDSBZID"));
    let the_rooms = await get_and_return_cheap_hotel_rooms_by_property_id(property_id);
    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));

    if (the_rooms) {
        if ((the_rooms.length === 0)) {
            show_prompt_to_user(
                `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
                NOT ALLOWED`,
                `You don't have any rooms on your account. Please add rooms first`);
            toggle_show_add_room_pane();
            return null;
        }
    } else {
        show_prompt_to_user(
            `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
            NOT ALLOWED`,
            `You don't have any rooms on your account. Please add rooms first`);
        toggle_show_add_room_pane();
        return null;
    }

    document.getElementById("make_reservation_property_select").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("make_reservation_property_select").innerHTML += `
            <option value='${properties[i]._id}'>${properties[i].city}, ${properties[i].street_address}, ${properties[i].country}</option>
        `;
    }
    rooms_grid_view_config.property_id = property_id;
    document.getElementById("make_reservation_property_select").value = property_id;

    document.getElementById("make_reservation_room_select").innerHTML = '';
    let rooms = await get_and_return_cheap_hotel_rooms_by_property_id(document.getElementById("make_reservation_property_select").value);
    for (let i = 0; i < rooms.length; i++) {
        document.getElementById("make_reservation_room_select").innerHTML += `
            <option value='${rooms[i]._id}'>${rooms[i].room_number}</option>
        `;
    }
    rooms_grid_view_config.rooms_id = room_id;
    document.getElementById("make_reservation_room_select").value = room_id;

    make_guests_list_from_number_input_values("make_reservation_number_of_adults_input", "make_reservation_number_of_children_input", true);
    generate_and_display_grid_view_bookings();

}

function toggle_show_make_reservation_add_guests_pane() {

    if (is_there_overlap) {
        show_prompt_to_user(`
            <i style="margin-right: 10px; font-size: 20px; color: rgba(255,255,255,0.5);" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            OVERLAPPING SPOTS`,
            "The spots you've chosen overlaps with exsiting bookings", "warning");
        return null;
    }

    if (document.getElementById("make_reservation_add_guests_pane").style.display === "none") {
        $("#make_reservation_find_spot_pane").toggle("up");
        $("#make_reservation_add_guests_pane").toggle("up");
        document.getElementById("make_reservation_pane_next_btn").style.opacity = 0.2;
        document.getElementById("make_reservation_pane_back_btn").style.opacity = 1;
    }

    //make_guests_list_from_number_input_values('make_reservation_popup_number_Of_adults_input', 'make_reservation_popup_number_Of_children_input', false);
}

function toggle_show_make_reservation_find_spot_pane() {
    if (document.getElementById("make_reservation_find_spot_pane").style.display === "none") {
        $("#make_reservation_add_guests_pane").toggle("up");
        $("#make_reservation_find_spot_pane").toggle("up");
        document.getElementById("make_reservation_pane_next_btn").style.opacity = 1;
        document.getElementById("make_reservation_pane_back_btn").style.opacity = 0.2;
    }
}
/*function view_and_edit_room(){
    toggle_show_search_room_pane();
}*/

async function toggle_show_all_hotel_properties() {

    let properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"))

    if (properties) {
        if ((properties.length === 0)) {
            show_prompt_to_user(
                `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
                NOT ALLOWED`,
                `You don't have any property on your account. Please add property first`);;
            toggle_show_add_hotel_property_pane();
            return null;
        }
    } else {
        show_prompt_to_user(
            `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
            NOT ALLOWED`,
            `You don't have any property on your account. Please add property first`);
        toggle_show_add_hotel_property_pane();
        return null;
    }

    $("#all_hotel_properties_container").toggle("up");
    document.getElementById("add_hotel_property_form_panel").style.display = "none"

    document.getElementById("total_properties_count").innerText = `${properties.length} property(s) found`;
    document.getElementById("hotel_properties_list").innerHTML = '';
    for (let i = 0; i < properties.length; i++) {
        document.getElementById("hotel_properties_list").innerHTML += all_properties_return_each_property_markup(properties[i]);
    }

}

function all_properties_return_each_property_markup(property) {
    return `
        <div class="each_property_info" style="background-color:rgba(0, 0, 0, 0.7); border-bottom: 1px solid rgba(255,255,255,0.2); padding: 10px;">
            <p style="font-weight: bolder; margin-bottom: 10px; letter-spacing: 1px; color: white; font-size: 13px;">
                <i style="color:rgb(211, 87, 5); margin-right: 5px; font-size: 20px;" class="fa fa-building" aria-hidden="true"></i>
                ${property.city},
                <span style="font-weight: initial; color:rgb(185, 201, 236); font-size: 12px; letter-spacing: 1px;">
                    ${property.street_address}, ${property.country}
                </span>
            </p>
            <div style="display: flex; flex-direction: row !important; width: 250px; margin-top: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;">
                <div onclick="show_all_hotel_property_rooms('${property._id}')" style="padding: 10px 0; width: 50%; cursor: pointer; background-color: rgba(41, 66, 88, 0.555); border-top-left-radius: 4px; border-bottom-left-radius: 4px; font-size: 13px; text-align: center; letter-spacing: 1px; color: white;">
                    <i style="color: rgba(255,255,255,0.5);" class="fa fa-list" aria-hidden="true"></i> view rooms
                </div>
                <div onclick="" style="padding: 10px 0; width: 50%; cursor: pointer; background-color: rgb(3, 70, 97); border-top-right-radius: 4px; border-bottom-right-radius: 4px; font-size: 13px; text-align: center; letter-spacing: 1px; color: white;">
                    <i style="color: rgba(255,255,255,0.5);" class="fa fa-pencil" aria-hidden="true"></i> edit property
                </div>
            </div>
        </div>
    `;
}

function toggle_show_all_hotel_property_rooms() {
    $("#hotel_property_all_rooms_container").toggle("up");
}

function show_all_hotel_property_rooms(property_id) {
    get_all_room_of_property(property_id)
    toggle_show_all_hotel_property_rooms();
}

async function toggle_show_all_cities() {
    $("#all_cities_list_container").toggle("up");

    let cities_operating = await get_all_cities(window.localStorage.getItem("ANDSBZID"));

    document.getElementById("add_hotel_property_form_city_country_select").innerHTML = "";
    for (let i = 0; i < cities_operating.length; i++) {
        document.getElementById("add_hotel_property_form_city_country_select").innerHTML += `
            <option value="${cities_operating[i].city}, ${cities_operating[i].country}">
                ${cities_operating[i].city}, ${cities_operating[i].country}
            </option>
        `;
    }
}

async function get_and_render_all_policies() {

    document.getElementById("all_hotel_policies_list").innerHTML = ``;

    let policies = await get_all_policies(window.localStorage.getItem("ANDSBZID"));

    if (policies) {
        if (policies.length > 0) {
            for (let i = 0; i < policies.length; i++) {
                document.getElementById("all_hotel_policies_list").innerHTML = all_policies_return_each_policy_markup(i, policies[i]);
            }
        } else {
            document.getElementById("all_hotel_policies_list").innerHTML = `
                <p style="margin-top: 10px; color: white; background-color: rgba(0,0,0,0.5); border: 1px solid red; padding: 30px 10px; text-align: center;">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true" style="margin-right: 5px; color: red;" ></i>
                    You don't have any policies
                </p>
            `;
        }
    }

}

function toggle_show_all_policies() {

    $("#all_policies_list_container").toggle("up");
    get_and_render_all_policies();

}
async function all_policies_remove_each_policy(elem_id, type, description, property){
    await all_policies_delete_policty_item(type, description, property);
    $("#"+elem_id).toggle('up');
}
function all_policies_return_each_policy_markup(number, policy) {
    return `
        <div id="all_logged_in_hotel_policies_${number}_policy" style="padding: 10px; background-color: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.2);">
            <div style="display: flex; flex-direction: row !important; justify-content: space-between;">
                <div>
                    <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 5px;">
                    <i class="fa fa-circle-dot" style="color: orangered; margin-right: 5px;"></i>
                    ${policy.type}</p>
                    <p style="margin-top: 10px; color: white; font-size: 13px; letter-spacing: 1px;">
                        ${policy.description} 
                    </p>
                </div>
                <span onclick="toggle_hide_show_anything('all_policies_delete_${number}_policy_confirm_dialog')" style="padding-left: 20px;">
                    <i style="color: rgb(258, 112, 112);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </div>
            <div id="all_policies_delete_${number}_policy_confirm_dialog" style="position: initial; margin: 10px 0; border-top: 1px solid rgba(255,255,255,0.2); padding: 0; padding-top: 10px; background: none; width: 100%;" class="confirm_delete_dialog">
                <p style="color: rgba(255,255,255,0.5); font-size: 13px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 10px;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2);">
                    <div onclick="all_policies_remove_each_policy('all_logged_in_hotel_policies_${number}_policy', '${policy.type}', '${policy.description.replaceAll("'", "@apostrophe@")}', '${policy.property}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: brown; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('all_policies_delete_${number}_policy_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `
}

function toggle_show_finish_add_new_policy_form() {
    $("#add_new_policy_additional_info_form").toggle("up");
}

function show_all_cities() {
    toggle_show_all_cities();
    render_all_logged_in_hotel_cities();
}

async function all_cities_add_new_city() {

    document.getElementById("full_screen_loader").style.display = "flex";
    let input_elem = document.getElementById("logged_in_hotel_all_cities_list_add_city_form_input");
    let new_city = input_elem.value

    if (new_city === "") {
        input_elem.focus();
        input_elem.placeholder = "please enter new city";
        document.getElementById("full_screen_loader").style.display = "none";
    } else {
        let return_res = await add_new_cities_op(new_city, window.localStorage.getItem("ANDSBZID"));
        document.getElementById("full_screen_loader").style.display = "none";
        input_elem.value = "";
        show_prompt_to_user(
            `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-check'></i>
            Success`,
            `new city added!`, "success");
        render_all_logged_in_hotel_cities();
    }
}

function toggle_hide_show_anything(elem_id) {
    $("#" + elem_id).toggle("up");
}

function hotel_manager_logout() {
    window.localStorage.removeItem("ANDSBZID");
    document.location.href = "/listed_property_login.html"
}

//function to render hotel pictures
function display_logged_in_hotel_photos(pic1, pic2, pic3, pic4, pic5) {

    document.getElementById("logged_in_hotel_main_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i  onclick="toggle_hide_show_anything('delete_main_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: auto; min-height: 300px; width: 100%;" src="${pic5}" alt="" />
        <div id="delete_main_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div onclick="general_delete_photo('${pic5}', '${window.localStorage.getItem("ANDSBZID")}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_main_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
    document.getElementById("logged_in_hotel_first_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i onclick="toggle_hide_show_anything('delete_first_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: 150px; width: auto; min-width: 100%;" src="${pic1}" alt="" />
        <div id="delete_first_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div onclick="general_delete_photo('${pic1}', '${window.localStorage.getItem("ANDSBZID")}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_first_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
    document.getElementById("logged_in_hotel_second_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i onclick="toggle_hide_show_anything('delete_second_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: 150px; width: auto; min-width: 100%;" src="${pic2}" alt="" />
        <div id="delete_second_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div onclick="general_delete_photo('${pic2}', '${window.localStorage.getItem("ANDSBZID")}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_second_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
    document.getElementById("logged_in_hotel_third_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i onclick="toggle_hide_show_anything('delete_third_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: 150px; width: auto; min-width: 100%;" src="${pic3}" alt="" />
        <div id="delete_third_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div onclick="general_delete_photo('${pic3}', '${window.localStorage.getItem("ANDSBZID")}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_third_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;
    document.getElementById("logged_in_hotel_fourth_photo_display").innerHTML = `
        <p class="gallery_photos_action_buttons" >
            <i onclick="toggle_hide_show_anything('delete_fourth_photo_confirm_dialog');" style="color: rgb(252, 26, 26);" class="fa fa-trash" aria-hidden="true"></i>
        </p>
        <img style="height: 150px; width: auto; min-width: 100%;" src="${pic4}" alt="" />
        <div id="delete_fourth_photo_confirm_dialog" class="confirm_delete_dialog">
            <p style="font-size: 12px; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                Are you sure</p>
            <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                <div onclick="general_delete_photo('${pic4}', '${window.localStorage.getItem("ANDSBZID")}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: crimson; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Delete
                </div>
                <div onclick="toggle_hide_show_anything('delete_fourth_photo_confirm_dialog');" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: darkslateblue; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                    Cancel
                </div>
            </div>
        </div>
    `;

}

//function to render logged_hotel name
function display_logged_in_hotel_name(name, subs_status, prof_status) {

    let top_nav_disp_name = name;
    let desc_disp_name = name;

    if (name.length > 18) {
        top_nav_disp_name = name.substring(0, 15) + "...";
    }

    if (name.length > 22) {
        desc_disp_name = name.substring(0, 19) + "...";
    }

    let subscription_status = `
        <span style="color:aqua; font-size: 14px;">Status:</span>
            not subscribed <i style="color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
    `;

    let top_nav_subs_status = `<i style="color: orangered; font-size: 12px !important; margin-right: 0;" class="fa fa-exclamation-triangle" aria-hidden="true"></i> not subscribed `;

    if (subs_status) {
        subscription_status = `
            <span style="color:aqua; font-size: 14px;">Status:</span>
                subscribed <i style="color: rgb(137, 235, 174);" class="fa fa-check" aria-hidden="true"></i>
        `;
        top_nav_subs_status = `<i style="color: rgb(137, 235, 174); font-size: 12px !important; margin-right: 0;" class="fa fa-check" aria-hidden="true"></i> subscribed`;
    }

    let profile_status = `
        <span style="color:aqua; font-size: 14px;">Profile:</span>
            not verified <i style="color: orangered;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
    `;

    if (prof_status) {
        profile_status = `
            <span style="color:aqua; font-size: 14px;">Profile:</span>
                verified <i style="color: rgb(137, 235, 174);" class="fa fa-check" aria-hidden="true"></i>
        `;
    }

    document.getElementById("main_top_nav_hotel_name_display").innerHTML = `
        <p style="cursor: pointer;">
        <i class="fa fa-building" aria-hidden="true"></i>${top_nav_disp_name}
        </p>
        <div id="top_nav_hotel_name_display_drop_down">
            <p style="font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; margin-bottom: 10px;">
            ${top_nav_subs_status}</p>
            <p onclick="hotel_manager_logout()" style="border-top: 1px solid rgba(255,255,255,0.2); font-weight: bolder; cursor: pointer; padding: 10px 0; font-size: 13px !important; text-align: center; width: 100%; color: white;">
                <i style="margin-right: 5px; color:rgb(252, 26, 26);" class="fa fa-sign-in" aria-hidden="true"></i>
                Logout</p>
        </div>
    `;

    document.getElementById("logged_in_hotel_details_section_name_disp").innerText = desc_disp_name;
    document.getElementById("logged_in_hotel_details_section_subscription_status_disp").innerHTML = subscription_status;
    document.getElementById("logged_in_hotel_details_section_profile_status_disp").innerHTML = profile_status;
}

//function to render contacts information
function display_logged_in_hotel_description(desc) {
    document.getElementById("logged_in_hotel_desc_info_txt").innerText = desc;
    document.getElementById("logged_in_hotel_description_input").innerText = desc;
    document.getElementById("logged_in_hotel_desc_info_txt_loader").style.display = "none";
}

//function to render each city operating in
function render_each_operation_city(city, country) {
    return `
        <div id="logged_in_hote_${city.replaceAll(" ", "_")}_${country.replaceAll(" ", "_")}_city_Op" class="logged_in_hotel_amenity" style="padding-bottom: 5px;">
            <p>
                <span style="font-size: 14px;">
                    <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${city}, ${country}
                </span>
                <span onclick="toggle_hide_show_anything('delete_${city.replaceAll(" ", "_")}_${country.replaceAll(" ", "_")}_city_confirm_dialog')" class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i style="color: rgb(235, 137, 137);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="delete_${city.replaceAll(" ", "_")}_${country.replaceAll(" ", "_")}_city_confirm_dialog" style="position: initial; margin: 10px 0; background: none !important; border-top: 1px solid rgba(255,255,255,0.2); border-bottom: 1px solid rgba(255,255,255,0.2);" class="confirm_delete_dialog">
                <p style="font-size: 12px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 20px; color: white;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important;">
                    <div onclick="delete_city_op_submit('logged_in_hote_${city.replaceAll(" ", "_")}_${country.replaceAll(" ", "_")}_city_Op', '${city}, ${country}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: brown; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('delete_${city.replaceAll(" ", "_")}_${country.replaceAll(" ", "_")}_city_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    `;
}

//function to render last added hotel policy
function render_logged_in_hotel_last_added_policy(policy) {
    document.getElementById("dashboard_displayed_last_added_hotel_policy").innerHTML = `
        <p class="logged_in_payments_card_display" style="margin-top: 10px; color: white;">
            <span style="color:aqua; font-size: 14px;">${policy.type}:</span>
            ${policy.description} 
        </p>
    `;
}

//function to render hotel last review
function display_logged_in_hotel_last_review_rating(rating_number = 1) {

    let rating_remark;
    let bar_color;

    if (rating_number === 1) {
        rating_remark = `
            <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            (Worst)
        `;
        bar_color = "rgb(201, 43, 15)";
    } else if (rating_number === 2) {
        rating_remark = `
            <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            (Bad)
        `;
        bar_color = "tomato";
    } else if (rating_number === 3) {
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Average)
        `;
        rgb(206, 255, 71)
    } else if (rating_number === 4) {
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Good)
        `;
        bar_color = "rgb(88, 236, 51)";
    } else if (rating_number === 5) {
        rating_remark = `
            <i style="color: rgb(137, 235, 174); margin-right: 5px;" class="fa fa-check" aria-hidden="true"></i>
            (Excellent)
        `;
        bar_color = "rgb(6, 175, 14)";
    }

    let rating_percentage = (rating_number * 20)

    document.getElementById("logged_in_hotel_last_review_rating").innerHTML = `
        <p style="margin-top: 10px; margin-bottom: 5px; color: aliceblue; font-weight: bolder; font-size: 13px; letter-spacing: 1px;">
        Rated <span style="font-size: 12px; color: rgb(137, 204, 235); margin-left: 10px;">
            ${rating_remark}
        </p>
        <div style="width: 250px; background-color: aliceblue;">
            <div style="padding: 3px; background-color: ${bar_color}; width: ${rating_percentage}%; border-top-right-radius: 20px; border-bottom-right-radius: 20px;">
                <p style="color: white; font-size: 12px; font-weight: bolder; text-align: right;">${rating_percentage}%</p>
            </div>
        </div>
        <div style="width: 250px; height: 40px; display: flex; flex-direction: row !important; margin: 10px 0;">
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: rgb(201, 43, 15);  height: 20%;"></div>
            </div>
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: tomato; height: 40%;"></div>
            </div>
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: rgb(206, 255, 71); height: 60%;"></div>
            </div>
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: rgb(88, 236, 51); height: 80%;"></div>
            </div>
            <div style="width: 20%; height: 100%; display: flex; flex-direction: column !important; justify-content: flex-end;">
                <div style="background-color: rgb(6, 175, 14); height: 100%;"></div>
            </div>
        </div>
    `;
}

//function to render last review
function display_logged_in_hotel_description_last_review(name, msg, pic_url, rating) {

    document.getElementById("logged_in_hotel_last_reviewer_img").src = pic_url;
    document.getElementById("logged_in_hotel_last_reviewer_name").innerText = name;
    document.getElementById("logged_in_hotel_last_reviewer_msg").innerText = msg;

    display_logged_in_hotel_last_review_rating(rating);
}

//function to get all hotel information
function get_logged_in_hotel_infor() {

    let ANDSBZID = window.localStorage.getItem("ANDSBZID");

    $.ajax({
        type: "GET",
        url: `/get_logged_in_hotel_info/${ANDSBZID}`,
        success: data => {

            //console.log(data);
            if (!data || (Array.isArray(data) && data.length === 0)) {
                //basic info
                display_logged_in_hotel_name("Not Available", false, false);
                logged_in_hotel_ratings_area.innerHTML = return_cheap_hotel_rating_markup(0);
                //contact info
                render_each_loggin_hotel_info_item("logged_in_hotel_email_infor_item", "Email", "N/A", "start_edit_contact_info");
                render_each_loggin_hotel_info_item("logged_in_hotel_mobile_infor_item", "Mobile", "N/A", "start_edit_contact_info");
                render_each_loggin_hotel_info_item("logged_in_hotel_Fax_infor_item", "Fax", "N/A", "start_edit_contact_info");
                //misc info
                render_each_loggin_hotel_info_item("logged_in_hotel_url_infor_item", "URL", "N/A", "start_edit_misc_info");
                render_each_loggin_hotel_info_item("logged_in_hotel_office_location_infor_item", "Office", "N/A", "start_edit_misc_info");
                render_each_loggin_hotel_info_item("logged_in_hotel_avg_price_infor_item", "Avg. Room Price", "N/A", "start_edit_misc_info");
                //description info
                display_logged_in_hotel_description("N/A");
                //last review
                display_logged_in_hotel_description_last_review("", "", "", 0);
                document.getElementById("logged_in_hotel_cities_op_list").innerHTML = `
                    <p id="no_cities_to_display_msg" style="color:white; font-size: 14px; text-align: center; margin-bottom: 20px;">
                        Not Available<i style="color: orangered; margin-left: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    </p>
                `;
                document.getElementById("dashboard_displayed_last_added_hotel_policy").innerHTML = `
                    <p id="no_cities_to_display_msg" style="color:white; font-size: 14px; text-align: center; margin-bottom: 20px;">
                        Not Available<i style="color: orangered; margin-left: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    </p>
                `;
                document.getElementById("logged_in_hotel_amenities_list").innerHTML = `
                    <p id="no_amenities_to_display_msg" style="color:white; font-size: 14px; text-align: center; margin-bottom: 20px;">
                        Not Available<i style="color: orangered; margin-left: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    </p>
                `;
                document.querySelector(".logged_in_hotel_gallery").style.display = 'none';
                document.querySelector(".logged_in_hotel_reviews").style.display = 'none';
                get_hotel_rooms("no id");
                get_hotel_bookings("no id");
                document.getElementById("logged_in_hotel_add_amenity_btn").style.display = "none";
                document.getElementById("logged_in_hotel_add_op_city_btn").style.display = "none";
                document.querySelectorAll(".logged_in_hotel_details_each_section_content")[2].innerHTML = `
                    <div style="text-align: center; padding: 20px; border-radius: 4px; border: 1px solid red; background-color: rgba(0,0,0,0.5); color: white;">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true" style="margin-right: 5px; color: red;"></i>
                        No payments information can be displayed at the Moment!
                        <div style="border-top: 1px solid rgba(255,255,255,0.2); margin-top: 10px; padding-top: 10px; font-size: 14px; color: rgba(255,255,255,0.5);">
                            Please make sure your account is active or verified!
                        </div>
                    </div>
                `
                show_prompt_to_user(
                    `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
                    INACTIVE ACCOUNT`,
                    `Your account is not active at the moment.`);
                return;
            }
            let avg_room_price = `$${data.price}`;

            let reviewer_name = data.reviews[data.reviews.length - 1].person;
            let reviewer_img = data.reviews[data.reviews.length - 1].image;
            let reviewer_rated = data.reviews[data.reviews.length - 1].rated;
            let reviewer_msg = data.reviews[data.reviews.length - 1].message;

            //basic info
            display_logged_in_hotel_name(data.name, data.subscribed, data.approved);
            logged_in_hotel_ratings_area.innerHTML = return_cheap_hotel_rating_markup(data.rating);
            //contact info
            render_each_loggin_hotel_info_item("logged_in_hotel_email_infor_item", "Email", data.email, "start_edit_contact_info");
            render_each_loggin_hotel_info_item("logged_in_hotel_mobile_infor_item", "Mobile", data.mobile, "start_edit_contact_info");
            render_each_loggin_hotel_info_item("logged_in_hotel_Fax_infor_item", "Fax", data.fax, "start_edit_contact_info");
            //misc info
            render_each_loggin_hotel_info_item("logged_in_hotel_url_infor_item", "URL", data.url, "start_edit_misc_info");
            render_each_loggin_hotel_info_item("logged_in_hotel_office_location_infor_item", "Office", data.location, "start_edit_misc_info");
            render_each_loggin_hotel_info_item("logged_in_hotel_avg_price_infor_item", "Avg. Room Price", avg_room_price, "start_edit_misc_info");
            //description info
            display_logged_in_hotel_description(data.description);
            //last review
            display_logged_in_hotel_description_last_review(reviewer_name, reviewer_msg, reviewer_img, reviewer_rated);
            //amenities
            document.getElementById("logged_in_hotel_amenities_list").innerHTML = `
                <p id="no_amenities_to_display_msg" style="color:white; font-size: 14px; text-align: center; margin-bottom: 20px;">
                    You have not added any amenity<i style="color: orangered; margin-left: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                </p>
            `;
            if (data.amenities.length > 0) {

                document.getElementById("logged_in_hotel_amenities_see_all_amenities_btn").style.display = "block";
                document.getElementById("logged_in_hotel_amenities_list").innerHTML = "";
                (async () => {
                    for (let i = 0; i < data.amenities.length; i++) {
                        if (i > 2)
                            break;
                        let amenity = data.amenities[i];
                        document.getElementById("logged_in_hotel_amenities_list").innerHTML += await render_each_hotel_amenity(amenity);
                    }
                    let properties = await get_hotel_buildings(data._id);
                    console.log(properties);
                    if (properties.length > 0) {
                        for (let property of properties) {
                            document.getElementById("logged_in_hotel_edit_amenity_property_form_input").innerHTML += `
                                <option value='${property._id}'>
                                    ${property.city} - ${property.street_address}, ${property.country} 
                                </option>
                            `;
                        }

                    }
                })();
            }

            //cities operating
            document.getElementById("logged_in_hotel_cities_op_list").innerHTML = `
            <p id="no_cities_to_display_msg" style="color:white; font-size: 14px; text-align: center; margin-bottom: 20px;">
                You have not added any city<i style="color: orangered; margin-left: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </p>
            `
            if (data.cities_operating.length > 0) {

                document.getElementById("logged_in_hotel_cities_op_see_all_cities_btn").style.display = "block";
                document.getElementById("logged_in_hotel_cities_op_list").innerHTML = "";
                for (let i = 0; i < data.cities_operating.length; i++) {

                    if (i > 2)
                        break;

                    let city = data.cities_operating[i].city;
                    let country = data.cities_operating[i].country;

                    document.getElementById("logged_in_hotel_cities_op_list").innerHTML += render_each_operation_city(city, country);
                }
            }

            /*/last policy
            if (data.policies_and_restrictions) {
                if (data.policies_and_restrictions.length > 0) {
                    render_logged_in_hotel_last_added_policy(data.policies_and_restrictions[data.policies_and_restrictions.length - 1]);
                }
                else {
                    document.getElementById("dashboard_displayed_last_added_hotel_policy").innerHTML = `
                        <p style="color: white; font-size: 13px; letter-spacing: 1px;">
                        <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        <span style="color: skyblue; font-size: 13px; font-weight: bolder;">
                        You've not added any policies:</span>
                        <br/><br/>
                        Your business policies help inform guests about restrictions and rules.
                        <br/><br/>
                        <span style="color: rgba(255, 255, 255, 0.8); font-size: 14px; font-weight: bolder;">
                        Click on the "click here to manage policies" link below to add new policies
                        </span>
                        </p>
                    `;
                }
            } else {
                document.getElementById("dashboard_displayed_last_added_hotel_policy").innerHTML = `
                    <p style="color: white; font-size: 13px; letter-spacing: 1px;">
                    <i style="color: orangered; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    <span style="color: skyblue; font-size: 13px; font-weight: bolder;">
                    You've not added any policies:</span>
                    <br/><br/>
                    Your business policies help inform guests about restrictions and rules.
                    <br/><br/>
                    <span style="color: rgba(255, 255, 255, 0.8); font-size: 14px; font-weight: bolder;">
                    Click on the "click here to manage policies" link below to add new policies
                    </span>
                    </p>
                `;
            }*/

            //photos 
            if (data.photos.length > 0) {
                let last_photo_url = data.photos.length > 4 ? data.photos[data.photos.length - 5] : data.photos[data.photos.length - 4]
                display_logged_in_hotel_photos(data.photos[data.photos.length - 1], data.photos[data.photos.length - 2],
                    data.photos[data.photos.length - 3], data.photos[data.photos.length - 4], last_photo_url);
            }

            //getting hotel rooms
            get_hotel_rooms(data._id);

            //getting hotel buildings
            //get_hotel_buildings(data._id);

            //getting hotel bookings
            get_hotel_bookings(data._id);

            //getting bills and payments and payouts
            (async () => {
                current_cheap_hotel_wellgo_invoice = await get_all_cheap_hotel_wellgo_invoices(data._id);
                await cheap_hotel_render_initial_wellgo_invoices(current_cheap_hotel_wellgo_invoice);
                cheap_hotel_payouts_object = await get_all_cheap_hotel_payouts(data._id);
                await cheap_hotel_render_initial_payout_information(cheap_hotel_payouts_object);
            })()

        },
        error: err => {
            console.log(err);
        }
    });

}

function add_new_hotel_building(buildig_obj) {
    $.ajax({
        type: "POST",
        url: "/create_new_hotel_property",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(buildig_obj),
        success: res => {
            console.log(res);
        },
        error: err => {
            console.log(err);
        }
    });
}
//add_new_hotel_building();

function add_new_cheap_room(room_obj) {

    return $.ajax({
        type: "POST",
        url: "/create_new_hotel_room",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(room_obj),
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
//add_new_cheap_room();

function update_cheap_room(room_obj, room_id) {

    return $.ajax({
        type: "POST",
        url: "/update_hotel_room/" + room_id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(room_obj),
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

async function render_hotel_rooms(rooms_list, property_id, page = 0, skip = 3) {

    if (rooms_list.length === 0) {
        document.getElementById("dashboard_onload_displayed_rooms").innerHTML = `
            <p style="font-size: 14px; text-align: center; color: white; padding: 20px; border: 1px solid red; margin: 10px;">
                <i style="color: orangered; margin-right: 5px; " class="fa fa-exclamation-triangle"></i>
                You don't have any rooms. <br/><br/>
                No bookings are possible.
                your brand.
                <br/><br/> 
                <span style="color: rgba(255, 255, 255, 0.6); font-weight: bolder;">
                Click on add new room to add a room</span>
            </p>
        `;
        return null;
    }

    let property = await get_and_return_hotel_property_by_id(property_id);

    let property_city = "";
    let property_address_tail = "";

    if (property) {
        property_city = property.city;
        property_address_tail = `${property.street_address}, ${property.country}`;
    }

    let rooms_sublist = rooms_list.filter(each => {
        return each.property_id === property_id
    });

    //generating paginations
    document.getElementById("hero_section_all_property_rooms_paginator").style.display = "none";
    let total_pages = (Math.ceil(rooms_sublist.length / skip));
    if (total_pages > 1) {
        document.getElementById("hero_section_all_property_rooms_paginator").style.display = "flex";
        document.getElementById("hero_section_all_property_rooms_paginator").innerHTML = ""
        for (let pg = 1; pg <= total_pages; pg++) {
            document.getElementById("hero_section_all_property_rooms_paginator").innerHTML += `
                <div id="hero_section_all_property_rooms_paginator_item${pg}" style="background-color: #00244a; cursor: pointer; color: white; border: 1px solid rgba(126, 177, 255, 0.285); width: 30px; height: 30px; border-radius: 100%; margin: 0 2px; display: flex; justify-content: center; align-items: center;">
                    ${pg}
                </div>
            `;
            if (pg === ((page / skip) + 1)) {
                document.getElementById("hero_section_all_property_rooms_paginator_item" + pg).style.backgroundColor = "crimson";
            }
        }
    }

    //console.log(rooms_sublist);
    let all_properties = await get_and_return_hotel_buildings(window.localStorage.getItem("ANDSBZID"));
    let all_props_markup = "";
    if (all_properties.length > 0) {
        for (let prop of all_properties) {
            all_props_markup += `
                <p id="r_prop${prop._id}" style="padding: 10px; letter-spacing: 1px; text-align: center; color: white; cursor: pointer; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.2);">
                    ${prop.city},
                    <span style="color: rgba(255,255,255,0.6); font-size: 12px; letter-spacing: 1px;">
                    ${prop.street_address}, ${prop.country}
                    </span>
                </p>
            `;
        }
    }
    document.getElementById("dashboard_onload_displayed_rooms").innerHTML = `
        <div style="position: relative;">
            <p style="margin-top: 15px; letter-spacing: 1px; text-align: center; color: rgb(205, 218, 168); font-size: 13px; margin-bottom: 5px;">
                ${property_city},
                <span style="color:rgb(127, 144, 175); font-size: 12px; letter-spacing: 1px;">
                    ${property_address_tail}
                </span>
                <span onclick="$('#all_rooms_on_hero_section_props_select').slideDown('fast');">
                    <i class="fa fa-refresh" style="color: rgba(255,255,255,0.5); margin-left: 10px; cursor: pointer;"></i>
                </span>
            </p>
            <div id="all_rooms_on_hero_section_props_select" style="display: none; width: calc(100% - 20px); position: absolute; top: 0; background-color: rgb(41, 66, 88); box-shadow: 1px 2px 3px rgba(0,0,0,0.5); border-radius: 4px; padding: 5px;">
                <p onclick="$('#all_rooms_on_hero_section_props_select').slideUp('fast');"
                    style="position: absolute; box-shadow: 1px 2px 3px rgba(0,0,0,0.4); top: 4px; right: 4px; background-color: crimson; border-radius: 50px; width: 25px; height: 25px; color: white; display: flex; justify-content: center; align-items: center; cursor: pointer;">
                    <i class="fa fa-times" ></i><p>
                ${all_props_markup}
            </div>
        </div>
        <table class="all_rooms_list_table">
            <tbody id="dashboard_onload_displayed_rooms_list">
                <tr>
                    <td>Room</td>
                    <td class="mobile_hidden_elem">Checkin</td>
                    <td class="mobile_hidden_elem">Checkout</td>
                    <td>Price</td>
                    <td>Status</td>
                </tr>
            </tbody>
        </table>
        <p onclick="show_all_hotel_property_rooms('${property_id}')" style="padding: 10px; width: 150px; margin: auto; cursor: pointer; font-size: 13px; text-align: center; letter-spacing: 1px; color: white; ;">
            view all rooms
            <i style="margin-left: 5px; color:rgb(235, 137, 137);" aria-hidden="true" class="fa fa-long-arrow-right"></i>
        </p>
    `;

    let last = page + skip;
    if (last >= rooms_sublist.length) {
        last = (rooms_sublist.length);
    }
    for (let r = page; r < last; r++) {

        let checkin = "N/A";
        let checkout = "N/A";

        let room_price = parseFloat(rooms_sublist[r].price).toFixed(2);

        let room_number = rooms_sublist[r].room_number;

        rooms_sublist[r].booked = false;
        let room_booked = `
            <i aria-hidden="true" class="fa fa-circle" style="color:rgb(88, 236, 51); margin-right: 5px;"></i> 
            vacant
        `;

        //
        let booking = await get_and_return_current_booking_by_room_id(rooms_sublist[r]._id, rooms_sublist[r].room_number);
        for (let y = 0; y < booking.length; y++) {

            for (let j = 0; j < booking[y].all_dates_of_occupancy.length; j++) {

                let the_year = booking[y].all_dates_of_occupancy[j].split("-")[0];
                let the_month = booking[y].all_dates_of_occupancy[j].split("-")[1];
                let the_day = booking[y].all_dates_of_occupancy[j].split("-")[2];

                let the_date = new Date(`${the_year}/${the_month}/${the_day}`);
                let today = new Date();

                //console.log(rooms_sublist[r].room_number,`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`, "-", `${the_date.getDate()}/${the_date.getMonth()}/${the_date.getFullYear()}`)

                if (`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}` === `${the_date.getDate()}/${the_date.getMonth()}/${the_date.getFullYear()}`) {
                    checkin = change_date_from_iso_to_long_date(booking[y].checkin_date);
                    checkout = change_date_from_iso_to_long_date(booking[y].checkout_date);
                    rooms_sublist[r].booked = true;
                }

            }
        }
        if (rooms_sublist[r].booked) {
            room_booked = `
                <i aria-hidden="true" class="fa fa-circle" style="color: crimson; margin-right: 5px;"></i> 
                occupied
            `;
            /*if(booking[0]){
                checkin = change_date_from_iso_to_long_date(booking[0].checkin_date);
                checkout = change_date_from_iso_to_long_date(booking[0].checkout_date);
            }*/
        }

        if (rooms_sublist[r].closed) {
            room_booked = `
                <i aria-hidden="true" class="fa fa-lock" style="color: orangered; margin-right: 5px;"></i> 
                closed
            `;
            /*if(booking[0]){
                checkin = change_date_from_iso_to_long_date(booking[0].checkin_date);
                checkout = change_date_from_iso_to_long_date(booking[0].checkout_date);
            }*/
        }

        document.getElementById("dashboard_onload_displayed_rooms_list").innerHTML += `
            <tr>
                <td>${room_number}</td>
                <td class="mobile_hidden_elem">${checkin}</td>
                <td class="mobile_hidden_elem">${checkout}</td>
                <td>$${room_price}</td>
                <td>
                    ${room_booked}
                </td>
                <td onclick="view_selected_room_full_details('${rooms_sublist[r]._id}');" class="rooms_list_edit_room_icon">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </td>
            </tr>
        `;

        /*if (r >= 2){
            break;
            
        }*/


    }

    if (rooms_sublist.length === 0) {
        document.getElementById("dashboard_onload_displayed_rooms_list").innerHTML = `
            <div style="font-weight: initial; padding: 30px; min-width: 280px; text-align: center; margin-top: 10px; color: white; font-size: 14px; border: 1px solid red; background-color: rgba(0,0,0,0.5);">
                <i class="fa fa-exclamation-triangle" style="margin-right: 5px; color: orangered;" aria-hidden="true"></i>
                no rooms were found!
            </div>
        `
    }

    //property select onclicks
    if (all_properties.length > 0) {
        for (let prop of all_properties) {
            document.getElementById("r_prop" + prop._id).onclick = () => {
                render_hotel_rooms(rooms_list, prop._id, 0, 3);
            }
        }
    }

    //pagination onclicks
    if (total_pages > 1) {
        for (let pg = 1; pg <= total_pages; pg++) {
            document.getElementById("hero_section_all_property_rooms_paginator_item" + pg).onclick = () => {
                render_hotel_rooms(rooms_list, property_id, ((pg - 1) * skip), skip);
            }
        }
    }

}

//functions after loading hotel
function get_hotel_rooms(hotel_id) {
    $.ajax({
        type: "GET",
        url: "/get_cheap_hotel_rooms/" + hotel_id,
        success: res => {
            //console.log(res);
            render_hotel_rooms(res, res[0].property_id);
        },
        error: err => {
            console.log(err);
        }
    });
}

//function that gets and return all rooms
function get_and_return_rooms(hotel_id) {
    return $.ajax({
        type: "GET",
        url: "/get_cheap_hotel_rooms/" + hotel_id,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            return err;
        }
    });
}

//getting cheap hotel properties
function get_hotel_buildings(hotel_id) {
    return $.ajax({
        type: "GET",
        url: "/get_cheap_hotel_properties/" + hotel_id,
        success: res => {
            //console.log(res);
            return res
        },
        error: err => {
            console.log(err);
            return err
        }
    });
}

function get_and_return_hotel_buildings(hotel_id) {
    return $.ajax({
        type: "GET",
        url: "/get_cheap_hotel_properties/" + hotel_id,
        success: res => {
            return res;
        },
        error: err => {
            return err;
        }
    });
}

async function render_recent_hotel_booking(recent_booking) {

    let property = await get_and_return_hotel_property_by_id(recent_booking.property_id);
    let property_city = property.city;
    let property_country = property.country;
    let property_street = property.street_address;

    let rooms = recent_booking.rooms;
    let booking_checkin_date = recent_booking.checkin_date;
    let booking_checkout_date = recent_booking.checkout_date;
    let price_paid = recent_booking.price_paid;
    let room_guests = recent_booking.guests;

    let room_number = rooms[0].number;
    let room_guests_markup = "";

    let other_rooms_included = "";

    if (rooms.length > 1) {
        other_rooms_included = "<p style='margin: 10px 0; font-size: 12px; text-align: center; color: white; letter-spacing: 1px;'> Rooms Included: ";

        for (let r = 0; r < rooms.length; r++) {
            other_rooms_included += "<span style='color: orangered; font-size: 12px;'>" + rooms[r].number + "</span>, ";
        }

        other_rooms_included = other_rooms_included.substring(0, other_rooms_included.length - 2);

        other_rooms_included += "</p>"
    }

    for (let g = 0; g < room_guests.length; g++) {
        room_guests_markup += `
            <div style="padding-bottom: 10px;">
                <p style="letter-spacing: 1px; color: slateblue; font-size: 13px; margin-bottom: 5px;">
                <i class="fa fa-check" aria-hidden="true"></i>
                    <span style="letter-spacing: 1px; margin-left: 5px; font-size: 15px; color:rgb(245, 196, 151);">
                        ${room_guests[g].first_name} ${room_guests[g].last_name}</span>
                </p>
                <p style="margin-left: 30px; letter-spacing: 1px; font-size: 13px; margin-top: 5px; color:rgb(245, 196, 151);">
                        <span style="font-size: 12px; color: white;">DOB:</span> ${change_date_from_iso_to_long_date(room_guests[g].DOB)}, 
                    </p>
                    <p style="margin-left: 30px; letter-spacing: 1px; font-size: 13px; margin-top: 5px; color:rgb(245, 196, 151);"> 
                        <span style="font-size: 12px; color: white;">Gender:</span> ${room_guests[g].gender}
                    </p>
            </div>
        `
    }

    document.getElementById("logged_in_hotel_recently_booked_rooms_list").innerHTML = `
        <div style="padding: 10px; border-radius: 4px; background-color:rgba(41, 66, 88, 0.555); max-width: 500px; margin: auto;">
            <p style="margin: 15px; color:rgb(209, 84, 0); font-size: 14px; font-weight: bolder;">Last Booked</p>
            <p style="letter-spacing: 1px; color: white; font-size: 15px; text-align: center; font-weight: bolder;">
                Room ${room_number}:
                <span style="letter-spacing: 1px; margin-left: 10px; font-size: 14px; color:rgb(168, 195, 218);">
                    Booked
                    <i style="color:rgb(137, 235, 174); margin-left: 5px;" aria-hidden="true" class="fa fa-check"></i>
                </span>
            </p>
            ${other_rooms_included}
            <p style="margin-top: 5px; letter-spacing: 1px; text-align: center; color: rgb(205, 218, 168); font-size: 13px; margin-bottom: 5px;">
                ${property_city}
                <span style="color:rgb(127, 144, 175); font-size: 12px; letter-spacing: 1px;">
                    - ${property_street} (${property_country})
                </span>
            </p>
            <div style="margin-top: 20px;">
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Checkin:
                    <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                        ${change_date_from_iso_to_long_date(booking_checkin_date)}</span>
                </p>
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Checkout:
                    <span style="letter-spacing: 1px; margin-left: 10px; font-size: 13px; color:rgb(168, 195, 218);">
                        ${change_date_from_iso_to_long_date(booking_checkout_date)}</span>
                </p>
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Price paid:
                    <span style="letter-spacing: 1px; margin-left: 10px; font-size: 15px; color:rgb(245, 196, 151);">
                        $${parseFloat(price_paid).toFixed(2)}</span>
                </p>
                <p style="letter-spacing: 1px; margin-top: 15px; margin-bottom: 10px; font-size: 13px; color:rgb(127, 144, 175); font-weight: bolder;">
                    Room Guest(s)</p>
                    ${room_guests_markup}
            </div>
            <div style="border-radius: 4px; background-color: rgb(0, 16, 27); border: 1px solid rgba(255,255,255,0.2); display: flex; margin: 10px 0; overflow: hidden;" >
                <p onclick="toggle_show_booked_rooms();" style="width: calc(50% - 1px); border-right: 1px solid rgba(255,255,255,0.2); text-align: center; color: white; font-size: 13px; padding: 10px; cursor: pointer;">
                    See bookings
                </p>
                <p onclick="continue_room_reservation();" style="width: 50%; text-align: center; background-color: rgb(4, 35, 47); color: white; font-size: 13px; padding: 10px; cursor: pointer">
                    Book New Guest
                </p>
            </div>
            
            
        </div>
    `;
}

function get_hotel_bookings(hotel_id) {
    $.ajax({
        type: "GET",
        url: "/get_listed_property_room_bookings/" + hotel_id,
        success: res => {
            //console.log(res);
            let recent_booking = res[res.length - 1];
            if (recent_booking) {
                render_recent_hotel_booking(recent_booking);
            } else {
                document.getElementById("logged_in_hotel_recently_booked_rooms_list").innerHTML = `
                    <div style="padding: 10px; border-radius: 4px; background-color:rgba(41, 66, 88, 0.555); max-width: 500px; margin: auto;">
                        <p style="margin: 15px; color:rgb(209, 84, 0); font-size: 14px; font-weight: bolder;">Last Booked</p>
                        <p style="letter-spacing: 1px; color: white; font-size: 15px; text-align: center; font-weight: bolder;">
                            <span style="letter-spacing: 1px; margin-left: 10px; font-size: 14px; color:rgb(168, 195, 218);">
                                <i style="color:red; margin-right: 5px;" aria-hidden="true" class="fa fa-exclamation-triangle"></i>
                                No bookings yet to show
                            </span>
                        </p>
                        <p style="color: white; margin: 20px 0; font-size: 14px; text-align: center;">
                            Oops! We haven't found any bookings yet to show here.
                            If you expect to have bookings, then please make sure 
                            that your account is active or verified.
                        </p>
                        <p onclick="continue_room_reservation();" style="text-align: center; color: white; font-size: 13px; padding: 10px; border-radius: 4px; background-color: rgb(0, 16, 27); border: 1px solid rgba(255,255,255,0.2); cursor: pointer; margin: 10px 0;">
                            Book New Guest
                        </p>
                    </div>
                `;
            }
        },
        error: err => {
            console.log(err);
        }
    });
}

function get_and_return_current_booking_by_room_id(room_id, room_number) {

    return $.ajax({
        type: "GET",
        url: "/get_bookings_by_room_id/" + room_id + "/" + room_number,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            //console.log(err);
            return err;
        }
    });

}

function get_and_return_hotel_property_by_id(property_id) {
    return $.ajax({
        type: "GET",
        url: "/get_property_by_id/" + property_id,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            //console.log(err);
            return err;
        }
    });
}

function get_and_return_hotel_room_by_id(id) {
    return $.ajax({
        type: "GET",
        url: "/get_room_by_id/" + id,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            //console.log(err);
            return err;
        }
    });
}

function get_and_return_hotel_guest_by_id(hotel_brand_id, property_id, guest_id) {
    return $.ajax({
        type: "GET",
        url: "/get_and_return_guest_by_id/" + hotel_brand_id + "/" + property_id + "/" + guest_id,
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

function add_new_cities_op(city, hotel_id) {
    return $.ajax({
        type: "POST",
        url: "/add_new_city/" + hotel_id + "?new_city=" + city,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            //console.log(err);
            return err;
        }
    });
}

function remove_city_op(elem_id, city, hotel_id) {
    $.ajax({
        type: "DELETE",
        url: "/remove_city_op/" + hotel_id + "?q_city=" + city,
        success: res => {
            //console.log(res);
            toggle_hide_show_anything(elem_id);
        },
        error: err => {
            console.log(err);
        }
    });
}

function all_cities_op_remove_each_city_op(elem_id_param, city_param) {
    remove_city_op(elem_id_param, city_param, window.localStorage.getItem("ANDSBZID"));
}

function get_all_cities(hotel_id) {
    return $.ajax({
        type: "GET",
        url: "/get_all_cities/" + hotel_id,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err
        }
    });
}

function add_new_policy(type_param, description_param, property_id, brand_id=localStorage.getItem("ANDSBZID")) {
    return $.ajax({
        type: "POST",
        url: "/add_new_cheap_hotel_policy/"+brand_id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            type: type_param,
            description: description_param,
            property: property_id
        }),
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

function render_all_policies(policies){
    if (policies) {
        if (policies.length > 0) {
            for (let i = 0; i < policies.length; i++) {
                document.getElementById("all_hotel_policies_list").innerHTML = all_policies_return_each_policy_markup(i, policies[i]);
            }
        } else {
            document.getElementById("all_hotel_policies_list").innerHTML = `
                <p style="margin-top: 10px; color: white; background-color: rgba(0,0,0,0.5); border: 1px solid red; padding: 30px 10px; text-align: center;">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true" style="margin-right: 5px; color: red;" ></i>
                    You don't have any policies
                </p>
            `;
        }
    }
}

function all_policies_delete_policty_item(type, description_p, property, brand_id=localStorage.getItem("ANDSBZID")){
    let description=description_p.replaceAll("@apostrophe@", "'");
    return $.ajax({
        type: "POST",
        url: "/delete_cheap_hotel_policy_item/"+brand_id,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            type, description, property
        }),
        success: res => {
            return res;
        },
        error: err => {
            return err;
        }
    });
}

function get_all_policies(hotel_id) {
    return $.ajax({
        type: "GET",
        url: "/get_all_policies/" + hotel_id,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}

async function render_all_logged_in_hotel_cities() {

    document.getElementById("all_cities_list").innerHTML = ``;
    let all_cities = await get_all_cities(window.localStorage.getItem("ANDSBZID"));

    for (let i = 0; i < all_cities.length; i++) {
        document.getElementById("all_cities_list").innerHTML += all_cities_return_each_city_markup(all_cities[i]);
    }

}

async function add_new_hotel_policy_onclick(){
    let type = document.getElementById("logged_in_hotel_all_policies_type_select").value;
    let property = document.getElementById("logged_in_hotel_all_policies_property_select").value;
    let description = document.getElementById("logged_in_hotel_all_policies_description_input").value;
    //description=description.replaceAll("'","@apostrophe@");
    if(description.trim()===""){
        document.getElementById("logged_in_hotel_all_policies_description_input").style.border="2px solid red";
        return;
    }
    let all_policies = await add_new_policy(type, description.trim(), property);
    render_all_policies(all_policies);
    toggle_show_finish_add_new_policy_form();
}

function all_cities_return_each_city_markup(city_param) {

    let city_for_ids = city_param.city.replaceAll(" ", "_").trim();
    let country_for_ids = city_param.country.replaceAll(" ", "_").trim();

    return `
        <div id="all_cities_logged_in_hote_${city_for_ids}_${country_for_ids}_city_Op" class="logged_in_hotel_amenity" style="background-color: rgba(0,0,0,0.5); padding: 5px;border-bottom: 1px solid rgba(255,255,255,0.2)">
            <p>
                <span style="font-size: 14px; color: white;">
                    <i style="color: rgb(59, 116, 184); margin-right: 5px;" class="fa fa-dot-circle-o" aria-hidden="true"></i>
                    ${city_param.city}, ${city_param.country}
                </span>
                <span onclick="toggle_hide_show_anything('all_cities_delete_${city_for_ids}_${country_for_ids}_city_confirm_dialog')" class="logged_in_hotel_amenity_edit_btns" style="padding-left: 20px;">
                    <i style="color: rgb(250, 122, 122);" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </p>
            <div id="all_cities_delete_${city_for_ids}_${country_for_ids}_city_confirm_dialog" style="position: initial; margin: 10px 0; padding: 0; margin-bottom: 20px; background: none; width: 100%;" class="confirm_delete_dialog">
                <p style="font-size: 13px; display: block; letter-spacing: 1px; text-align: center; margin-bottom: 10px;">
                    Are you sure</p>
                <div style="margin-top: 10px; display: flex; flex-direction: row !important; border: 1px solid rgba(255,255,255,0.2);border-radius: 4px;">
                    <div onclick="all_cities_op_remove_each_city_op('all_cities_logged_in_hote_${city_for_ids}_${country_for_ids}_city_Op', '${city_param.city}, ${city_param.country}');" style="cursor: pointer; width: 50%; border-top-left-radius: 4px; border-bottom-left-radius: 4px; background-color: brown; color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Delete
                    </div>
                    <div onclick="toggle_hide_show_anything('all_cities_delete_${city_for_ids}_${country_for_ids}_city_confirm_dialog')" style="cursor: pointer; width: 50%; border-top-right-radius: 4px; border-bottom-right-radius: 4px; background-color: rgba(41, 66, 88, 0.555); color: white; font-size: 13px; text-align: center; padding: 10px 0;">
                        Cancel
                    </div>
                </div>
            </div>
        </div>`;
}

function room_booking_enforce_child_age_input(input_id) {
    if (document.getElementById(input_id).value > 17) {
        document.getElementById(input_id).value = 17;
    }
}

function room_booking_enforce_adult_age_input(input_id) {
    if (document.getElementById(input_id).value < 18) {
        document.getElementById(input_id).value = 18;
    }
}

function update_info_item(update_type, new_info, hotel_brand_id) {

    let endpoint_url = '';
    let q_param = '';

    switch (update_type) {
        case "email":
            endpoint_url = "/update_cheap_hotel_email/";
            q_param = "new_email";
            break;
        case "mobile":
            endpoint_url = "/update_cheap_hotel_mobile/";
            q_param = "new_mobile";
            break;
        case "web_url":
            endpoint_url = "/update_cheap_hotel_web_url/";
            q_param = "new_url";
            break;
        case "fax":
            endpoint_url = "/update_cheap_hotel_fax/";
            q_param = "new_fax";
            break;
        case "avg_price":
            endpoint_url = "/update_cheap_hotel_avg_price/";
            q_param = "new_avg_price";
            break;
        case "description":
            endpoint_url = "/update_cheap_hotel_description/";
            q_param = "new_description";
            break;
        case "office_location":
            endpoint_url = "/update_cheap_hotel_main_office_location/";
            q_param = "new_office_location";
            break;
        case "name":
            endpoint_url = "/update_cheap_hotel_name/";
            q_param = "new_name";
            break;
        default:
            endpoint_url = "/update_cheap_hotel_name/";
            q_param = "new_name";
    }
    console.log(endpoint_url + hotel_brand_id + "?" + q_param + "=" + new_info)
    return $.ajax({
        type: "POST",
        url: (endpoint_url + hotel_brand_id + "?" + q_param + "=" + new_info),
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });

}

function get_and_return_cheap_hotel_rooms_by_property_id(property_id) {
    return $.ajax({
        type: "GET",
        url: "/get_cheap_hotel_rooms_by_property_id/" + property_id,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err
        }
    });
}

$(document).ready(() => {
    get_logged_in_hotel_infor();
});

function get_logged_in_hotel_all_photos(hotel_id) {
    return $.ajax({
        type: "GET",
        url: "/get_all_cheap_hotel_photos/" + hotel_id,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    })
}

//photo uploads functions
async function cheap_hotel_preview_image(event, elem) {

    var output = document.getElementById(elem);

    if (event.target.value !== "") {
        //file url looks like "https://anidaso-img.s3.amazonaws.com/HotelEfyaSplending_hotel_one_seed2.jpg_0"
        //"protocol://bucket_name.s3.amazonaws.com/file_name"
        try {
            let s3_photo_url = cheap_hotel_room.photo_url.split("/");
            let s3_photot_file_name = s3_photo_url[s3_photo_url.length - 1];
            console.log(s3_photot_file_name);
            await delete_s3_file(s3_photot_file_name);
            output.style.backgroundImage = 'none';
            output.style.backgroundColor = 'rgba(0,0,0,0.4)';
        } catch (e) {
            console.log("aws s3 photo url from post data can't be read or its file deletion from s3 bucket failed")
            console.log(e);
        }
    }

    var reader = new FileReader();
    reader.onload = function () {

        if (document.getElementById("add_room_form_room_number_input").value === "") {
            show_prompt_to_user(
                `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
                NOT ALLOWED`,
                `please enter room  number first`);
            return null;
        }

        output.style.backgroundImage = `url('${reader.result}')`;
    }
    reader.readAsDataURL(event.target.files[0]);
}

async function upload_photo_to_s3(file_input_Id, hotel_id, unique_name) {

    const files = document.getElementById(file_input_Id).files;
    const file = files[0];

    if (file == null) {

        try {
            let s3_photo_url = cheap_hotel_room.photo_url.split("/");
            let s3_photot_file_name = s3_photo_url[s3_photo_url.length - 1];
            console.log(s3_photot_file_name);
            await delete_s3_file(s3_photot_file_name);

            document.getElementById("add_room_form_room_photo_input_btn").style.backgroundImage = 'none';
            document.getElementById("add_room_form_room_photo_input_btn").style.backgroundColor = 'rgba(0,0,0,0.4)';
        } catch (e) {
            console.log("aws s3 photo url from post data can't be read or its file deletion from s3 bucket failed")
            console.log(e);
        }

        console.log('no file selected.');
        //document.getElementById("add_room_form_room_photo_input_btn").style.backgroundImage = "none";
        return {
            success: false,
            msg: "no file selected."
        }

    }
    //getSignedRequest(file);

    return $.ajax({
        type: "GET",
        url: `/upload_picture_sign_s3?file-name=${hotel_id}_${unique_name}_${file.name}&file-type=${file.type}`,
        success: res_data => {

            //const response = JSON.parse(xhr.responseText);
            const response = res_data;
            console.log(res_data);

            cheap_hotel_room.photo_url = response.url;
            console.log(cheap_hotel_room);

            uploadFile(file, response.signedRequest).then(res_data2 => {
                console.log(res_data2);
                return res_data2;

            }).catch(err => {
                console.log(err);
                return err
            });
        },
        error: err => {
            console.log('could not get signed URL.');
            return {
                success: false,
                error: err
            }
        }
    });

}

//this function uploads image file to AWS s3
async function uploadFile(file, signedRequest) {

    document.getElementById("add_room_form_room_photo_input_label").style.display = "none";
    document.getElementById("add_room_form_room_photo_upload_loader").style.display = "block";

    return $.ajax({
        type: "PUT",
        url: signedRequest,
        contentType: file.type,
        processData: false,
        data: file,
        success: res => {

            //console.log(res);
            console.log("file upload completed");

            document.getElementById("add_room_form_room_photo_input_label").style.display = "flex";
            document.getElementById("add_room_form_room_photo_upload_loader").style.display = "none";

            return {
                success: true
            }
        },
        error: err => {

            console.log('could not upload file.');


            document.getElementById("add_room_form_room_photo_input_label").style.display = "flex";
            document.getElementById("add_room_form_room_photo_upload_loader").style.display = "none";

            //document.getElementById("book_cheap_hotel_register_new_hotel_loader_animation").style.display = "none";
            //book_cheap_hotel_register_new_hotel_button.style.display = "block";

            //document.getElementById("add_room_form_room_photo_input_btn").style.backgroundImage = "none";

            return {
                success: false,
                error: err
            }
        }

    });
}

//function to delete s3 photo
function delete_s3_file(s3_file_name) {
    $.ajax({
        type: "DELETE",
        url: `./delete_file_from_s3?file_name=${s3_file_name}`,
        success: res => {
            console.log(res)
        },
        error: err => {
            console.log(err);
        }
    });
}

document.getElementById("add_room_form_room_photo_input").addEventListener("change", () => {

    if (document.getElementById("add_room_form_room_number_input").value === "") {
        return null;
    }

    upload_photo_to_s3("add_room_form_room_photo_input", window.localStorage.getItem("ANDSBZID"),
        document.getElementById("add_room_form_room_number_input").value).then(() => {
            //do nothing here for now
        });

});

var add_room_form_properties_select = document.getElementById("add_room_form_properties_select");
var add_room_form_room_number_input = document.getElementById("add_room_form_room_number_input");
var add_room_form_room_type_select = document.getElementById("add_room_form_room_type_select");
var add_room_form_bed_type_select = document.getElementById("add_room_form_bed_type_select");
var add_room_wifi_amen_check = document.getElementById("add_room_wifi_amen_check");
var add_room_cable_amen_check = document.getElementById("add_room_cable_amen_check");
var add_room_other_amen_check = document.getElementById("add_room_other_amen_check");
var add_room_form_room_photo_input = document.getElementById("add_room_form_room_photo_input");
var add_room_form_room_price_input = document.getElementById("add_room_form_room_price_input");
var add_room_form_room_description_input = document.getElementById("add_room_form_room_description_input");
var add_room_form_room_cancellation_period_input = document.getElementById("add_room_form_room_cancellation_period_input");
var add_room_form_room_cancellation_percentage_select = document.getElementById("add_room_form_room_cancellation_percentage_select");
var add_room_form_num_of_adults_input = document.getElementById("add_room_form_num_of_adults_input");
var add_room_form_num_of_children_input = document.getElementById("add_room_form_num_of_children_input");
var add_room_form_room_photo_input_btn = document.getElementById("add_room_form_room_photo_input_btn");

function reset_all_add_room_inputs() {
    global_is_room_for_update = false;
    //add_room_form_properties_select.value  = "";
    add_room_form_room_number_input.value = "";
    //add_room_form_room_type_select.value = "";
    //add_room_form_bed_type_select.value = "";
    add_room_wifi_amen_check.checked = false;
    add_room_cable_amen_check.checked = false;
    add_room_other_amen_check.checked = false;
    add_room_form_room_photo_input.value = "";
    add_room_form_room_photo_input_btn.style.backgroundImage = "none";
    add_room_form_room_price_input.value = "";
    add_room_form_room_description_input.value = "";
    add_room_form_room_cancellation_period_input.value = 0;
    add_room_form_room_cancellation_percentage_select.value = 10;
    add_room_form_num_of_adults_input.value = 1;
    add_room_form_num_of_children_input.value = 0;
}

function collect_all_add_new_room_inputs() {

    cheap_hotel_room.amenities = [];

    if (add_room_wifi_amen_check.checked) {
        cheap_hotel_room.amenities.push("Free Wifi")
    }
    if (add_room_cable_amen_check.checked) {
        cheap_hotel_room.amenities.push("Cable Tv")
    }
    if (add_room_other_amen_check.checked) {
        cheap_hotel_room.amenities.push("Other")
    }

    cheap_hotel_room.property_id = add_room_form_properties_select.value;
    cheap_hotel_room.hotel_brand_id = window.localStorage.getItem("ANDSBZID");
    cheap_hotel_room.room_number = add_room_form_room_number_input.value;
    cheap_hotel_room.closed = false;
    cheap_hotel_room.booked = false;
    cheap_hotel_room.room_type = add_room_form_room_type_select.value;
    cheap_hotel_room.bed_type = add_room_form_bed_type_select.value;
    cheap_hotel_room.guest_capacitance.adults = add_room_form_num_of_adults_input.value;
    cheap_hotel_room.guest_capacitance.children = add_room_form_num_of_children_input.value;
    cheap_hotel_room.price = add_room_form_room_price_input.value;
    cheap_hotel_room.description = add_room_form_room_description_input.value;
    cheap_hotel_room.next_available_date = "";
    cheap_hotel_room.next_available_time = "";
    cheap_hotel_room.cancellation_policy.time_period = add_room_form_room_cancellation_period_input.value;
    cheap_hotel_room.cancellation_policy.percentage = add_room_form_room_cancellation_percentage_select.value;
    //cheap_hotel_room.photo_url= "";
    cheap_hotel_room.cancellation_requests = [];
    cheap_hotel_room.cancellation_history = [];

    return cheap_hotel_room;

}

async function edit_hotel_room_func(room_id) {

    toggle_show_add_room_pane();
    global_is_room_for_update = true;
    global_room_update_id = room_id;

    let room_to_update = await get_and_return_hotel_room_by_id(room_id)

    /*cheap_hotel_room = {
        hotel_brand_id: "6063dd3fb6dfe50bc800dd5f",
        closed: "false",
        booked: "false",
        next_available_date: "3-5-2020",
        next_available_time:  "10:15",
        cancellation_requests: []
    };*/

    if (room_to_update.amenities.includes("Free Wifi")) {
        add_room_wifi_amen_check.checked = true;
    }
    if (room_to_update.amenities.includes("Cable Tv")) {
        add_room_cable_amen_check.checked = true;
    }
    if (room_to_update.amenities.includes("Other")) {
        add_room_other_amen_check.checked = true;
    }

    add_room_form_properties_select.value = room_to_update.property_id;
    add_room_form_room_number_input.value = room_to_update.room_number;
    add_room_form_room_type_select.value = room_to_update.room_type;
    add_room_form_bed_type_select.value = room_to_update.bed_type;
    add_room_form_room_price_input.value = room_to_update.price;
    add_room_form_room_description_input.value = room_to_update.description;
    add_room_form_num_of_adults_input.value = room_to_update.guest_capacitance.adults;
    add_room_form_num_of_children_input.value = room_to_update.guest_capacitance.children;
    add_room_form_room_cancellation_period_input.value = room_to_update.cancellation_policy.time_period
    add_room_form_room_cancellation_percentage_select.value = room_to_update.cancellation_policy.percentage
    cheap_hotel_room.photo_url = room_to_update.photo_url;
    add_room_form_room_photo_input_btn.style.backgroundImage = 'url(' + room_to_update.photo_url + ')';


}

async function save_room_new_room(type, room_id) {

    if (add_room_form_properties_select.value === "") {
        add_room_form_properties_select.focus();
        add_room_form_properties_select.placeholder = "please select hotel property";
    } else if (add_room_form_room_number_input.value === "") {
        add_room_form_room_number_input.focus();
        add_room_form_room_number_input.placeholder = "please enter room number";
    } else if (add_room_form_room_type_select.value === "") {
        add_room_form_room_type_select.focus();
        add_room_form_room_type_select.placeholder = "please select room type";
    } else if (add_room_form_room_price_input.value === "") {
        add_room_form_room_price_input.focus();
        add_room_form_room_price_input.placeholder = "please enter room number";
    } else if (add_room_form_room_description_input.value === "") {
        add_room_form_room_description_input.focus();
        add_room_form_room_description_input.placeholder = "please enter room description";
    } else if (add_room_form_room_cancellation_period_input.value === "") {
        add_room_form_room_cancellation_period_input.focus();
        add_room_form_room_cancellation_period_input.placeholder = "please enter allowed cancellation period";
    } else if (add_room_form_room_cancellation_percentage_select.value === "") {
        add_room_form_room_cancellation_percentage_select.focus();
        add_room_form_room_cancellation_percentage_select.placeholder = "please select cancellation percentage";
    } else if (add_room_form_room_photo_input.value === "" && !global_is_room_for_update) {
        show_prompt_to_user(
            `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-exclamation-triangle'></i>
            SUCCESS`,
            `photo added!`, "success");
        add_room_form_room_photo_input.click();
    } else {
        if (type === "update") {
            let new_room_obj = await collect_all_add_new_room_inputs();
            let returned_added_room = await update_cheap_room(new_room_obj, room_id);
            console.log(returned_added_room);
            show_prompt_to_user(`
                <i style="margin-right: 10px; font-size: 20px; color: rgb(0, 177, 139);" class="fa fa-check" aria-hidden="true"></i>
                 Update Finished`,
                "room " + returned_added_room.data.room_number + " has been updated successfully", "success");
            reset_all_add_room_inputs();
        } else {
            let new_room_obj = await collect_all_add_new_room_inputs();
            let returned_added_room = await add_new_cheap_room(new_room_obj);
            console.log(returned_added_room);
            show_prompt_to_user(`
                <i style="margin-right: 10px; font-size: 20px; color: rgb(0, 177, 139);" class="fa fa-check" aria-hidden="true"></i>
                 Room Added`,
                "room " + returned_added_room.data.room_number + " has been added successfully", "success");
            reset_all_add_room_inputs();
        }

    }

}

document.getElementById("add_room_form_save_room_btn").addEventListener("click", e => {
    if (global_is_room_for_update) {
        save_room_new_room("update", global_room_update_id);
    } else {
        save_room_new_room("", "");
    }
});

var add_hotel_property_form_city_country_select = document.getElementById("add_hotel_property_form_city_country_select");
var add_hotel_property_form_street_address_input = document.getElementById("add_hotel_property_form_street_address_input");
var add_hotel_property_form_town_input = document.getElementById("add_hotel_property_form_town_input");
var add_hotel_property_form_zipcode_input = document.getElementById("add_hotel_property_form_zipcode_input");
var add_property_wifi_amen_check = document.getElementById("add_property_wifi_amen_check");
var add_property_cable_amen_check = document.getElementById("add_property_cable_amen_check");
var add_property_other_amen_check = document.getElementById("add_property_other_amen_check");
var add_hotel_property_form_description_input = document.getElementById("add_hotel_property_form_description_input");
//var = document.getElementById("");

function reset_add_new_building_inputs() {
    //add_hotel_property_form_city_country_select.value = "";
    add_hotel_property_form_town_input.value = "";
    add_hotel_property_form_street_address_input.value = "";
    add_hotel_property_form_zipcode_input.value = "";
    add_hotel_property_form_description_input.value = "";
}

function collect_add_hotel_property_inputs_data() {

    let prop_city = add_hotel_property_form_city_country_select.value.split(",")[0].trim();
    let prop_country = add_hotel_property_form_city_country_select.value.split(",")[1].trim();
    let prop_town = add_hotel_property_form_town_input.value.trim();
    let prop_street = add_hotel_property_form_street_address_input.value.trim();
    let prop_zipcode = add_hotel_property_form_zipcode_input.value.trim();
    let prop_description = add_hotel_property_form_description_input.value.trim();

    cheap_hotel_building.hotel_brand_id = window.localStorage.getItem("ANDSBZID");
    cheap_hotel_building.full_location_address = `${prop_street}, ${prop_town}, ${prop_city}, ${prop_country}`;
    cheap_hotel_building.city = prop_city;
    cheap_hotel_building.country = prop_country;
    cheap_hotel_building.zipcode = prop_zipcode;
    cheap_hotel_building.street_address = prop_street;
    cheap_hotel_building.town = prop_town;
    cheap_hotel_building.description = prop_description,
        cheap_hotel_building.amenities = ["Free Wifi", "Cable", "Other"]

    return cheap_hotel_building;
}

async function save_new_property() {
    if (add_hotel_property_form_street_address_input.value === "") {
        add_hotel_property_form_street_address_input.focus();
        add_hotel_property_form_street_address_input.placeholder = "please enter street address";
    } else if (add_hotel_property_form_town_input.value === "") {
        add_hotel_property_form_town_input.focus();
        add_hotel_property_form_town_input.placeholder = "please enter town";
    } else if (add_hotel_property_form_zipcode_input.value === "") {
        add_hotel_property_form_zipcode_input.focus();
        add_hotel_property_form_zipcode_input.placeholder = "please enter zipcode";
    } else if (add_hotel_property_form_description_input.value === "") {
        add_hotel_property_form_description_input.focus();
        add_hotel_property_form_description_input.placeholder = "please enter description";
    } else {
        let new_building = await collect_add_hotel_property_inputs_data();
        let response = await add_new_hotel_building(new_building);
        show_prompt_to_user(
            `<i style='margin-right: 5px; color: rgba(255,255,255,0.5);' class='fa fa-check'></i>
            SUCCESS`,
            `new building added successfully!`, "success");
        reset_add_new_building_inputs();
    }
}

function get_bookings_using_guest_id(guest_id, property_id, brand_id) {
    return $.ajax({
        type: "GET",
        url: `/get_cheap_hotel_bookings_by_guest/${guest_id}/${property_id}/${brand_id}`,
        success: res => {
            //console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return err;
        }
    });
}
//console.log(get_bookings_using_guest_id("6329e2f4deec1e00043fa501", "607304a562a84645bccdf40b", "6063dd3fb6dfe50bc800dd5f"));

document.getElementById("add_hotel_property_form_save_btn").addEventListener("click", e => {
    save_new_property();
})