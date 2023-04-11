function readyFunc() {

    addItemToCart();

    document.getElementById('checkoutBtn') != null ? document.getElementById('checkoutBtn').onclick = openForm : "";
    //document.getElementById('addressToCart') != null ? document.getElementById('addressToCart').onclick = closeForm : "";
    document.getElementById('resetAddress') != null ? document.getElementById('resetAddress').onclick = resetAddressForm : "";

    //NK - Load cart contents in cart page

    /**
     * Rajwant Kaur remove items from cart from cross button click.
     */
    var removeItems = document.getElementsByClassName('remove-items');
    for (var i = 0; i < removeItems.length; i++) {
        var removeItemButton = removeItems[i];
        removeItemButton.addEventListener('click', function (event) {
            var buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.parentElement.remove(); //Rajwant Kaur- remove item from screen
            var title = buttonClicked.parentElement.parentElement.getElementsByClassName('item-title')[0].innerText;
            removeItemFromStorage(title); //NK - remove item from local storage, so that user sees latest items list
            /**
             * Rajwant Kaur- Update cart overall summary based on the user actions.
             */
            updateCartTotal();
        });

    }

    var removeQuantity = document.getElementsByClassName('remove-quantity');
    var addQuantity = document.getElementsByClassName('add-quantity');

    /**
     * Rajwant Kaur Reduce quantity if user click on subtraction button
     */
    for (var i = 0; i < removeQuantity.length; i++) {
        var removeQuantityButton = removeQuantity[i];
        removeQuantityButton.addEventListener('click', function (event) {
            var buttonClicked = event.target;
            var quantityElement = buttonClicked.nextSibling;
            var quantity = parseInt(quantityElement.innerText);
            var title = buttonClicked.parentElement.parentElement.getElementsByClassName('item-title')[0].innerText;
            if (quantity > 1) {
                quantity -= 1;
                quantityElement.innerText = quantity;  //RK- update the quantity on screen
                setItemQuantityInLocalStorage(title, quantity);  //NK -update quantity in local storage (so that latest quantity is fetched when user revists)
            } else {
                /**
                 * User can not reduce quantity less than 1. 
                 * They can click cross button to remove item completely.
                 */
                alert("1 is the minimum quantity.");
            }
            /**
             * Rajwant Kaur, Update total amount of cart
             */
            updateCartTotal();
        });


        /**
         * Rajwant kaur Delivery mode
         */
        var deliveryMode = document.getElementById('shipping-mode');
        console.log("delivery mode is", deliveryMode);
        deliveryMode.addEventListener('click', function (event) {
            /**
             * Rajwant Kaur  Update cart total based on delivery mode.
             */
            updateCartTotal();
        });

    }
    /**
      * Rajwant Kaur Increase quantity if user click on addition button
      */
    for (var i = 0; i < addQuantity.length; i++) {
        var addQuantityButton = addQuantity[i];
        addQuantityButton.addEventListener('click', function (event) {
            var buttonClicked = event.target;
            var quantityElement = buttonClicked.previousSibling;
            var quantity = parseInt(quantityElement.innerText);
            var title = buttonClicked.parentElement.parentElement.getElementsByClassName('item-title')[0].innerText;
            quantity += 1;
            quantityElement.innerText = quantity; //RK- update the quantity on screen
            setItemQuantityInLocalStorage(title, quantity);  //NK - update quantity in local storage (so that latest quantity is fetched when user revists)
            /**
             * Rajwant Kaur- Update cart total for increase in quantity
             */
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


/** @ Nikita Kapoor - itemList
* Global list common between index and cart page, also maintained in local storage.
* Used to contorl items being added to cart and display on cart page*/
var itemList = [];
if (localStorage.getItem('itemList')) {
    itemList = JSON.parse(localStorage.getItem('itemList'));
}


/** @ Nikita Kpaoor - itemListName
 * Supporting list to maintain the title list of items in cart
*/
var itemListName = [];
for (i = 0; i < itemList.length; i++) {
    itemListName.push(itemList[i].title);
}


/**@ Nikita Kapoor - setItemQuantityInLocalStorage(title, qty)
 * Serches the title in current itemList and sets quantity to the specified value in localStorage
 * Used in increasing or decreasing the value of an item in cart
*/
function setItemQuantityInLocalStorage(title, qty) {
    for (i = 0; i < itemList.length; i++) {
        if (itemList[i].title == title) {
            itemList[i].quantity = qty;
            break;
        }
    }
    localStorage.setItem('itemList', JSON.stringify(itemList));
}


/**@ Nikita Kapoor - removeItemFromStorage(title)
 * Serches the title in current itemList and removes that item from localStorage
*/
function removeItemFromStorage(title) {
    for (i = 0; i < itemList.length; i++) {
        if (itemList[i].title == title) {
            itemList.splice(i, 1);
        }
    }
    for (i = 0; i < itemListName; i++) {
        if (itemListName[i] == title) {
            itemListName.splice(i, 1);
        }
    }
    localStorage.setItem('itemList', JSON.stringify(itemList));
}


/**@ Nikita Kapoor - addToCartClicked(event)
 * event handler for Buy Now buttons on index.html page
 * adds item to itemList, hence item added will be displayed in cart
*/
console.log('itemListName 1 : ', itemListName);
function addToCartClicked(event) {
    console.log('This is being clicked!!!!');
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('subhead-2')[0].innerText;
    if (itemListName.includes(title)) {
        alert("Item alrady added to cart.\nPlease change quantity form Cart page.");
    }
    else {
        var price = shopItem.getElementsByClassName('final-price')[0].innerText;
        var imageSrc = shopItem.parentElement.getElementsByClassName('image-icon')[0].src;
        itemList.push({
            title: title,
            price: price,
            imageSrc: imageSrc,
            quantity: 1
        });
        localStorage.setItem('itemList', JSON.stringify(itemList));
        itemListName.push(title);
        alert("Item added to cart!");
    }
    console.log('inside addToCartClicked itemList: ', itemList);
    console.log('inside addToCartClicked itemListName: ', itemListName);
}


/**@ Nikita Kapoor - addItemToCart()
 * funtion to populate the contents of page shopping-cart-224.html
 * dynamic rows created based on itemList content
*/
function addItemToCart() {
    console.log('addItemToCart initiated');
    var itemListInternal = JSON.parse(localStorage.getItem('itemList'));
    console.log('itemListInternal: ', itemListInternal);
    var cartItems = document.getElementById("cartitemsIDNK");
    console.log('cartItems: ', cartItems);
    if (itemListInternal == null || itemListInternal.length == 0) {
        console.log('On index page hence itemListInternal is null : ', itemListInternal);
    }
    else {
        for (i = 0; i < itemListInternal.length; i++) {
            var cartRow = document.createElement('div')
            cartRow.classList.add('row');
            cartRow.classList.add('border-top');
            cartRow.classList.add('border-bottom');
            var cartRowContent = `<div class="row main align-items-center">
                                <div class="col-2">
                                    <img
                                    class="img-fluid"
                                    src="${itemListInternal[i].imageSrc}"
                                    />
                                </div>
                                <div class="col">
                                    <div class="row text-muted">Shirt</div>
                                    <div class="row item-title text-muted">${itemListInternal[i].title}</div>
                                </div>
                                <div class="col">
                                    <a href="#" class="remove-quantity text-muted">-</a
                                    ><a href="#" class="border item-quantity text-muted">${itemListInternal[i].quantity}</a
                                    ><a href="#" class="add-quantity text-muted">+</a>
                                </div>
                                <div class="col">
                                    <span class="item-price text-muted">${itemListInternal[i].price}</span>
                                    <span class="remove-items text-muted">&#10005;</span>
                                </div>
                            </div>`;
            cartRow.innerHTML = cartRowContent;
            if (cartItems) {
                cartItems.append(cartRow);
            }
        }

    }
    var cartTotalQuantity = document.getElementById('#total-quantity');
    if (cartTotalQuantity == null || cartTotalQuantity == undefined || cartTotalQuantity == '') {
        console.log('On index page hence cartTotalQuantity is null : ', cartTotalQuantity);
    } else {
        updateCartTotal();
    }
}


/**
 * Rajwant Kaur- Update over all price,
 * automatic taxes calculations based on price
 * Delivery price calculation
 * Number of items update.
 * 
 */
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
    /**
     * Rajwant Kaur- Calculate 13% standard taxes
     */
    tax = ((total * 13 / 100)).toFixed(2);

    cartTotalQuantity.innerText = quantityTotal + " items ";
    cartTotalQuantitySummary.innerText = 'ITEMS   ' + quantityTotal;
    cartTotalBasePrice.innerText = '$ ' + total.toFixed(2); // Rajwant Kaur- Floating points upto 2 decimal points
    taxElement.innerText = '$ ' + tax;

    /**
     * Rajwant Kaur- Display No items message if quantity is zero.
     */
    if (quantityTotal == 0) {
        const cartItemsEl = document.getElementById('cartitemsIDNK');
        cartItemsEl.innerText = 'No Items available in your cart';
        cartItemsEl.style.fontSize = '24px';
        cartItemsEl.style.textAlign = 'center';
    }

    /**
     * Rajwant Kaur- Floating points upto 2 decimal points
     */
    var totalBasePrice = total.toFixed(2);
    var shippingPrice = parseInt($("#shipping-mode").val());
    var totalPrice = parseFloat(parseFloat(totalBasePrice) + parseFloat(shippingPrice) + parseFloat(tax)).toFixed(2);
    cartTotalPrice.innerText = '$ ' + totalPrice;

}


/**  @ Nikita Kapoor
 * openForm() opens the window to enter delivery address when checkout is clicked
 * calls displayOrderSummary() when user clicks on proceed button on address window
 */
openForm = function openForm() {
    if (itemList == null || itemList.length <= 0) {
        alert("No items in cart for checkout!");
    }
    else {
        $("#enclosing").addClass("disable-content");
        document.getElementById("popupForm").style.opacity = 1;
        document.getElementById("popupForm").style.display = "block";
        document.getElementById("ProceedBtn").addEventListener('click', displayOrderSummary);
    }

}


/** @ Nikita Kapoor
 * closes delivery address window */
closeForm = function closeForm() {
    console.log('We will close and go back to cart');
    document.getElementById("popupForm").style.display = "none";
    $("#enclosing").removeClass("disable-content");
}


/** @ Nikita Kapoor
 * closes delivery address window when clicked outside */
document.addEventListener("mouseup", function (event) {
    var container = $("#popupForm");
    if (container != null || container != undefined) {
        if (!container.is(event.target) && container.has(event.target).length === 0) {
            closeForm();
        }
    }

});



//NK - global variable to store and fetch delivery addres to/from localstorage
var address = [];
if (localStorage.getItem('address')) {
    address = JSON.parse(localStorage.getItem('address'));
}


/**  @ Nikita Kapoor
 * validate the address entered and store in local storage
 * call fieldRequiredValidation() to perform actal validations on input fields*/
displayOrderSummary = function displayOrderSummary() {
    console.log('order summary will display here : ', $("#personName"));
    var name = document.getElementById("personName").value.trim();
    var line1 = document.getElementById("line1").value.trim();
    var line2 = document.getElementById("line2").value.trim();
    var city = document.getElementById("city").value.trim();
    var province = document.getElementById("province").value.trim();
    var postalCode = document.getElementById("postalCode").value.trim();
    var country = document.getElementById("country").value.trim();
    var phone = document.getElementById("phone").value.trim();
    console.log(name, ' | ', line1);
    var allValid = fieldRequiredValidation(name, line1, city, province, postalCode, country, phone);
    console.log('allValid : ' + allValid);
    if (allValid == true) {
        address = {
            name: name,
            line1: line1,
            line2: line2,
            city: city,
            province: province,
            postalCode: postalCode,
            country: country
        };
        console.log('address : ', address);
        localStorage.setItem('address', JSON.stringify(address));
        /**
         * Rajwant Kaur- Redirect on thank you page, once user confirmed its  address.
         */
        if (confirm("Please confirm all of your details are correct")) {// Rajwant Kaur- Confirmation popup for address details
            window.location.href = 'thankyou.html'; //  Rajwant Kaur - Display Thankyou page once address is confirmed.
            localStorage.removeItem("itemList"); //Rajwant Kaur- Remove purchased items list from local storage

        }
    }
    else {
        console.log('Some validation failed. Check with Admin');
    }
}


/** @ Nikita Kapoor
 * fieldRequiredValidation() perfoems various checks on values enter in input fields
 * displays appropriate messages for correction
 */
function fieldRequiredValidation(name, line1, city, province, postalCode, country, phone) {
    console.log('Inside validation');
    var reqfield = [];
    if (name == "" || name == null) {
        reqfield.push("personName");
    }
    if (phone == "" || phone == null) {
        reqfield.push("phone");
    }
    if (line1 == "" || line1 == null) {
        reqfield.push("line1");
    }
    if (city == "" || city == null) {
        reqfield.push("city");
    }
    if (province == "" || province == null) {
        reqfield.push("province");
    }
    if (postalCode == "" || postalCode == null) {
        reqfield.push("postalCode");
    }
    if (country == "" || country == null) {
        reqfield.push("country");
    }
    console.log("reqfield : ", reqfield);
    if (reqfield.length > 0) {
        var msg = "Please enter Required Fields:\n";
        for (i = 0; i < reqfield.length; i++) {
            msg += "-  " + reqfield[i] + "\n";
        }
        confirm(msg);
    } else {
        console.log("return true");
        var msg = '';

        // province code check
        if (/^[A-Z]{1,2}$/.test(province) != true) {
            msg += "Please enter only 2 uppercase letters in Provice Code. ";
        }

        //postal code check
        if (/[A-Z]{1}\d[A-Z]{1}\d[A-Z]{1}\d$/.test(postalCode) != true) {
            msg += "Please enter 6 letter postal code in format A2B3C1. ";
        }

        //name character length check
        if (/^[a-z\s\.']+$/i.test(name) != true || name.length > 100) {
            msg += "Max 100 characters containing only letters, . and ' are allowed in Name. ";
        }

        //City character length check
        if (/^[a-zA-Z]*$/.test(city) != true || city.length > 100) {
            msg += "Max 100 characters and only alphabets are allowed for City. ";
        }

        //Country character length check
        if (/^[a-zA-Z]*$/.test(country) != true || country.length > 100) {
            msg += "Max 100 characters and only alphabets are allowed for Country. ";
        }


        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone) != true || phone.length > 100) {
            msg += "Enter correct phone format - 123 456 7891 or 123-456-7891. ";

        }


        document.getElementById("valMsg").innerHTML = msg;
        // RK- Return true only if msg is true
        if (msg == '') {
            return true;
        }
        return false;
    }
}


/** @ Nikita Kapoor
 * Clear all the fields of delivery address
 */
resetAddressForm = function resetAddressForm() {
    document.getElementById("personName").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("line1").value = '';
    document.getElementById("line2").value = '';
    document.getElementById("city").value = '';
    document.getElementById("province").value = '';
    document.getElementById("postalCode").value = '';
    document.getElementById("country").value = 'Canada';
}