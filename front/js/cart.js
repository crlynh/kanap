let button = document.querySelector("#order");

let panier = []
let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));

if (!panierLocalStorage || panierLocalStorage.length === 0) {

    let titleCart = document.querySelector("h1");
    let sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide";
    sectionCart.style.display = "none";

} else {

    for (let i=0; i < panierLocalStorage.length; i++){ 
        panier.push(panierLocalStorage);
        let PLSlength = panierLocalStorage.length;

        // Création de l'élément "article"
        let cartItems = document.getElementById("cart__items");
        let cartItem = document.createElement("article");
        cartItem.classList.add("cart__item");
        cartItems.appendChild(cartItem);
        
        // Création de l'élément "img"
        let cartImg = document.createElement("div");
        cartImg.classList.add("cart__item__img");
        let img = document.createElement("img");
        img.src = panierLocalStorage[i].imgsrc;
        img.alt = panierLocalStorage[i].imgalt;
        cartImg.appendChild(img);
        cartItem.appendChild(cartImg);
        
        // Création des éléments "description" pour le nom, la couleur et le prix 
        let cartContent = document.createElement("div");
        cartContent.classList.add("cart__item__content");
        cartItem.appendChild(cartContent);

        let cartContentDescription = document.createElement("div");
        cartContentDescription.classList.add("cart__item__content__description")
        cartContent.appendChild(cartContentDescription)
        let productName = document.createElement("h2");
        let productInfo = document.createElement("p");
        let productPrice = document.createElement("p")
        productName.textContent = panierLocalStorage[i].name;
        productInfo.textContent = panierLocalStorage[i].color;
        productPrice.textContent = panierLocalStorage[i].price + "€";
        cartContentDescription.appendChild(productName);
        cartContentDescription.appendChild(productInfo);
        cartContentDescription.appendChild(productPrice)

        // Création des éléments "settings" pour la quantité et la suppression
        let settings = document.createElement("div");
        settings.classList.add("cart__item__content__settings");
        cartItem.appendChild(settings);

        let settingsQty = document.createElement("div");
        settingsQty.classList.add("cart__item__content__settings__quantity");
        settings.appendChild(settingsQty);

        let qty = document.createElement("p");
        settingsQty.appendChild(qty);
        qty.textContent = "Qté : "

        let qtyNumber = document.createElement("input");
        qtyNumber.classList.add("itemQuantity");
        settingsQty.appendChild(qtyNumber);
        qtyNumber.setAttribute("type", "number");
        qtyNumber.setAttribute("min", "1");
        qtyNumber.setAttribute("max", "100");
        qtyNumber.setAttribute ("value", panierLocalStorage[i].quantity)

        let settingsDelete = document.createElement("div");
        settingsDelete.classList.add("cart__item__content__settings__delete");
        settings.appendChild(settingsDelete);

        let deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        settingsDelete.appendChild(deleteItem);
        deleteItem.textContent = "Supprimer";

        // Suppression d'un article du panier 
        deleteItem.addEventListener("click", () => { 
            let itemToDelete = panierLocalStorage.filter(produit => produit.id !== panierLocalStorage[i].id && produit.color !== panierLocalStorage[i].color);
            localStorage.setItem("produit", JSON.stringify(itemToDelete));
            alert("Votre article a bien été supprimé");
            cartItem.remove();
            location.reload();
            totals();
        })        
    } 
}  

// Mise à jour de la quantité totale et du prix total 
totals()
function totals() {
    let itemQty = document.getElementsByClassName("itemQuantity");

    // Ajout de la quantité totale
    totalQty = 0;
    for (let i = 0; i < itemQty.length; ++i) {
        totalQty += itemQty[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.textContent = totalQty;

    // Ajout du prix total
    totalPrice = 0
    for (let i = 0; i < itemQty.length; ++i) {
        totalPrice += (itemQty[i].valueAsNumber * panierLocalStorage[i].price)
    }

    let productTotalPrice = document.getElementById("totalPrice");
    productTotalPrice.textContent = totalPrice;
}

// Changement de la quantité  
quantities()
function quantities() {
    let newQty = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < newQty.length; ++i) {
        newQty[i].addEventListener("change", () => {
            
            let changeQty = panierLocalStorage[i].quantity;
            let changeValue = newQty[i].valueAsNumber;

            let itemToChange = panierLocalStorage.find((produit) => produit.changeValue !== changeQty);

            panierLocalStorage[i].quantity = changeValue;

            localStorage.setItem("produit", JSON.stringify(panierLocalStorage));
            totals();
        })
    }
}

// Formulaire
form()
function form() {
    let form = document.querySelector(".cart__order__form");

    let nameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');


    // FIRST NAME
    let valueFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (nameRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    }

    form.firstName.addEventListener('change', function() {
        valueFirstName(this);
    })

    // LAST NAME
    let valueLastName = function(inputLastName) {
        let lastNameErrorMsg = document.getElementById("firstNameErrorMsg");

        if (nameRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    }

    form.lastName.addEventListener('change', function() {
        valueLastName(this);
    })

    // ADRESSE
    let valueAddress = function(inputAddress) {
        let addressErrorMsg = document.getElementById("addressErrorMsg");

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    }

    form.address.addEventListener('change', function() {
        valueAddress(this);
    })

    // VILLE
    let valueCity = function(inputCity) {
        let cityErrorMsg = document.getElementById("cityErrorMsg");

        if (nameRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    }

    form.city.addEventListener('change', function() {
        valueCity(this);
    })

    // EMAIL
    let valueEmail = function(inputEmail) {
        let emailErrorMsg = document.getElementById("emailErrorMsg");

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    }

    form.email.addEventListener('change', function() {
        valueEmail(this);
    })

}


    let orderButton = document.querySelector("#order")
orderButton.addEventListener("click", () => submitForm())

function submitForm() {
    let form = document.querySelector(".cart__order__form")
}