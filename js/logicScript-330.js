/* @author: Jagraj Kaur
   @FileDescripton: This is a common javascript file to handle all the logic part for the website 
*/

/* JK - Common inbuild javascript function to find the DOM element by ID */
$ = function(id){
    return document.getElementById(id);
}

/* onload function is used to implement the changes on the html page
 after the html content is completely rendered on the page */
window.onload = function(){
    init();

    /* This fucntion is used to call the shopping cart function to reload the function calling after DOM is loaded */
    readyFunc();
}

var init = function(){
    $('sub_category').innerHTML = "(Women's Wear)";
    $('sub_category-options').innerHTML = womens_category_options;
    $('sub_product-images').innerHTML = women_product_images;

    $('women_all_id').addEventListener('click', women_product_all);
    $('women_tops_id').addEventListener('click', women_product_tops);
    $('women_dresses_id').addEventListener('click', women_product_dresses);
    $('women-formals-id').addEventListener('click', women_product_formals);
    $('women-pants-id').addEventListener('click', women_product_pants);
    $('women-tshirts-id').addEventListener('click', women_product_tshirts);
}

const womens_category_options = `
    <div class="d-flex-col">
        <img class="options-img" src="./images/category/womens/fashion.png" alt="ALL">
        <p class="caption text-center options-text selected" id="women_all_id">All</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/womens/crop-top.png" alt="Tops">
        <p class="caption text-center options-text" id="women_tops_id">Tops</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/womens/woman-clothes.png" alt="Dress">
        <p class="caption text-center options-text" id="women_dresses_id">Dress</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/womens/suit.png" alt="Formal">
        <p class="caption text-center options-text" id="women-formals-id">Formals</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/womens/loose-pants.png" alt="Pants">
        <p class="caption text-center options-text" id="women-pants-id">Pants</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/womens/t-shirt.png" alt="T-shirt">
        <p class="caption text-center options-text" id="women-tshirts-id">TShirt</p>
    </div>
`;

const mens_category_options = `
    <div class="d-flex-col">
        <img class="options-img" src="./images/category/mens/male-clothes.png" alt="ALL">
        <p class="caption text-center options-text selected">All</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/mens/shirt.png" alt="ALL">
        <p class="caption text-center options-text">Shirts</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/mens/formals.png" alt="ALL">
        <p class="caption text-center options-text">Formals</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/mens/t-shirts.png" alt="ALL">
        <p class="caption text-center options-text">TShirts</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/mens/trouser.png" alt="ALL">
        <p class="caption text-center options-text">Trousers</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/mens/jacket.png" alt="ALL">
        <p class="caption text-center options-text">Jackets</p>
    </div>
`;

const winter_category_options = `
    <div class="d-flex-col">
        <img class="options-img" src="./images/category/winter/winter-clothing.png" alt="ALL">
        <p class="caption text-center options-text selected">All</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/winter/jumper.png" alt="ALL">
        <p class="caption text-center options-text">Jumper</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/winter/gloves.png" alt="ALL">
        <p class="caption text-center options-text">Gloves</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/winter/beanie.png" alt="ALL">
        <p class="caption text-center options-text">Beanie</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/winter/boots.png" alt="ALL">
        <p class="caption text-center options-text">Boots</p>
    </div>

    <div class="d-flex-col">
        <img class="options-img" src="./images/category/winter/winterJacket.png" alt="ALL">
        <p class="caption text-center options-text">Jackets</p>
    </div>
`;

