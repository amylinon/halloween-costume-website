// Halloween Costume Website JavaScript

// Sample product data
const products = [
    {
        id: 1,
        name: "Vampire Lord",
        price: 89.99,
        description: "Premium vampire costume with cape and fangs",
        emoji: "🧛",
        category: "adults"
    },
    {
        id: 2,
        name: "Spooky Ghost",
        price: 45.99,
        description: "Classic ghost costume with flowing fabric",
        emoji: "👻",
        category: "kids"
    },
    {
        id: 3,
        name: "Witch's Brew",
        price: 79.99,
        description: "Complete witch costume with hat and broom",
        emoji: "🧙",
        category: "adults"
    },
    {
        id: 4,
        name: "Pumpkin King",
        price: 65.99,
        description: "Fun pumpkin costume for kids",
        emoji: "🎃",
        category: "kids"
    },
    {
        id: 5,
        name: "Batman & Catwoman",
        price: 149.99,
        description: "Dynamic duo couple's costume set",
        emoji: "🦇",
        category: "couples"
    },
    {
        id: 6,
        name: "Zombie Apocalypse",
        price: 95.99,
        description: "Realistic zombie costume with makeup kit",
        emoji: "🧟",
        category: "adults"
    },
    {
        id: 7,
        name: "Cute Bat",
        price: 35.99,
        description: "Adorable bat costume for pets",
        emoji: "🦇",
        category: "pets"
    },
    {
        id: 8,
        name: "Skeleton Warrior",
        price: 85.99,
        description: "Bone-chilling skeleton costume",
        emoji: "💀",
        category: "adults"
    }
];

// Shopping cart
let cart = [];
let cartCount = 0;

// DOM elements
const productGrid = document.getElementById('productGrid');
const cartModal = document.getElementById('cartModal');
const cartCountElement = document.querySelector('.cart-count');
const cartItemsElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const closeModal = document.querySelector('.close');
const clearCartBtn = document.getElementById('clearCart');
const checkoutBtn = document.getElementById('checkout');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    startCountdownTimer();
    setupSmoothScrolling();
    setupMobileMenu();
});

// Load products into the grid
function loadProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            ${product.emoji}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        showCartNotification();
        animateCartIcon();
    }
}

// Update cart count display
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
}

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b35, #f7931e);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 3000;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = 'Added to cart!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Animate cart icon
function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// Setup event listeners
function setupEventListeners() {
    // Cart modal
    document.querySelector('.cart-icon').addEventListener('click', openCartModal);
    closeModal.addEventListener('click', closeCartModal);
    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', checkout);
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProductsByCategory(category);
        });
    });
    
    // Hero buttons
    document.querySelector('.btn-primary').addEventListener('click', function() {
        document.getElementById('costumes').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        document.getElementById('deals').scrollIntoView({ behavior: 'smooth' });
    });
}

// Open cart modal
function openCartModal() {
    cartModal.style.display = 'block';
    updateCartDisplay();
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Update cart display
function updateCartDisplay() {
    cartItemsElement.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p style="text-align: center; color: #ccc;">Your cart is empty</p>';
        cartTotalElement.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity(${item.id}, -1)" style="background: #ff6b35; color: white; border: none; border-radius: 5px; padding: 5px 10px; margin-right: 10px;">-</button>
                <span style="color: #ffd700; font-weight: bold;">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" style="background: #ff6b35; color: white; border: none; border-radius: 5px; padding: 5px 10px; margin-left: 10px;">+</button>
                <button onclick="removeFromCart(${item.id})" style="background: #dc3545; color: white; border: none; border-radius: 5px; padding: 5px 10px; margin-left: 10px;">Remove</button>
            </div>
        `;
        cartItemsElement.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    cartTotalElement.textContent = total.toFixed(2);
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

// Clear cart
function clearCart() {
    cart = [];
    updateCartCount();
    updateCartDisplay();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}\n\nThis is a demo website. In a real implementation, this would redirect to a payment processor.`);
    
    clearCart();
    closeCartModal();
}

// Handle newsletter subscription
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    alert(`Thank you for subscribing with email: ${email}\n\nYou'll receive spooky updates and exclusive deals!`);
    e.target.reset();
}

// Filter products by category
function filterProductsByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; color: #ccc; grid-column: 1 / -1;">No products found in this category.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // Scroll to products section
    document.getElementById('costumes').scrollIntoView({ behavior: 'smooth' });
}

// Countdown timer for deals
function startCountdownTimer() {
    // Set countdown to Halloween (October 31st)
    const halloween = new Date();
    halloween.setMonth(9); // October (0-indexed)
    halloween.setDate(31);
    halloween.setHours(23, 59, 59, 999);
    
    // If Halloween has passed this year, set it for next year
    if (halloween < new Date()) {
        halloween.setFullYear(halloween.getFullYear() + 1);
    }
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = halloween - now;
        
        if (distance < 0) {
            // Halloween has passed
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.95);
        padding: 2rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);
