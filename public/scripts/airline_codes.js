//IATA code – MAWB	IATA code	IATA airlines
var airline_codes = [
    {number: 1, code: "AA", name: "American Airlines"},
    {number: 2, code: "2G", name: "CargoItalia"},
    {number: 5, code: "CO", name: "Continental Airlines"},
    {number: 6, code: "DL", name: "Delta Air Lines"},
    {number: 12, code: "NW", name: "Northwest Airlines"},
    {number: 14, code: "AC", name: "Air Canada"},
    {number: 16, code: "UA", name: "United Airlines Cargo"},
    {number: 18, code: "CP", name: "Canadian Airlines Int´l"},
    {number: 20, code: "LH", name: "Lufthansa Cargo AG"},
    {number: 23, code: "FX", name: "Fedex"},
    {number: 27, code: "AS", name: "Alaska Airlines"},
    {number: 37, code: "US", name: "USAirways"},
    {number: 42, code: "RG", name: "VARIG Brazilian Airlines"},
    {number: 43, code: "KA", name: "Dragonair"},
    {number: 45, code: "LA", name: "LAN Chile"},
    {number: 47, code: "TP", name: "TAP Air Portugal"},
    {number: 84, code: "CY", name: "Cyprus Airways"},
    {number: 50, code: "OA", name: "Olympic Airways"},
    {number: 53, code: "EI", name: "Aer Lingus Cargo"},
    {number: 55, code: "AZ", name: "Alitalia"},
    {number: 57, code: "AF", name: "Air France"},
    {number: 58, code: "IC", name: "Indian Airlines"},
    {number: 61, code: "HM", name: "Air Seychelles"},
    {number: 64, code: "OK", name: "Czech Airlines"},
    {number: 65, code: "SV", name: "Saudi Arabian Airlines"},
    {number: 70, code: "RB", name: "Syrian Arab Airlines"},
    {number: 71, code: "ET", name: "Ethiopian Airlines"},
    {number: 72, code: "GF", name: "Gulf Air"},
    {number: 74, code: "KL", name: "KLM Cargo"},
    {number: 75, code: "IB", name: "Iberia"},
    {number: 76, code: "ME", name: "Middle East Airlines"},
    {number: 77, code: "MS", name: "Egyptair"},
    {number: 79, code: "PR", name: "Philippine Airlines"},
    {number: 57, code: "AF", name: "Air France"},
    {number: 80, code: "LO", name: "LOT Polish Airlines"},
    {number: 81, code: "QF", name: "Qantas Airways"},
    {number: 82, code: "SN", name: "Brussels Airlines"},
    {number: 83, code: "SA", name: "South African Airways"},
    {number: 86, code: "NZ", name: "Air New Zealand"},
    {number: 90, code: "IT", name: "Kingfisher Airlines"},
    {number: 93, code: "KD", name: "KD Avia"},
    {number: 96, code: "IR", name: "Iran Air"},
    {number: 98, code: "AI", name: "Air India"},
    {number: 105, code: "AY", name: "Finnair"},
    {number: 106, code: "BW", name: "Caribbean Airlines"},
    {number: 108, code: "FI", name: "Icelandair"},
    {number: 112, code: "CK", name: "China Cargo Airlines"},
    {number: 114, code: "LY", name: "EL AL"},
    {number: 115, code: "JU", name: "JAT Airways"},
    {number: 117, code: "SK", name: "SAS-Scandinavian Airlines System"},
    {number: 118, code: "DT", name: "TAAG Angola Airlines"},
    {number: 119, code: "LM", name: "Air ALM"},
    {number: 124, code: "AH", name: "Air Algerie"},
    {number: 125, code: "BA", name: "British Airways"},
    {number: 126, code: "GA", name: "Garuda Indonesia"},
    {number: 129, code: "MP", name: "Martinair Cargo"},
    {number: 131, code: "JL", name: "Japan Airlines"},
    {number: 133, code: "LR", name: "LACSA Airlines of Costa Rica"},
    {number: 139, code: "AM", name: "Aeromexico Cargo"},
    {number: 140, code: "LI", name: "LIAT Airlines"},
    {number: 147, code: "AT", name: "Royal Air Maroc"},
    {number: 148, code: "LN", name: "Libyan Airlines"},
    {number: 157, code: "QR", name: "Qatar Airways"},
    {number: 160, code: "CX", name: "Cathay Pacific Airways"},
    {number: 163, code: "3V", name: "TNT Airways"},
    {number: 165, code: "JP", name: "Adria Airways"},
    {number: 172, code: "CV", name: "Cargolux Airlines"},
    {number: 176, code: "EK", name: "Emirates"},
    {number: 180, code: "KE", name: "Korean Air"},
    {number: 182, code: "MA", name: "Malev Hungarian Airlines"},
    {number: 183, code: "RG", name: "VARIG Brazilian Airlines"},
    {number: 189, code: "JI", name: "Jade Cargo International"},
    {number: 201, code: "JM", name: "Air Jamaica"},
    {number: 202, code: "TA", name: "TACA"},
    {number: 205, code: "NH", name: "ANA All Nippon Cargo"},
    {number: 214, code: "PK", name: "Pakistan Int´l Airlines"},
    {number: 217, code: "TG", name: "Thai Airways"},
    {number: 229, code: "KU", name: "Kuwait Airways"},
    {number: 230, code: "CM", name: "Copa Airlines Cargo"},
    {number: 231, code: "NG", name: "Lauda Air"},
    {number: 232, code: "MH", name: "Malaysian Airline System"},
    {number: 234, code: "JD", name: "Japan Air System"},
    {number: 235, code: "TK", name: "Turkish Airlines"},
    {number: 236, code: "BD", name: "British Midland Airways"},
    {number: 239, code: "MK", name: "Air Mauritius"},
    {number: 257, code: "OS", name: "Austrian Cargo"},
    {number: 258, code: "MD", name: "Air Madagascar"},
    {number: 265, code: "EF", name: "Far Eastern Air Transport"},
    {number: 266, code: "LT", name: "LTU (Leisure Cargo)"},
    {number: 270, code: "TL", name: "Trans Mediterranean Airways"},
    {number: 272, code: "K4", name: "Kalitta Air"},
    {number: 288, code: "LD", name: "Air Hong Kong"},
    {number: 297, code: "CI", name: "China Airlines"},
    {number: 301, code: "5S", name: "Global Aviation and Services"},
    {number: 302, code: "OO", name: "Sky West Airlines"},
    {number: 307, code: "WE", name: "Centurion Air Cargo"},
    {number: 324, code: "SC", name: "Shandong Airlines"},
    {number: 330, code: "RF", name: "Florida West International Airways"},
    {number: 345, code: "NC", name: "Northern Air Cargo"},
    {number: 356, code: "C8", name: "Cargolux Italia"},
    {number: 369, code: "5Y", name: "Atlas Air"},
    {number: 378, code: "KX", name: "Cayman Airways"},
    {number: 390, code: "A3", name: "Aegean Airlines"},
    {number: 403, code: "PO", name: "Polar Air Cargo"},
    {number: 404, code: "JW", name: "Arrow Air"},
    {number: 406, code: "5X", name: "UPS Air Cargo"},
    {number: 416, code: "N8", name: "National Air Cargo"},
    {number: 421, code: "S7", name: "Siberia Airlines"},
    {number: 423, code: "ER", name: "DHL Aviation/DHL Airways"},
    {number: 465, code: "KC", name: "Air Astana"},
    {number: 479, code: "ZH", name: "Shenzhen Airlines"},
    {number: 507, code: "SU", name: "Aeroflot"},
    {number: 512, code: "RJ", name: "Royal Jordanian"},
    {number: 526, code: "WN", name: "Southwest Airlines"},
    {number: 529, code: "A2", name: "Cielos Airlines"},
    {number: 549, code: "M3", name: "ABSA Aerolinhas Brasileiras"},
    {number: 552, code: "M2", name: "Mario’s Air"},
    {number: 564, code: "XQ", name: "Sun Express"},
    {number: 566, code: "PS", name: "Ukraine Int´l Airlines"},
    {number: 572, code: "9U", name: "Air Moldova"},
    {number: 575, code: "7C", name: "Coyne Airways"},
    {number: 580, code: "RU", name: "AirBridge Cargo"},
    {number: 589, code: "9W", name: "Jet Airways"},
    {number: 603, code: "UL", name: "SriLankan Cargo"},
    {number: 603, code: "UL", name: "more AWB tracking"},
    {number: 604, code: "UY", name: "Cameroon Airlines"},
    {number: 607, code: "EY", name: "ETIHAD Airways"},
    {number: 615, code: "QY", name: "DHL Aviation / European Air Transport"},
    {number: 618, code: "SQ", name: "Singapore Airlines"},
    {number: 623, code: "FB", name: "Bulgaria Air"},
    {number: 631, code: "GL", name: "Air Greenland"},
    {number: 635, code: "IY", name: "Yemenia Yemen Airways"},
    {number: 643, code: "KM", name: "Air Malta"},
    {number: 656, code: "PX", name: "Air Niugini"},
    {number: 657, code: "BT", name: "Air Baltic"},
    {number: 672, code: "BI", name: "Royal Brunei Airlines"},
    {number: 675, code: "NX", name: "Air Macau"},
    {number: 695, code: "BR", name: "Eva Airways"},
    {number: 700, code: "5C", name: "CAL Cargo Air Lines"},
    {number: 706, code: "KQ", name: "Kenya Airways"},
    {number: 716, code: "MB", name: "MNG Airlines"},
    {number: 724, code: "LX", name: "Swiss"},
    {number: 729, code: "QT", name: "Tampa Airlines"},
    {number: 731, code: "MF", name: "Xiamen Airlines"},
    {number: 737, code: "SP", name: "SATA Air Acores"},
    {number: 738, code: "VN", name: "Vietnam Airlines"},
    {number: 757, code: "SM", name: "Avient"},
    {number: 771, code: "J2", name: "Azerbaijan Airlines"},
    {number: 774, code: "FM", name: "Shanghai Airlines"},
    {number: 781, code: "MU", name: "China Eastern Airlines"},
    {number: 784, code: "CZ", name: "China Southern Airlines"},
    {number: 800, code: "GD", name: "Grandstar Cargo"},
    {number: 803, code: "AE", name: "Mandarin Airlines"},
    {number: 810, code: "M6", name: "Amerijet International"},
    {number: 817, code: "S6", name: "SAC South American Airways"},
    {number: 825, code: "F4", name: "Shanghai Airlines Cargo"},
    {number: 831, code: "OU", name: "Croatia Airlines"},
    {number: 851, code: "N8", name: "Hong Kong Airlines"},
    {number: 858, code: "FK", name: "Africa West"},
    {number: 862, code: "EV", name: "Atlantic Southeast Airlines"},
    {number: 865, code: "MY", name: "MASAir"},
    {number: 870, code: "VV", name: "Aerosvit"},
    {number: 871, code: "Y8", name: "Yangtze River Express Airlines"},
    {number: 873, code: "6R", name: "AeroUnion"},
    {number: 876, code: "3U", name: "Sichuan Airlines"},
    {number: 880, code: "HU", name: "Hainan Airlines (Chinese"},
    {number: 881, code: "DE", name: "Condor Flugdienst"},
    {number: 886, code: "OH", name: "Comair"},
    {number: 901, code: "B1", name: "TAB Cargo"},
    {number: 907, code: "QN", name: "Air Armenia"},
    {number: 928, code: "UZ", name: "Buraq Air Transport"},
    {number: 932, code: "VS", name: "Virgin Atlantic"},
    {number: 933, code: "KZ", name: "Nippon Cargo Airlines"},
    {number: 957, code: "JJ", name: "TAM Brazilian Airlines"},
    {number: 958, code: "7I", name: "Insel Air Cargo"},
    {number: 960, code: "OV", name: "Estonian Air"},
    {number: 976, code: "QO", name: "Aeromexpress Cargo"},
    {number: 988, code: "OZ", name: "Asiana Airlines"},
    {number: 989, code: "IJ", name: "Great Wall Airlines"},
    {number: 996, code: "UX", name: "Air Europa Cargo"},
    {number: 997, code: "BG", name: "Biman Bangladesh"},
    {number: 999, code: "CA", name: "Air China"},
    {number: 0, code: "WS", name: "WestJet"},
    {number: 169, code: "HR", name: "Hahn Air"},
    {number: 279, code: "B6", name: "JetBlue Airlines"},
    {number: 57, code: "AF", name: "Air France"},
    {number: 30, code: "VY", name: "Vueling Airlines S.A."},
    {number: 0, code: "DY", name: "Norwegian Air Shuttle"}
];

