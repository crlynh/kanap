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
let form = document.querySelector(".cart__order__form")
let inputFirstName = document.querySelector("#firstName");
let inputLastName = document.querySelector("#lastName");
let inputAddress = document.querySelector("#address");
let inputCity = document.querySelector("#city");
let inputEmail = document.querySelector("#email")
let submit = document.querySelector("#order")

getForm()
function getForm() { 
    let regularRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');


    // FIRST NAME
    function valueFirstName() {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

        if (regularRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
        }
    }

    form.firstName.addEventListener('change', () => {
        valueFirstName(this);
    })

    // LAST NAME
    function valueLastName() {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

        if (regularRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
        }
    }

    form.lastName.addEventListener('change', () => {
        valueLastName(this);
    })

    // ADRESSE
    function valueAddress() {
        let addressErrorMsg = document.getElementById("addressErrorMsg");

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse valide.';
        }
    }

    form.address.addEventListener('change', () => {
        valueAddress(this);
    })

    // VILLE
    function valueCity() {
        let cityErrorMsg = document.getElementById("cityErrorMsg");

        if (regularRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner une ville.';
        }
    }

    form.city.addEventListener('change', () => {
        valueCity(this);
    })

    // EMAIL
    function valueEmail() {
        let emailErrorMsg = document.getElementById("emailErrorMsg");

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    }

    form.email.addEventListener('change', () => {
        valueEmail(this);
    })

}

// Envoie de la requête au back
submitForm();
function submitForm() {

    submit.addEventListener('click', (e) => {
        e.preventDefault();

        let formValues = {
            firstName : inputFirstName.value,
            lastName : inputLastName.value,
            address : inputAddress.value,
            city : inputCity.value,
            email : inputEmail.value
          }

        if (!formValues.firstName || !formValues.lastName || !formValues.address || !formValues.city || !formValues.email) {
            alert("Merci de renseigner toutes les informations")
            return
        } else {

            let products = [];
            for (let i=0; i < panierLocalStorage.length; i++) {
                products.push(panierLocalStorage[i].id);
            }

            let formData = {
                products : products,
                contact : formValues,
            }

            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    window.location.href = './confirmation.html?id='+ data.orderId;
                })
                .catch((err) => console.error(err))
    }
    })
}