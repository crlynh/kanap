let button = document.querySelector("#order");
let panier = []
panier.forEach((items) => addProduct(items))

let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));
let commande = JSON.parse(localStorage.getItem("commande"));

let items = localStorage.produit;

addConsole(items);
addProduct();

function addConsole(items) { 
    for (let i=0; i < items; i++){ 
        let productCanape = JSON.parse(localStorage.getItem(localStorage.key(i)));
        panier.push(productCanape)
    }
}

// Ajout du produit à la page
function addProduct(items) { 

    let img = document.createElement("img");
    img.src = items.imageUrl
    img.alt = items.alt;
    return img

}  

