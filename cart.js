let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
    const cartList = document.getElementById('cart-list');
    const totalAmount = document.getElementById('total-amount');

    cartList.innerHTML = cart.map(item => `
        <div class="cart-item" id="cart-item-${item.id}">
            <img src="${item.img}" alt="${item.name}">
            <span>${item.name} - Rs.${item.price.toFixed(2)} x ${item.quantity}</span>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = total.toFixed(2);

    cart.forEach(item => {
        const element = document.getElementById(`cart-item-${item.id}`);
        if (element && !element.classList.contains('fade-in')) {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, 0);
        }
    });
}

function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});