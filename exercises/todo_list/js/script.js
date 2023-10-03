/* jshint esversion: 8 */
/* jshint browser: true */
"use strict;";

var team = ["Aardvark", "Beaver", "Cheetah", "Dolphin", "Elephant", "Flamingo", "Giraffe", "Hippo"];
var priority = ["Low", "Normal", "Important", "Critical"];

/**
 * Add a new task to the list
 * 
 * Validate form, collect input values, and add call `addRow` to add a new row to the table
 */
function addTask() {
    // TODO: Implement this function

    let vals = [];
    let rowcolids = ["title", "assignedTo", "priority", "dueDate"];
    let formIsValid = true;

   for (let colId of rowcolids) {
        const value = document.getElementById(colId).value;
        if (value.trim() === "") {
            alert("All fields must be filled out.");
            formIsValid = false;
            break;
        }
        vals.push(value);
    }
    if (formIsValid) {

     addRow(vals, document.getElementById("taskList"));
     const feedbackContainer = document.getElementById("feedbackMessage");
     feedbackContainer.style.display = "none";
    }else {
      
        document.getElementById("feedbackMessage").textContent = "Fill out title and due date";
        feedbackMessage.style.display = "block";
        
    }
}

/**
 * Add a new row to the table
 * 
 * @param {string[]} valueList list of task attributes
 * @param {Object} parent DOM node to append to
 */
function addRow(valueList, parent) {
    // TODO: Implement this function
    
    let row = document.createElement("tr");
    let cb = document.createElement("input");
    cb.type = "checkbox";
    row.appendChild(cb);

    cb.addEventListener("change", function() {
        if (cb.checked) {
            removeRow(cb);
        }
    });

    for (let value of valueList) {
        let td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
    }
    
       
    let priority = valueList[2].toLowerCase(); 
    row.classList.add(priority);



    parent.appendChild(row);
}

/**
 * Remove a table row corresponding to the selected checkbox
 * 
 * https://stackoverflow.com/questions/26512386/remove-current-row-tr-when-checkbox-is-checked
 */
function removeRow(checkbox) {
    // TODO: Implement this function

    const row = checkbox.closest("tr");

    if (row) {
        setTimeout(() => {
            row.parentElement.removeChild(row);
        }, 1000);     }
    }

/**
 * Remove all table rows
 * 
 */
function selectAll() {

    
    //Didn't work as I wanted so removed the whole code


}

/**
 * Add options to the specified element
 * 
 * @param {string} selectId `select` element to populate
 * @param {string[]} sList array of options
 */
function populateSelect(selectId, sList) {
    // TODO: Implement this function

    let sel = document.getElementById(selectId,sList)
    sel.innerHTML = "";

   
    for (let option of sList) {
        let opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        sel.appendChild(opt);
    }
    
}

window.onload = function () {
    populateSelect("assignedTo", team);
    populateSelect("priority", priority);
    
    

    

};
