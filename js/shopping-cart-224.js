// $(function () {
// });

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}


function ready() {

    addItemToCart();

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

    var buyNowButtons = document.getElementsByClassName('btn-add-to-cart');
    for (var i = 0; i < buyNowButtons.length; i++) {
        var singleBtn = buyNowButtons[i];
        singleBtn.addEventListener('click', addToCartClicked);
    }

    //addItemToCart();
}

var itemList = [];
if(localStorage.getItem('itemList')){
    itemList = JSON.parse(localStorage.getItem('itemList'));
}

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('subhead-2')[0].innerText;
    var price = shopItem.getElementsByClassName('final-price')[0].innerText;
    var imageSrc = shopItem.parentElement.getElementsByClassName('image-icon')[0].src;
    itemList.push({
            title : title, 
            price : price, 
            imageSrc : imageSrc
        });
    console.log(itemList);
    localStorage.setItem('itemList', JSON.stringify(itemList));
    alert("Item added to cart!");
}


function addItemToCart(){
    console.log('inside addItemToCart');
    myVar = JSON.parse(localStorage.getItem('itemList'));
    console.log('itemList : ',myVar);
    var cartRow = document.createElement('div');
    cartRow.innerText = 'Nikita_Kapoor';
    console.log('cartRow : ',cartRow);
    var cartItems = document.getElementById("cartitemsIDNK");
    if(cartItems){
        console.log('cartItems : ',cartItems);
        cartItems.append(cartRow);
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
