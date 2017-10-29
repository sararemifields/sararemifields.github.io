$(document).ready(function() {
    if (localStorage.length === 0){
        //setting the cart amount to 0 if there are no current orders exisiting
        $("#cartTotal").text("Cart"+"(0)");
    } else {
        //setting the cart amount to whatever has already been stored in local storage
        console.log("Final Count is ", localStorage.length);
        $("#cartTotal").text("Cart"+"("+localStorage.length+")");
    }
});