/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';
var myRestaurantModel = new Restaurant();
var myRestaurantView = new RestaurantView(myRestaurantModel);



function populateSelect(selectElementId, options) {
    let selectElement = document.querySelector(selectElementId);
    for (let opt of options) {
        let optElem = document.createElement("option");
        optElem.setAttribute("value", opt);
        optElem.innerHTML = opt;
        selectElement.appendChild(optElem);
    }
}

function addItem() {
    if (!document.querySelector("#food_details").checkValidity()) {
        return;
    }
    let item = document.querySelector("#sel_item").selectedOptions[0].value;
    let quantity = document.querySelector("#num_quantity").value;
    let price = document.querySelector("#num_price").value;
    let spice = document.querySelector("#sel_spice").value;
    let newItem = new Menu(item, quantity, price,spice);
    myRestaurantModel.add(newItem);
    myRestaurantView.saveStateToLocalStorage();
}

function clearAll() {
    myRestaurantModel.clear();
    localStorage.removeItem('restaurantMenu');
    
}

function removeRow(row, food) {
    let table = document.getElementById("tbl_footlocket");
    table.deleteRow(row.rowIndex);

    let storedMenu = JSON.parse(localStorage.getItem('restaurantMenu')) || [];
    
   
    const updatedMenu = storedMenu.filter(item => item.id !== food.id);

    localStorage.setItem('restaurantMenu', JSON.stringify(updatedMenu));

    myRestaurantModel.myrestaurant = updatedMenu;
}






function saveList() {
    saveStateToLocalStorage(myRestaurantModel.myrestaurant);
    
}





window.onload = function (params) {
    populateSelect("#sel_item", ["Momo(dumplings)", "Rice&Lentils", "Chowmein", "Sel Roti", "Choila", "Chicken Curry"]);
    populateSelect("#sel_spice", ["Hot", "Medium", "Low", "None"]);
    const savedMenu = localStorage.getItem('restaurantMenu');
    if (savedMenu) {
        const parsedMenu = JSON.parse(savedMenu);
        myRestaurantModel.myrestaurant = parsedMenu;
        myRestaurantView.redrawView(parsedMenu);
        
    }
}



