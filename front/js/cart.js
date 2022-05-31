let numberOfItems = localStorage.length
addConsole(numberOfItems);
addProducts(canapes);

function addConsole(numberOfItems) { 
    for (let i=0; i < numberOfItems; i++){ 
        let productCart = localStorage.getItem(localStorage.key(i));
        let productCanape = JSON.parse(productCart);
        let cart = []
        cart.push(productCanape)
    }
}


function addProducts(canapes) {
    for (let i=0; i < canapes; i++) {
    const canape = canapes[i];
    console.log(i)
    }
}