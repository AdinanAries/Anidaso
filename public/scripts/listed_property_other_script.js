
function return_dom_for_all_cities_add_city_input(cities_arr){

    let dom_arr = cities_arr.map(each =>{

        return `
        <li onclick="all_cities_pick_selected_city_from_all_world_cities_autocomplete('${each.name.replaceAll('\'', '#$#$%$#098')}','${each.country.replaceAll('\'', '#$#$%$#098')}');" style="cursor: pointer; padding: 5px 10px; overflow: initial !important;" >
            <p style="font-size: 14px; color: black; overflow: initial !important;">
            <i style="margin-right: 5px; color: rgb(5, 57, 99);" class="fa fa-map-marker" aria-hidden="true"></i>
            ${each.name}, ${each.country}</p>
        </li>
        `;

    });

    return dom_arr.join(' ');
}

document.getElementById("logged_in_hotel_all_cities_list_add_city_form_input").addEventListener("input", evnt =>{

    $("#all_cities_add_city_input_autocomplete_section").slideDown("fast");

    let cities_arr = all_world_cities_auto_complete(evnt.target.value);
    let elems = return_dom_for_all_cities_add_city_input(cities_arr);

    //console.log(elems);
    document.getElementById("all_cities_add_city_input_autocomplete_list").innerHTML = elems;

});

function all_cities_pick_selected_city_from_all_world_cities_autocomplete(city, country){

    let a_city = city.replaceAll('#$#$%$#098', "'");
    let a_country = country.replaceAll('#$#$%$#098', "'");

    document.getElementById("logged_in_hotel_all_cities_list_add_city_form_input").value = `${a_city}, ${a_country}`;

    $("#all_cities_add_city_input_autocomplete_section").slideUp("fast");

}