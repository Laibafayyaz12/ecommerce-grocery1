// 20 grocery products
let products = [
    {name: 'Rice 5kg', price: 50, category: 'Rice', img: 'images/rice.jpg'},
    {name: 'Cooking Oil 1L', price: 30, category: 'Oil', img: 'images/oil.jpg'},
    {name: 'Sugar 2kg', price: 25, category: 'Sugar', img: 'images/sugar.jpg'},
    {name: 'Wheat Flour 5kg', price: 40, category: 'Flour', img: 'images/flour.jpg'},
    {name: 'Tea 500g', price: 20, category: 'Tea', img: 'images/tea.jpg'},
    {name: 'Salt 1kg', price: 10, category: 'Salt', img: 'images/salt.jpg'},
    {name: 'Milk 1L', price: 15, category: 'Milk', img: 'images/milk.jpg'},
    {name: 'Butter 200g', price: 18, category: 'Butter', img: 'images/butter.jpg'},
    {name: 'Eggs 12pcs', price: 25, category: 'Eggs', img: 'images/eggs.jpg'},
    {name: 'Honey 250g', price: 35, category: 'Honey', img: 'images/honey.jpg'},
    {name: 'Jam 200g', price: 20, category: 'Jam', img: 'images/jam.jpg'},
    {name: 'Biscuits 300g', price: 15, category: 'Biscuits', img: 'images/biscuits.jpg'},
    {name: 'Cheese 250g', price: 30, category: 'Cheese', img: 'images/cheese.jpg'},
    {name: 'Yogurt 500g', price: 20, category: 'Yogurt', img: 'images/yogurt.jpg'},
    {name: 'Noodles 400g', price: 10, category: 'Noodles', img: 'images/noodles.jpg'},
    {name: 'Cereal 500g', price: 25, category: 'Cereal', img: 'images/cereal.jpg'},
    {name: 'Chocolates 100g', price: 15, category: 'Chocolates', img: 'images/chocolates.jpg'},
    {name: 'Coffee 250g', price: 35, category: 'Coffee', img: 'images/coffee.jpg'},
    {name: 'Peanut Butter 200g', price: 30, category: 'Peanut Butter', img: 'images/peanut_butter.jpg'},
    {name: 'Soft Drink 1.5L', price: 20, category: 'Soft Drink', img: 'images/soft_drink.jpg'}
];

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart
function addToCart(productName, price) {
    cart.push({name: productName, price: price});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart 🛒`);
}

// Display products
function displayProducts(list){
    const container = document.getElementById('products-container');
    if(!container) return;
    container.innerHTML = '';
    list.forEach(product => {
        container.innerHTML += `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart 🛒</button>
        </div>`;
    });
}

// Search
let searchInput = document.getElementById('searchInput');
if(searchInput){
    searchInput.addEventListener('input', function(){
        let value = this.value.toLowerCase();
        let filtered = products.filter(p => p.name.toLowerCase().includes(value));
        displayProducts(filtered);
    });
}

// Category filter
function filterCategory(category){
    if(category === 'All') displayProducts(products);
    else{
        let filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// Cart page
window.onload = function(){
    displayProducts(products);
    let cartItemsDiv = document.getElementById('cart-items');
    if(cartItemsDiv){
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach((item,index)=>{
            cartItemsDiv.innerHTML += `<p>${item.name} - $${item.price} <button onclick="removeItem(${index})">Remove</button></p>`;
            total += item.price;
        });
        document.getElementById('total').innerText = 'Total: $' + total;
    }
}

// Remove item
function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}