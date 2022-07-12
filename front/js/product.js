// Récupération des paramètres de l'URL
var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");

getProduct(id);
addToCart();


// Récupération du produit de la page
function getProduct(id) {
    fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => addProduct(data))
}

let img = document.createElement("img");
let imageCard = document.querySelector(".item__img");   

// Ajout du produit à la page
function addProduct(canape) { 
    
    // Création de l'élément "img"
    imageCard.appendChild(img);
    img.src = canape.imageUrl;
    img.alt = canape.altTxt;
  
    // Création de l'élément titre "h1" et prix "price"
    let name = document.createElement("h1");
    let p = document.createElement("p");
    let titleCard = document.querySelector(".item__content__titlePrice");
    titleCard.appendChild(name);
    titleCard.appendChild(p);
    let productPrice = document.getElementById("price");
    let productTitle= document.getElementById("title");
    productTitle.textContent = canape.name;
    productPrice.textContent = canape.price;
  
    // Création de l'élément description "p"
    let descriptionCard = document.querySelector(".item__content__description");
    descriptionCard.appendChild(p);
    let productDescription = document.getElementById("description");
    productDescription.textContent = canape.description;

    // Création de l'élément choisir une couleur "option"
    for (let i=0; i < canape.colors.length; i++) {
        const color = canape.colors[i];
        let option = document.createElement("option");
        let colorCard = document.getElementById("colors");
        colorCard.appendChild(option)
        option.textContent = color; 
        option.value = color;

    }  
}

// Confirmation commande
let confirmation = () =>{
    if(window.confirm("Votre article a bien été ajouté au panier. Pour consulter votre panier, cliquez sur OK.")) {
        window.location.href ="cart.html";
        }
    }

// Ajout du produit dans le panier
function addToCart() {
    let button = document.querySelector("#addToCart");

    // Au clic sur le bouton "Ajouter au panier"
    button.addEventListener("click",() => {
        // ******** Initialisation du panier ********
        var panier = [];
        let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));
        if (panierLocalStorage != null) {
            panier = panierLocalStorage; 
        }

        // Nommage des données dans le LS 
                // Au choix de la couleur
        let colorChoice = document.querySelector("#colors").value;
                // Au choix de la quantité
        let quantityChoice = document.querySelector("#quantity").value;
    
                // Affichage de l'id du produit 
        var str = window.location.href;
        var url = new URL(str);
        var id = url.searchParams.get("id");
    
                // Les données affichées dans le LS 
        let produit = {
            color: colorChoice,
            id: id,
            // name: (document.getElementById("title").textContent),
            // price: Number(document.getElementById("price").textContent),
            // imgsrc: img.src,
            // imgalt: img.alt,
            quantity: Number(quantityChoice),
        };

        // ******** Ajout du produit dans le panier ********
            // Si même id & même couleur = on incrémente la quantité 
        const result = panier.filter(produit => produit.id == id && produit.color == colorChoice)
        if (result.length > 0) {
            panier = panier.map(produit => {
                if (produit.id == id) {
                    return {...produit, quantity:produit.quantity + Number(quantityChoice)};
                }
                return produit;
            })
            // Si produit différent = ajout du produit dans le panier 
        } else {
            panier.push(produit)
        }

            // Si aucun article n'est selectionné
        if (colorChoice == null || colorChoice === "" || quantityChoice == null || quantityChoice == 0 ) {
        alert ("Merci de selectionner une couleur et une quantité");
        return;
        }

        // ******** Sauvegarde du panier dans le LS ********
        localStorage.setItem("produit", JSON.stringify(panier))
        confirmation();
    })
}