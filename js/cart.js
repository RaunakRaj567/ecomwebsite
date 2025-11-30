// Shopping Cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.loadFromStorage();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCartDisplay();
        this.renderCartItems();
    }
    
    setupEventListeners() {
        // Cart button
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                this.toggleCart();
            });
        }
        
        // Close cart button
        const closeCart = document.getElementById('closeCart');
        if (closeCart) {
            closeCart.addEventListener('click', () => {
                this.closeCart();
            });
        }
        
        // Cart overlay
        const cartOverlay = document.getElementById('cartOverlay');
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => {
                this.closeCart();
            });
        }
        
        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.proceedToCheckout();
            });
        }
    }
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.renderCartItems();
        
        // Show success message
        this.showNotification(`${product.name} added to cart!`, 'success');
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
        this.renderCartItems();
    }
    
    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }
        
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveToStorage();
            this.updateCartDisplay();
            this.renderCartItems();
        }
    }
    
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');
        
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
        
        if (cartTotal) {
            cartTotal.textContent = this.getTotal().toFixed(2);
        }
    }
    
    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;
        
        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                </div>
            `;
            return;
        }
        
        cartItems.innerHTML = this.items.map(item => this.createCartItemHTML(item)).join('');
        this.setupCartItemListeners();
    }
    
    createCartItemHTML(item) {
        return `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <i class="fas fa-image"></i>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease-qty" data-product-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase-qty" data-product-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" data-product-id="${item.id}">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupCartItemListeners() {
        // Quantity decrease buttons
        const decreaseButtons = document.querySelectorAll('.decrease-qty');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.quantity-btn').dataset.productId);
                const item = this.items.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity - 1);
                }
            });
        });
        
        // Quantity increase buttons
        const increaseButtons = document.querySelectorAll('.increase-qty');
        increaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.quantity-btn').dataset.productId);
                const item = this.items.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity + 1);
                }
            });
        });
        
        // Remove item buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.removeItem(productId);
            });
        });
    }
    
    toggleCart() {
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }
    
    openCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('active');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('active');
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }
    
    proceedToCheckout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }
        
        this.closeCart();
        
        // Open checkout modal
        if (window.checkout) {
            window.checkout.openModal();
        }
    }
    
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
        this.renderCartItems();
    }
    
    saveToStorage() {
        try {
            localStorage.setItem('shoppingCart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const savedCart = localStorage.getItem('shoppingCart');
            if (savedCart) {
                this.items = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            this.items = [];
        }
    }
    
    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Checkout functionality
class Checkout {
    constructor() {
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Close checkout modal
        const closeCheckout = document.getElementById('closeCheckout');
        if (closeCheckout) {
            closeCheckout.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        // Modal overlay
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        // Checkout form
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processOrder();
            });
        }
        
        // Format card number input
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
                let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                e.target.value = formattedValue;
            });
        }
        
        // Format expiry date input
        const expiryInput = document.getElementById('expiryDate');
        if (expiryInput) {
            expiryInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }
        
        // Format CVV input
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
            });
        }
    }
    
    openModal() {
        const modal = document.getElementById('checkoutModal');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (modal && modalOverlay) {
            this.updateOrderSummary();
            modal.classList.add('active');
            modalOverlay.style.display = 'block';
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal() {
        const modal = document.getElementById('checkoutModal');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (modal && modalOverlay) {
            modal.classList.remove('active');
            modalOverlay.style.display = 'none';
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }
    
    updateOrderSummary() {
        const summaryItems = document.getElementById('summaryItems');
        const summaryTotal = document.getElementById('summaryTotal');
        
        if (!window.cart || !summaryItems || !summaryTotal) return;
        
        const items = window.cart.items;
        const total = window.cart.getTotal();
        
        summaryItems.innerHTML = items.map(item => `
            <div class="summary-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
        `).join('');
        
        summaryTotal.textContent = total.toLocaleString('en-IN');
    }
    
    processOrder() {
        const form = document.getElementById('checkoutForm');
        if (!form) return;
        
        const formData = new FormData(form);
        const orderData = {
            customer: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                address: formData.get('address'),
                city: formData.get('city'),
                zipCode: formData.get('zipCode')
            },
            payment: {
                cardNumber: formData.get('cardNumber'),
                expiryDate: formData.get('expiryDate'),
                cvv: formData.get('cvv')
            },
            items: window.cart ? window.cart.items : [],
            total: window.cart ? window.cart.getTotal() : 0,
            orderDate: new Date().toISOString()
        };
        
        // Simulate order processing
        this.showProcessing();
        
        setTimeout(() => {
            this.showOrderSuccess(orderData);
            if (window.cart) {
                window.cart.clearCart();
            }
            this.closeModal();
        }, 2000);
    }
    
    showProcessing() {
        const submitBtn = document.querySelector('.place-order-btn');
        if (submitBtn) {
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            submitBtn.style.background = '#94a3b8';
        }
    }
    
    showOrderSuccess(orderData) {
        const submitBtn = document.querySelector('.place-order-btn');
        if (submitBtn) {
            submitBtn.textContent = 'Place Order';
            submitBtn.disabled = false;
            submitBtn.style.background = '#10b981';
        }
        
        // Show success notification
        if (window.cart) {
            window.cart.showNotification(
                `Order placed successfully! Order total: ₹${orderData.total.toLocaleString('en-IN')}`,
                'success'
            );
        }
        
        // Reset form
        const form = document.getElementById('checkoutForm');
        if (form) {
            form.reset();
        }
        
        // Store order in localStorage for demo purposes
        this.saveOrder(orderData);
    }
    
    saveOrder(orderData) {
        try {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push({
                ...orderData,
                id: Date.now(),
                status: 'confirmed'
            });
            localStorage.setItem('orders', JSON.stringify(orders));
        } catch (error) {
            console.error('Error saving order:', error);
        }
    }
}

// Initialize cart and checkout when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
    window.checkout = new Checkout();
});