function set_airlines_filter_for_search(){

    show_prompt_to_user(
        `<i style="color: orangered; font-size: 22px; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        Action Not Allowed`, 
        `Due to maintenance and expansion of services, we are unable to filter flights by airlines at the moment.
        We apologize for this inconvenience.`
    );

    document.getElementById("book_flights_filter_airlines_list").value = "all";

    /*let airline_code = document.getElementById("book_flights_filter_airlines_list").value;

    if(airline_code === "all"){
        flight_multi_city_search_data.itinerary.searchCriteria.flightFilters.carrierRestrictions.excludedCarrierCodes = ["NON"];
    }else{
        let excluded = airline_codes.filter( each => {
            return (each.code !== airline_code);
        });

        flight_multi_city_search_data.itinerary.searchCriteria.flightFilters.carrierRestrictions.excludedCarrierCodes = [];
        excluded.forEach(each => {
            flight_multi_city_search_data.itinerary.searchCriteria.flightFilters.carrierRestrictions.excludedCarrierCodes.push(each.code);
        });
    }

    //fligh_search_data.currencyCode = currency;
    window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
    window.localStorage.setItem("flight_multi_city_search_data", JSON.stringify(flight_multi_city_search_data));*/
}
//initial setting
$(document).ready( ()=>{
    //set_airlines_filter_for_search();
});


function add_hotel_to_flight_search_func(){
    document.getElementById("add_a_hotel_to_flight_search").checked = false;
    show_prompt_to_user(
        `<i style="color: orangered; font-size: 22px; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        Action Not Allowed`, 
        `Due to maintenance and expansion of services, we are unable to add hotels to flight searches at the moment.
        We apologize for this inconvenience.`
    );
}

function add_car_to_flight_search_func(){
    document.getElementById("add_a_car_to_flight_search").checked = false;
    show_prompt_to_user(
        `<i style="color: orangered; font-size: 22px; margin-right: 5px;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        Action Not Allowed`, 
        `Due to maintenance and expansion of services, we are unable to add rental cars to flight searches at the moment.
        We apologize for this inconvenience.`
    );
}