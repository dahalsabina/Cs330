/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';

class RestaurantView {
    constructor(model) {
        model.subscribe(this.redrawView.bind(this));
    }

    redrawView(menu, msg) {
        let tblBody = document.querySelector("#tbl_footlocket > tbody");
       
        tblBody.innerHTML = "";

        for (let food of menu) {
            let row = document.createElement("tr");

            let checkboxCell = document.createElement("td");
            let cb = document.createElement("input");
            cb.type = "checkbox";
            
            checkboxCell.appendChild(cb);
            row.appendChild(checkboxCell);


            let tditem = document.createElement("td");
            tditem.innerText = food.item;
            row.appendChild(tditem);

            let tdquantity = document.createElement("td");
            tdquantity.innerText = food.quantity;
            row.appendChild(tdquantity);

            let tdPrice = document.createElement("td");
            tdPrice.innerText = `$ ${Number.parseFloat(food.price).toFixed(2)}`;
            row.appendChild(tdPrice);

            let tdspice = document.createElement("td");
            tdspice.innerText = food.spice;
            row.appendChild(tdspice);

            tblBody.appendChild(row);
            cb.addEventListener("change", function () {
                if (cb.checked) {
                    removeRow(row,food);
                }
            });
        }
    }
    
    saveStateToLocalStorage() {
        const menu = this.model.menu;
        localStorage.setItem('restaurantMenu', JSON.stringify(menu));
    }

}


