
//setting up global variables, below are the information that goes into the buttons so they can easily populate
var packs = ["3-Pack", "6-Pack", "12-Pack"];
var packsAmount = 3;
var flavors = ["Original", "Maple Apple Pecan", "Strawberry Rhubarb", "Bacon", "Pumpkin Spice", "Birthday Cake", "Walnut", "Caramel Pecan", "Lemon Lavendar", "Carrot Cake", "Cranberry", "Blackberry", "Old Fashioned Buttermilk", "Vegan", "Gluten-Free"];
var amount = ["1","2", "3"];
var price = ["7","15","30"];
var counter = 1;



function order(pack, flav1, flav2, flav3, amount, price) {
    this.pack = pack;
    this.flav1 = flavors[0];
    this.flav2 = flav2;
    this.flav3 = flav3;
    this.amount = amount;
    this.price = price;
}
// Document ready
$(document).ready(function() {
    
    if (localStorage.length == 0){
        $("#cartAmount").text("Cart"+"("+"0"+")");
        $("#cartAmount").attr("href", "");
    } else {
        $("#cartAmount").text("Cart"+"("+localStorage.length+")");
        $("#cartAmount").attr("href", "cart.html"); 
    }
    
    
    //this function is to populate the buttons on my page
    function populateButtons(idName, arrayName){
        for(i = 0; i < arrayName.length; i++){
            $("#"+idName+String(i)).text(arrayName[i]);
        };
    }
    
    //Going through each of the packs buttons when they are clicked and making sure they are the only one clicked, so that there is no discrepancy
    $("#var-packs0").click(function() {
        $(this).addClass("selectedbuttons");
        $("#var-packs1").removeClass("selectedbuttons");
        $("#var-packs2").removeClass("selectedbuttons");
        $("#originalbun").attr("src","images/org3.png");
        order.pack = packs[0];
        order.price = price[0];
    });
    
    $("#var-packs1").click(function() {
        $(this).addClass("selectedbuttons");
        $("#var-packs0").removeClass("selectedbuttons");
        $("#var-packs2").removeClass("selectedbuttons");
        $("#originalbun").attr("src","images/org6.png");
        order.pack = packs[1];
        order.price = price[1];
    });
    
    $("#var-packs2").click(function() {
        $(this).addClass("selectedbuttons");
        $("#var-packs0").removeClass("selectedbuttons");
        $("#var-packs1").removeClass("selectedbuttons");
        $("#originalbun").attr("src","images/org12.png");
        order.pack = packs[2];
        order.price = price[2];
    });
    
    
    //Going through each of the packs buttons when they are clicked and making sure they are the only one clicked, so that there is no discrepancy
    $("#var-num0").click(function() {
        $(this).addClass("selectedbuttons");
        $("#var-num1").removeClass("selectedbuttons");
        $("#var-num2").removeClass("selectedbuttons");
        order.amount = amount[0];
    });
    
    $("#var-num1").click(function() {
        $(this).addClass("selectedbuttons");
        $("#var-num0").removeClass("selectedbuttons");
        $("#var-num2").removeClass("selectedbuttons");
        order.amount = amount[1];
    });
    
    $("#var-num2").click(function() {
        $(this).addClass("selectedbuttons");
        $("#var-num0").removeClass("selectedbuttons");
        $("#var-num1").removeClass("selectedbuttons");
        order.amount = amount[2];
    });
    
    
    //This function goes through all of the flavor buttons to see if they've been clicked and to make sure no more than 3 are clicked
    function countFlavor(flavor, i) {
        $(flavor).click(function() {
            if (counter < 3) {
                if ($(this).hasClass("selectedbuttons")) {
                    $("#flavorchoice").text("Flavors (Choose up to 3):" + " Original");
                    $(this).addClass("unselectedbuttons");
                    $(this).removeClass("selectedbuttons");
                    if (counter == 2) {
                        $(order.flav2 = undefined);
                        counter -= 1;
                    }
                    if (counter == 3) {
                        $(order.flav3 = undefined);
                        counter -= 1;
                    }
                } else {
                    if (counter < 3) {
                        counter += 1;
                        if (counter == 2) {
                            $(this).toggleClass("selectedbuttons");
                            $(order.flav2 = flavors[i]);
                        }
                        if (counter == 3) {
                            $(this).toggleClass("selectedbuttons");
                            $(order.flav3 = flavors[i]);
                        }
                    }
                }
            }
        })
    }

    //this function checks each flavor (all 15)
    function trackFlavors() {
        for (var i = 0; i < 15; i++) {
            countFlavor('#var-flavors' + String(i), i);
        }
    }

    
    //below is the code for adding items to the cart
    $("#checkout").click(function(){
        //this is to check that the user has selected a pack amount
        if (order.pack == undefined) {
            $("#orderdetails").text("*Please select an amount of buns");
            window.alert("Please select an amount of buns");
            $("#orderdetails").removeClass("productCaption");
            $("#orderdetails").addClass("error");
        }
        //this is to check that the user has selected flavors
        if (order.flav2 == undefined) {
            order.flav2 = flavors[0];
            order.flav3 = flavors[0];
        }
        if (order.flav3 == undefined) {
            order.flav3 = flavors[0];
        }
        //this is to check that the user has selected an amount
        if (order.amount == undefined) {
            $("#numoforders").text("*Please select an amount of orders");
            window.alert("Please select an amount of orders you would like");
            $("#numoforders").removeClass("productCaption");
            $("#numoforders").addClass("error");

        }
        //first I store the order in a new variable called currentOrder
        var currentOrder = new order(order.pack, order.flav1, order.flav2, order.flav3, order.amount,order.price);
        //then I stringify this order so that it can be added to localStorage
        var currentOrderJSON = JSON.stringify(currentOrder);
        //then I set the item in localStorage, but I name it order plus the currentlength of the local storage
        localStorage.setItem("order"+localStorage.length, currentOrderJSON)
        currentOrder = [];
        //I then update the cart amount
        $("#cartAmount").text("Cart"+"("+localStorage.length+")");
        $("#cartAmount").attr("href", "cart.html");
    });
    
    //this is to update the price when different buttons are clicked
    document.onclick=function(){
        if (order.amount == undefined){
            $("#price").text("Total Price: $"+order.price+".00");
        } else{
            $("#price").text("Total Price: $"+order.price*order.amount+".00");
        }

    }
    
    //I am calling this function to populate the buttons
    populateButtons("var-flavors", flavors);
    populateButtons("var-packs", packs);
    populateButtons("var-num", amount);
    //I am calling this to track the flavors that are selected
    trackFlavors();
    
}); //End document ready

