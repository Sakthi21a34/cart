const products = [
    { id: 1, name: 'Smart Watch', price: 2000.00, img: 'watch.jpg' },
    { id: 2, name: 'OPPO F23 Phone', price: 20000.00, img: 'phone.jpg' },
    { id: 3, name: 'Lenovo Laptop', price: 25000.00, img: 'laptop.jpg' },
    { id: 4, name: 'Speaker', price: 1000.00, img: 'speaker.jpg' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.img}" alt="${product.name}">
            <span>${product.name} - Rs.${product.price.toFixed(2)}</span>
            <a href="#" class="btn btn-primary" onclick="addToCart(${product.id}); return false;">Add to Cart</a>
        </div>
    `).join('');
}

function displayCartCount() {
    const cartCount = document.getElementById('cart-count');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    alert(`${product.name} added to cart.`);

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayCartCount();
});