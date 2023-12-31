/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';
class Menu {
    static id = 0;
    constructor(item, quantity, price,spice) {
        this.id = Menu.id++;
        this.item = item;
        this.quantity = quantity;
        this.price = price;
        this.spice=spice;
    }
    
}

class Subject {
    constructor() {
        this.handlers = [];
    }
    subscribe(func) {
        this.handlers.push(func);
    }
    unsubscribe(func) {
        this.handlers = this.handlers.filter(item => item !== func);
    }
    publish(msg, obj) {
        let scope = obj || window;
        for (let f of this.handlers) {
            f(scope, msg);
        }
    }
}


class Restaurant extends Subject {
    constructor() {
        super();
        this.myrestaurant = [];
    }

    add(type) {
        this.myrestaurant.push(type);
        this.publish("New type of food has been added", this);
    }

    

    clear() {
        this.myrestaurant = [];
        this.publish("Everything is gone", this);
    }

    [Symbol.iterator]() {
        let idx = -1;
        return {
            next: () => ({ value: this.myrestaurant[++idx], done: !(idx in this.myrestaurant) })
        };
    }
}