/* JK - This is a common function which is used to generate the card HTML based on the provided product details */
const getProductCardHTML = function(productDetails){
    var tempHTML = `
    <div class="product-container">
        <img class="product-image image-icon" src="${productDetails.url}" alt="${productDetails.productName}">
        <div class="product-details">
            <div class="pt-1em pl-1em">
                <p class="subhead-2">${productDetails.productName}</p>
                <p class="d-flex align-item-center label">
                    <span class="material-symbols-rounded">star_half</span>
                    <span>4.6</span>
                </p>
            </div>

            <div class="pl-1em pb-1em">
                <p class="label">
                    <span class="text-strike-light normal-price">${productDetails.price}</span>
                    <span class="final-price">${productDetails.finalPrice}</span>
                </p>
                <div class="d-flex">
                    <button class="scale-down-half btn btn-primary btn-add-to-cart">Buy Now</button>
                    <button class="scale-down-half btn btn-icon filled-on-hover" onclick="openProductCardPopup(this);">
                        <span class="material-symbols-rounded color-pink">
                            visibility
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    return tempHTML;
}


/* START :: To create the Women's Products cards HTML */
var greenFrockCardHTML = getProductCardHTML({
    url : "./images/products/womens/all/green-frock.webp",
    productName : "Green Frock",
    price : "$15",
    finalPrice : "$12" 
});

var redDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/all/red-dress.jpg",
    productName : "Red Dress",
    price : "$30",
    finalPrice : "$25" 
});

var blackFrockCardHTML = getProductCardHTML({
    url : "./images/products/womens/all/black-dress.jpg",
    productName : "Black Frock",
    price : "$12",
    finalPrice : "$10" 
});

var checkDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/all/check-dress.jpg",
    productName : "Check Dress",
    price : "$14",
    finalPrice : "$12" 
});

var formalDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/all/formal-dress.jpg",
    productName : "Formal Dress",
    price : "$20",
    finalPrice : "$16" 
});

var whiteDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/all/white-dress.png",
    productName : "White Dress",
    price : "$25",
    finalPrice : "$21" 
});

var blackDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/all/black-dress.webp",
    productName : "Black Dress",
    price : "$28",
    finalPrice : "$24" 
});

var purpleDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/all/purple-dress.png",
    productName : "Purple Dress",
    price : "$26",
    finalPrice : "$22" 
});
/* END :: To create the Women's Products cards HTML*/

const women_product_images = greenFrockCardHTML + redDressCardHTML 
        + blackFrockCardHTML + checkDressCardHTML + formalDressCardHTML
        + whiteDressCardHTML + blackDressCardHTML + purpleDressCardHTML;

/* ------------------------------------------------- */

/* START :: To create the Men's Products cards HTML */
var casualDressCardHTML = getProductCardHTML({
    url : "./images/products/mens/all/casual-dress.png",
    productName : "Casual Dress",
    price : "$15",
    finalPrice : "$12" 
});

var checkCoatCardHTML = getProductCardHTML({
    url : "./images/products/mens/all/check-coat.png",
    productName : "Check Coat",
    price : "$30",
    finalPrice : "$25" 
});

var blackTShirtCardHTML = getProductCardHTML({
    url : "./images/products/mens/all/t-shirt.png",
    productName : "Black T-Shirt",
    price : "$12",
    finalPrice : "$10" 
});

var checkFormalCardHTML = getProductCardHTML({
    url : "./images/products/mens/all/check-formal.png",
    productName : "Check Formal Suit",
    price : "$30",
    finalPrice : "$25" 
});

var formalSuitCardHTML = getProductCardHTML({
    url : "./images/products/mens/all/formal-suit.png",
    productName : "Formal Suit",
    price : "$20",
    finalPrice : "$16" 
});

var whiteShirtCardHTML = getProductCardHTML({
    url : "./images/products/mens/all/white-shirt.png",
    productName : "White Shirt",
    price : "$15",
    finalPrice : "$12" 
});

var grayFormalsCardHTML = getProductCardHTML({
    url : "./images/products/mens/all/semi-formal-suit.png",
    productName : "Gray Formals",
    price : "$40",
    finalPrice : "$36" 
});

var greenFormalsCardHTML = getProductCardHTML({
    url : "./images/products/mens/all/green-formals.png",
    productName : "Green Formals",
    price : "$26",
    finalPrice : "$22" 
});
/* END :: To create the Men's Products cards HTML*/

const men_product_images = casualDressCardHTML + checkCoatCardHTML 
        + blackTShirtCardHTML + checkFormalCardHTML + formalSuitCardHTML
        + whiteShirtCardHTML + grayFormalsCardHTML + greenFormalsCardHTML;

/* ------------------------------------------------- */

/* START :: To create the Winter collection Products cards HTML */
var longCoatCardHTML = getProductCardHTML({
    url : "./images/products/winter/all/long-coat.png",
    productName : "Long Coat",
    price : "$29",
    finalPrice : "$25" 
});

var blackCoatCardHTML = getProductCardHTML({
    url : "./images/products/winter/all/black-coat.png",
    productName : "Black Coat",
    price : "$25",
    finalPrice : "$20" 
});

var blackJacketCardHTML = getProductCardHTML({
    url : "./images/products/winter/all/black-jacket.png",
    productName : "Black Jacket",
    price : "$22",
    finalPrice : "$18" 
});

var whiteSweaterCardHTML = getProductCardHTML({
    url : "./images/products/winter/all/white-sweater.png",
    productName : "White Turtle Neck Sweater",
    price : "$35",
    finalPrice : "$32" 
});

var singleBtnOverCoatCardHTML = getProductCardHTML({
    url : "./images/products/winter/all/single-button-overcoat.png",
    productName : "Single Button Overcoat",
    price : "$20",
    finalPrice : "$16" 
});

var pufferCoatCardHTML = getProductCardHTML({
    url : "./images/products/winter/all/puffer-coat.png",
    productName : "Puffer Coat",
    price : "$26",
    finalPrice : "$22" 
});

var beltedOvercoatCardHTML = getProductCardHTML({
    url : "./images/products/winter/all/belted-overcoat.png",
    productName : "Belted Overcoat",
    price : "$40",
    finalPrice : "$36" 
});

var patternOverCoatCardHTML = getProductCardHTML({
    url : "./images/products/winter/all/pattern-overcoat.png",
    productName : "Pattern Lapel Neck Overcoat",
    price : "$26",
    finalPrice : "$22" 
});
/* END :: To create the Winter collection Products cards HTML*/

const winter_product_images = longCoatCardHTML + blackCoatCardHTML 
        + blackJacketCardHTML + whiteSweaterCardHTML + singleBtnOverCoatCardHTML
        + pufferCoatCardHTML + beltedOvercoatCardHTML + patternOverCoatCardHTML;

/* ------------------------------------------------- */

/* START :: To create the Women's Products - Tops cards HTML */
var printedTopCardHTML = getProductCardHTML({
    url : "./images/products/womens/tops/printed-top.png",
    productName : "Printed Top",
    price : "$15",
    finalPrice : "$12" 
});

var whiteTopCardHTML = getProductCardHTML({
    url : "./images/products/womens/tops/white-top.png",
    productName : "White self Print Top",
    price : "$32",
    finalPrice : "$30" 
});

var greenFullSleeveTopCardHTML = getProductCardHTML({
    url : "./images/products/womens/tops/green-full-sleeve-top.png",
    productName : "Green Full Sleeve Top",
    price : "$15",
    finalPrice : "$13" 
});

var yellowTopCardHTML = getProductCardHTML({
    url : "./images/products/womens/tops/yellow-top.png",
    productName : "Yellow Top",
    price : "$18",
    finalPrice : "$16" 
});

var blueTopCardHTML = getProductCardHTML({
    url : "./images/products/womens/tops/blue-top.png",
    productName : "Blue Top",
    price : "$20",
    finalPrice : "$16" 
});

var greenTopCardHTML = getProductCardHTML({
    url : "./images/products/womens/tops/green-top.png",
    productName : "Green Top",
    price : "$20",
    finalPrice : "$18" 
});

var brownTopCardHTML = getProductCardHTML({
    url : "./images/products/womens/tops/brown-top.png",
    productName : "Brown Top",
    price : "$25",
    finalPrice : "$21" 
});

var blackTopCardHTML = getProductCardHTML({
    url : "./images/products/womens/tops/black-top.png",
    productName : "Black Top",
    price : "$25",
    finalPrice : "$22" 
});
/* END :: To create the Women's Products - Tops cards HTML*/

const women_top_images = printedTopCardHTML + whiteTopCardHTML
        + greenFullSleeveTopCardHTML + yellowTopCardHTML + blueTopCardHTML
        + greenTopCardHTML + brownTopCardHTML + blackTopCardHTML;

/* ------------------------------------------------- */

/* START :: To create the Women's Products - Tops cards HTML */
var beltedDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/dress/belted-dress.png",
    productName : "Belted Dress",
    price : "$15",
    finalPrice : "$12" 
});

var blackFloralDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/dress/black-floral-dress.png",
    productName : "Black Floral Dress",
    price : "$35",
    finalPrice : "$32" 
});

var burgundyDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/dress/burgundy-dress.png",
    productName : "Burgundy Dress",
    price : "$21",
    finalPrice : "$18" 
});

var lightPinkDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/dress/pink-dress.png",
    productName : "Light Pink Dress",
    price : "$18",
    finalPrice : "$16" 
});

var redVioletDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/dress/red-violet-dress.png",
    productName : "Red Violet Dress",
    price : "$25",
    finalPrice : "$22" 
});

var whiteDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/dress/white-dress.png",
    productName : "White Floral Dress",
    price : "$26",
    finalPrice : "$24" 
});

var yellowDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/dress/yellow-dress.png",
    productName : "Yellow Long Dress",
    price : "$28",
    finalPrice : "$26" 
});

var selfEmbroideryDressCardHTML = getProductCardHTML({
    url : "./images/products/womens/dress/self-embroidery-dress.png",
    productName : "Self Embroidery Dress",
    price : "$25",
    finalPrice : "$22" 
});
/* END :: To create the Women's Products - Tops cards HTML*/

const women_dress_images = beltedDressCardHTML + blackFloralDressCardHTML
        + burgundyDressCardHTML + lightPinkDressCardHTML + redVioletDressCardHTML
        + whiteDressCardHTML + yellowDressCardHTML + selfEmbroideryDressCardHTML;

/* ------------------------------------------------- */

/* START :: To create the Women's Products - Formals cards HTML */
var officeFormalsCardHTML = getProductCardHTML({
    url : "./images/products/womens/formals/office-formal.png",
    productName : "Blazer & Pocket Pants Set",
    price : "$45",
    finalPrice : "$42" 
});

var mintGreenFormalsCardHTML = getProductCardHTML({
    url : "./images/products/womens/formals/green-office-formals.png",
    productName : "Single Button Blazer & Pants",
    price : "$46",
    finalPrice : "$44" 
});

var checkFormalsCardHTML = getProductCardHTML({
    url : "./images/products/womens/formals/check-formals.png",
    productName : "Double Button Blazer & Pants",
    price : "$59",
    finalPrice : "$56" 
});

var semiFormalsCardHTML = getProductCardHTML({
    url : "./images/products/womens/formals/semi-formal.png",
    productName : "Black Top & High Waist Pants",
    price : "$29",
    finalPrice : "$26" 
});

var grayCheckFormalsCardHTML = getProductCardHTML({
    url : "./images/products/womens/formals/gray-check-formals.png",
    productName : "Check Blazer & Pants",
    price : "$54",
    finalPrice : "$50" 
});

var yellowFormalsCardHTML = getProductCardHTML({
    url : "./images/products/womens/formals/yellow-formals.png",
    productName : "Solid Button Blazer & Pants",
    price : "$56",
    finalPrice : "$54" 
});

var blueFormalsCardHTML = getProductCardHTML({
    url : "./images/products/womens/formals/blue-formals.png",
    productName : "Single Button Blazer & Pants",
    price : "$51",
    finalPrice : "$48" 
});

var bluePrintFormalsCardHTML = getProductCardHTML({
    url : "./images/products/womens/formals/blue-print-formals.png",
    productName : "Striped Print Blazer & Pants",
    price : "$51",
    finalPrice : "$46" 
});
/* END :: To create the Women's Products - Formals cards HTML*/

const women_formals_images = officeFormalsCardHTML + mintGreenFormalsCardHTML
        + checkFormalsCardHTML + semiFormalsCardHTML + grayCheckFormalsCardHTML
        + yellowFormalsCardHTML + blueFormalsCardHTML + bluePrintFormalsCardHTML;

/* ------------------------------------------------- */

/* START :: To create the Women's Products - Pants cards HTML */
var highWaistPantCardHTML = getProductCardHTML({
    url : "./images/products/womens/pants/high-waist-pants.png",
    productName : "High Waist Pants",
    price : "$26",
    finalPrice : "$22" 
});

var bluePantCardHTML = getProductCardHTML({
    url : "./images/products/womens/pants/blue-pant.png",
    productName : "Blue Plain Pant",
    price : "$35",
    finalPrice : "$32" 
});

var darkGreenPantCardHTML = getProductCardHTML({
    url : "./images/products/womens/pants/dark-green-pants.png",
    productName : "Dark Green Pant",
    price : "$45",
    finalPrice : "$41" 
});

var grayPantCardHTML = getProductCardHTML({
    url : "./images/products/womens/pants/gray-pant.png",
    productName : "Gray Pant",
    price : "$29",
    finalPrice : "$26" 
});

var purplePantCardHTML = getProductCardHTML({
    url : "./images/products/womens/pants/purple-pants.png",
    productName : "Purple Pant",
    price : "$43",
    finalPrice : "$40" 
});

var redPantCardHTML = getProductCardHTML({
    url : "./images/products/womens/pants/red-pant.png",
    productName : "Red Pant",
    price : "$26",
    finalPrice : "$22" 
});

var whitePantCardHTML = getProductCardHTML({
    url : "./images/products/womens/pants/white-pant.png",
    productName : "White Pant",
    price : "$29",
    finalPrice : "$25" 
});

var blackPantCardHTML = getProductCardHTML({
    url : "./images/products/womens/pants/wide-leg-pants.png",
    productName : "Wide Leg Black Pant",
    price : "$38",
    finalPrice : "$34" 
});
/* END :: To create the Women's Products - Pants cards HTML*/

const women_pants_images = highWaistPantCardHTML + bluePantCardHTML
        + darkGreenPantCardHTML + grayPantCardHTML + purplePantCardHTML
        + redPantCardHTML + whitePantCardHTML + blackPantCardHTML;

/* ------------------------------------------------- */

/* START :: To create the Women's Products - T-Shirts cards HTML */
var blackTshirtCardHTML = getProductCardHTML({
    url : "./images/products/womens/tshirts/black-tshirt.png",
    productName : "Black T-Shirt",
    price : "$28",
    finalPrice : "$24" 
});

var blueTshirtCardHTML = getProductCardHTML({
    url : "./images/products/womens/tshirts/blue-tshirt.png",
    productName : "Blue T-Shirt",
    price : "$25",
    finalPrice : "$22" 
});

var dropShoulderTshirtCardHTML = getProductCardHTML({
    url : "./images/products/womens/tshirts/drop-shoulder-tshirt.png",
    productName : "Drop Shoulder T-Shirt",
    price : "$36",
    finalPrice : "$32" 
});

var grayTshirtCardHTML = getProductCardHTML({
    url : "./images/products/womens/tshirts/gray-tshirt.png",
    productName : "Gray T-Shirt",
    price : "$26",
    finalPrice : "$22" 
});

var oversizedTshirtCardHTML = getProductCardHTML({
    url : "./images/products/womens/tshirts/oversized-tshirt.png",
    productName : "Oversized Black T-Shirt",
    price : "$43",
    finalPrice : "$40" 
});

var pinkTshirtCardHTML = getProductCardHTML({
    url : "./images/products/womens/tshirts/pink-tshirt.png",
    productName : "Pink T-Shirt",
    price : "$34",
    finalPrice : "$30" 
});

var printTshirtCardHTML = getProductCardHTML({
    url : "./images/products/womens/tshirts/print-tshirt.png",
    productName : "Print T-Shirt",
    price : "$25",
    finalPrice : "$22" 
});

var whiteTShirtCardHTML = getProductCardHTML({
    url : "./images/products/womens/tshirts/white-tshirt.png",
    productName : "White T-Shirt",
    price : "$34",
    finalPrice : "$29" 
});
/* END :: To create the Women's Products - T-Shirts cards HTML*/

const women_tshirts_images = blackTshirtCardHTML + blueTshirtCardHTML
        + dropShoulderTshirtCardHTML + grayTshirtCardHTML + oversizedTshirtCardHTML
        + pinkTshirtCardHTML + printTshirtCardHTML + whiteTShirtCardHTML;






/* JK - To change the content of the selected type - Women's Wear */
$('womens_wear_nav_id').addEventListener("click", function(){
    $('sub_category').innerHTML = "(Women's Wear)";
    $('sub_category-options').innerHTML = womens_category_options;
    $('sub_product-images').innerHTML = women_product_images;

    $('women_all_id').addEventListener('click', women_product_all);
    $('women_tops_id').addEventListener('click', women_product_tops);
    $('women_dresses_id').addEventListener('click', women_product_dresses);
    $('women-formals-id').addEventListener('click', women_product_formals);
    $('women-pants-id').addEventListener('click', women_product_pants);
    $('women-tshirts-id').addEventListener('click', women_product_tshirts);
});

/* JK - To change the content of the selected type - Men's Wear */
$('mens_wear_nav_id').addEventListener("click", function(){
    $('sub_category').innerHTML = "(Men's Wear)";
    $('sub_category-options').innerHTML = mens_category_options;
    $('sub_product-images').innerHTML = men_product_images;
});

/* JK - To change the content of the selected type - Winter Collection */
$('winter_wear_nav_id').addEventListener("click", function(){
    $('sub_category').innerHTML = "(Winter Collection)";
    $('sub_category-options').innerHTML = winter_category_options;
    $('sub_product-images').innerHTML = winter_product_images;
});


/* JK - To change the sub-category based the selected type - women's all */
var women_product_all = function(){
    $('women_all_id').classList.add('selected');
    $('women_tops_id').classList.remove('selected');
    $('women_dresses_id').classList.remove('selected');
    $('women-formals-id').classList.remove('selected');
    $('women-pants-id').classList.remove('selected');
    $('women-tshirts-id').classList.remove('selected');

    $('sub_product-images').innerHTML = women_product_images;
}


/* JK - To change the sub-category based the selected type - women's tops */
var women_product_tops = function(){
    $('women_all_id').classList.remove('selected');
    $('women_dresses_id').classList.remove('selected');
    $('women_tops_id').classList.add('selected');
    $('women-formals-id').classList.remove('selected');
    $('women-pants-id').classList.remove('selected');
    $('women-tshirts-id').classList.remove('selected');

    $('sub_product-images').innerHTML = women_top_images;
}

/* JK - To change the sub-category based the selected type - women's Dresses */
var women_product_dresses = function(){
    $('women_all_id').classList.remove('selected');
    $('women_tops_id').classList.remove('selected');
    $('women_dresses_id').classList.add('selected');
    $('women-formals-id').classList.remove('selected');
    $('women-pants-id').classList.remove('selected');
    $('women-tshirts-id').classList.remove('selected');

    $('sub_product-images').innerHTML = women_dress_images;
}

/* JK - To change the sub-category based the selected type - women's Formals */
var women_product_formals = function(){
    $('women_all_id').classList.remove('selected');
    $('women_tops_id').classList.remove('selected');
    $('women_dresses_id').classList.remove('selected');
    $('women-formals-id').classList.add('selected');
    $('women-pants-id').classList.remove('selected');
    $('women-tshirts-id').classList.remove('selected');
    
    $('sub_product-images').innerHTML = women_formals_images;
}

/* JK - To change the sub-category based the selected type - women's Pants */
var women_product_pants = function(){
    $('women_all_id').classList.remove('selected');
    $('women_tops_id').classList.remove('selected');
    $('women_dresses_id').classList.remove('selected');
    $('women-formals-id').classList.remove('selected');
    $('women-pants-id').classList.add('selected');
    $('women-tshirts-id').classList.remove('selected');

    $('sub_product-images').innerHTML = women_pants_images;
}

/* JK - To change the sub-category based the selected type - women's T-Shirts */
var women_product_tshirts = function(){
    $('women_all_id').classList.remove('selected');
    $('women_tops_id').classList.remove('selected');
    $('women_dresses_id').classList.remove('selected');
    $('women-formals-id').classList.remove('selected');
    $('women-pants-id').classList.remove('selected');
    $('women-tshirts-id').classList.add('selected');

    $('sub_product-images').innerHTML = women_tshirts_images;
}

// Get the product card popup elements
var productCardPopup = $("productCardPopup");
var productCardPopupContent = $("productCardPopupContent");
var productCardPopupClose = $("productCardPopupClose");

/* Function to open the product card popup with product details */
function openProductCardPopup(viewButton) {
    var productDetailsHTML = viewButton.parentElement.parentElement.parentElement.parentElement;
    var title = productDetailsHTML.getElementsByClassName('subhead-2')[0].innerText;
    var normalPrice = productDetailsHTML.getElementsByClassName('normal-price')[0].innerText;
    var finalPrice = productDetailsHTML.getElementsByClassName('final-price')[0].innerText;

    productDetailsHTML = productDetailsHTML.outerHTML; // Insert product card HTML into the popup
    var popUpHTML = `
        <div class="row d-flex">
            <div class="col-3" id="popup-image-id">`+productDetailsHTML+`</div>
            <div class="col-6" id="popup-content-id"> 
                <h2>Product Name : `+title+` </h2><br>
                <h2>Product Price : `+normalPrice+` </h2><br>
                <h2>Discounted Price : `+finalPrice+` </h2>
            </div>
        </div>
    `;

    productCardPopupContent.innerHTML = popUpHTML;
    productCardPopup.style.display = "block"; // Show the popup
}

/* Function to close the product card popup */
function closeProductCardPopup() {
    productCardPopup.style.display = "none"; // Hide the popup
}

/* Add event listener to the product card popup close button */
productCardPopupClose.addEventListener("click", closeProductCardPopup);