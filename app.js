document.addEventListener('DOMContentLoaded', function () {
    

    const cart = []; 

    
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityEl.textContent);
        const product = {
            name: 'Fall Limited Edition Sneakers',
            price: 125.0,
            quantity: quantity,
            image: 'https://placehold.co/50x50/orange/white?text=Sneakers',
        };

        addToCart(product);
        renderCart();
    });


    function addToCart(product) {
        const existingProduct = cart.find((item) => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push(product);
        }
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
            cartCount.style.display = 'none';
        } else {
            cartCount.style.display = 'flex';
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

            cartItems.innerHTML = cart
                .map(
                    (item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="Product thumbnail">
                    <div class="item-details">
                        <p>${item.name}</p>
                        <p>$${item.price.toFixed(2)} x ${item.quantity} <span class="total">$${(item.price * item.quantity).toFixed(2)}</span></p>
                    </div>
                    <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `
                )
                .join('');

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.closest('button').dataset.index);
                    removeFromCart(index);
                });
            });
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
    }

    
    renderCart();
});
