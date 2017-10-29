var nowParse = [];
var allOrders = [];
var images = ["images/org3.png", "images/org6.png", "images/org12.png"];
var finalFinal = 0;
var buttons = $('button');
var shoppingcarts = $('.shoppingCart');

$(document).ready(function() {

        //this function is getting my information from local storage and retrieving it
        function gettingLocalStorage(){
            //the following code is parsing the information given from the ordering page
            $("#cartAmount").text("Cart"+"("+localStorage.length+")");
            //I am running a for loop for the total amount of orders
            for(i = 0; i < localStorage.length; i++){
                finalFinal = localStorage.getItem("order"+String(i));
                nowParse = JSON.parse(finalFinal);
            //I am pushing the parsed information into a final array
                allOrders.push(nowParse);
            };
        }
    
        //this function is loading the current orders on the page
        function loadCurrentOrders(){
            console.log("calling again")
            //this code is taking the amount of orders and creating new divs with the appropriate information within them
            for(i = 0; i < allOrders.length; i++){
                    console.log("All orders is... ", allOrders);
                    var elem = $("<div>", {"class": "shoppingCart"});
                    $("#allOrders").append(elem);
                    $(elem).append("<h2 id='orderNumber'>Bun Bun Order "+String(i+1)+"</h2>");
                    if (allOrders[i].pack == "12-Pack") {
                        $(elem).append("<img class='checkoutImage' src="+images[2]+">");     
                    }
                    if (allOrders[i].pack == "6-Pack") {
                        $(elem).append("<img class='checkoutImage' src="+images[1]+">");     
                    }
                    if (allOrders[i].pack == "3-Pack") {
                        $(elem).append("<img class='checkoutImage' src="+images[0]+">");     
                    }
                    $(elem).append("<ol class='listofOrder'><li>Amount of Buns:</li><li id='currentPack' class='listofOrderLiAnswer'>"+allOrders[i].pack+"</li><li>Flavors:</li><li id='currentFlavors' class='listofOrderLiAnswer'>"+allOrders[i].flav1+", "+allOrders[i].flav2+", and "+allOrders[i].flav3+"</li><li>Number of Orders:</li><li id='currentAmount' class='listofOrderLiAnswer'>"+allOrders[i].amount+" of this order"+"</li><li id='currentPrice' class='listofOrderLiAnswer'>"+"Total Price: "+"$"+allOrders[i].price*(allOrders[i].amount)+"</li><ol>");
                    var removeDiv = $("<div>", {"class": "amountbuttons"});
                    $(elem).append(removeDiv);
                    $(removeDiv).append("<a href='#'><button class='removebuttons'>X - Cancel this Order</button></a>"); 
            };
            buttons = $('button');
            shoppingcarts = $('.shoppingCart');
            //Here I am calling the assignButtonId function
            assignButtonId();
        }
    
        //This function is assigning IDs to the removebuttons and the shoppingcarts that are related ot each order
        function assignButtonId() {
            for(var i = 1; i < buttons.length; i++) {
                $(buttons[i]).attr('id', 'removebutton'+ String(i));
            }
            for(var i = 0; i < shoppingcarts.length; i++) {
                $(".shoppingCart").attr('id', 'shoppingCart'+ String(i));
            }
            
        }
    
        //This function checks which removebuttons were clicked and then calls the removeOrder function on this specific order
        function checkClick() {
              $(buttons).click( function() {
                removeOrder($(this));
              });
        }
    
        //This function removes the order that correlates with the number of the removebutton
        function removeOrder(orderButton) {
                var getId = $(orderButton).attr("id");
                var stringofGetID = String(getId);
                var position = stringofGetID.substr(-1);
                allOrders.pop(position);
                $("#shoppingCart"+String(position-1)).remove();
                localStorage.removeItem("order"+String(position-1));
                $("#cartAmount").text("Cart"+"("+localStorage.length+")");
                
            
        }

    

    
        
        //Calling my functions
        gettingLocalStorage();
        loadCurrentOrders();
        checkClick();

    

});

