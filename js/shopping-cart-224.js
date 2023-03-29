// $(function () {
// });

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}


function ready() {

    var removeItems = document.getElementsByClassName('remove-items');
    console.log("Hello remove", removeItems);

    for (var i = 0; i < removeItems.length; i++) {
        var removeItemButton = removeItems[i];
        removeItemButton.addEventListener('click', function (event) {
            console.log('clicked');
            var buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            updateCartTotal();
        });

    }

    var removeQuantity = document.getElementsByClassName('remove-quantity');
    var addQuantity = document.getElementsByClassName('add-quantity');

    /**
     * Reduce quantity
     */
    for (var i = 0; i < removeQuantity.length; i++) {
        var removeQuantityButton = removeQuantity[i];
        removeQuantityButton.addEventListener('click', function (event) {
            var buttonClicked = event.target;
            var quantityElement = buttonClicked.nextSibling;
            var quantity = parseInt(quantityElement.innerText);

            if (quantity > 1) {
                quantity -= 1;
                quantityElement.innerText = quantity;
            } else {
                alert("1 is the minimum quantity.");
            }
            updateCartTotal();
        });


        /**
         * Delivery mode
         */
        var deliveryMode = document.getElementById('shipping-mode');
        console.log("delivery mode is", deliveryMode);
        deliveryMode.addEventListener('click', function (event) {
            updateCartTotal();
        });

    }
    /**
     * Increase quantity
     */
    for (var i = 0; i < addQuantity.length; i++) {
        var addQuantityButton = addQuantity[i];
        addQuantityButton.addEventListener('click', function (event) {
            var buttonClicked = event.target;
            var quantityElement = buttonClicked.previousSibling;
            var quantity = parseInt(quantityElement.innerText);
            quantity += 1;
            quantityElement.innerText = quantity;
            updateCartTotal();
        });

    }
}
function updateCartTotal() {
    var cartRows = document.getElementsByClassName('item-price');
    var cartRowsQuantity = document.getElementsByClassName('item-quantity');
    var cartTotalQuantity = document.getElementById('#total-quantity');
    var cartTotalQuantitySummary = document.getElementById('#total-quantity-summary');
    var cartTotalBasePrice = document.getElementById('#total-base-price');
    var cartTotalPrice = document.getElementById('#total-price');
    var taxElement = document.getElementById('#taxes');

    var tax = 0;
    var total = 0;
    var quantityTotal = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var floatPrice = parseFloat(cartRows[i].innerText.replace('$', '')).toFixed(2);
        console.log(floatPrice);

        var intQuantity = parseInt(cartRowsQuantity[i].innerText.replace('$', ''));
        total += floatPrice * intQuantity;
        quantityTotal += intQuantity;

    }
    tax = ((total *13/100 )).toFixed(2);

    cartTotalQuantity.innerText = quantityTotal + " items ";
    cartTotalQuantitySummary.innerText = 'ITEMS ' + quantityTotal;
    cartTotalBasePrice.innerText = '$ ' + total.toFixed(2);
    taxElement.innerText = '$ ' + tax;
    if (quantityTotal == 0) {

    }

    var totalBasePrice = total.toFixed(2);
    var shippingPrice = parseInt($("#shipping-mode").val());
    var totalPrice = parseFloat(parseFloat(totalBasePrice) +parseFloat( shippingPrice )+ parseFloat(tax)).toFixed(2);
    cartTotalPrice.innerText = '$ ' + totalPrice;

}
