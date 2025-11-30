// Product data with Indian Rupee pricing
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 2499,
        originalPrice: 3999,
        category: "electronics",
        rating: 4.5,
        reviews: 128,
        image: "headphones",
        badge: "Sale",
        inStock: true,
        featured: true,
        colors: ["Black", "White", "Blue"]
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.",
        price: 4999,
        originalPrice: 7999,
        category: "electronics",
        rating: 4.3,
        reviews: 89,
        image: "smartwatch",
        badge: "New",
        inStock: true,
        featured: true,
        colors: ["Black", "Silver", "Rose Gold"]
    },
    {
        id: 3,
        name: "Premium Cotton T-Shirt",
        description: "Comfortable and stylish cotton t-shirt perfect for everyday wear.",
        price: 599,
        originalPrice: null,
        category: "clothing",
        rating: 4.7,
        reviews: 245,
        image: "tshirt",
        badge: null,
        inStock: true,
        featured: false,
        colors: ["White", "Black", "Navy", "Red", "Gray"]
    },
    {
        id: 4,
        name: "Ergonomic Office Chair",
        description: "Professional office chair with lumbar support and adjustable height.",
        price: 8999,
        originalPrice: 12999,
        category: "home",
        rating: 4.6,
        reviews: 67,
        image: "chair",
        badge: "Sale",
        inStock: true,
        featured: true,
        colors: ["Black", "Gray", "Brown"]
    },
    {
        id: 5,
        name: "Yoga Mat Pro",
        description: "Non-slip premium yoga mat perfect for all types of yoga and exercise.",
        price: 1299,
        originalPrice: null,
        category: "sports",
        rating: 4.8,
        reviews: 156,
        image: "yogamat",
        badge: "Best Seller",
        inStock: true,
        featured: false,
        colors: ["Purple", "Pink", "Blue", "Green"]
    },
    {
        id: 6,
        name: "Wireless Gaming Mouse",
        description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
        price: 1899,
        originalPrice: 2499,
        category: "electronics",
        rating: 4.4,
        reviews: 203,
        image: "mouse",
        badge: "Sale",
        inStock: true,
        featured: false,
        colors: ["Black", "White"]
    },
    {
        id: 7,
        name: "Designer Jeans",
        description: "Premium denim jeans with perfect fit and contemporary styling.",
        price: 2199,
        originalPrice: null,
        category: "clothing",
        rating: 4.2,
        reviews: 78,
        image: "jeans",
        badge: null,
        inStock: true,
        featured: false,
        colors: ["Dark Blue", "Light Blue", "Black"]
    },
    {
        id: 8,
        name: "Smart Home Speaker",
        description: "Voice-controlled smart speaker with premium sound quality and AI assistant.",
        price: 3499,
        originalPrice: 4999,
        category: "electronics",
        rating: 4.5,
        reviews: 312,
        image: "speaker",
        badge: "Popular",
        inStock: true,
        featured: true,
        colors: ["Black", "White", "Gray"]
    },
    {
        id: 9,
        name: "Ceramic Plant Pot Set",
        description: "Beautiful set of 3 ceramic plant pots perfect for indoor gardening.",
        price: 899,
        originalPrice: null,
        category: "home",
        rating: 4.6,
        reviews: 94,
        image: "plantpots",
        badge: null,
        inStock: true,
        featured: false,
        colors: ["White", "Terracotta", "Green"]
    },
    {
        id: 10,
        name: "Running Shoes",
        description: "Lightweight and comfortable running shoes with advanced cushioning technology.",
        price: 2999,
        originalPrice: 3999,
        category: "sports",
        rating: 4.7,
        reviews: 187,
        image: "shoes",
        badge: "Sale",
        inStock: true,
        featured: true,
        colors: ["White", "Black", "Blue", "Red"]
    },
    {
        id: 11,
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for better ergonomics and cooling.",
        price: 1199,
        originalPrice: null,
        category: "electronics",
        rating: 4.3,
        reviews: 145,
        image: "laptopstand",
        badge: null,
        inStock: true,
        featured: false,
        colors: ["Silver", "Space Gray"]
    },
    {
        id: 12,
        name: "Casual Hoodie",
        description: "Cozy and warm hoodie made from premium cotton blend fabric.",
        price: 1499,
        originalPrice: 1999,
        category: "clothing",
        rating: 4.4,
        reviews: 167,
        image: "hoodie",
        badge: "Sale",
        inStock: true,
        featured: false,
        colors: ["Black", "Gray", "Navy", "Maroon"]
    }
];

// Product display functionality
class ProductManager {
    constructor() {
        this.allProducts = products;
        this.displayedProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 8;
        this.currentFilter = 'all';
        this.currentSort = 'default';
        this.searchQuery = '';
        
        this.init();
    }
    
    init() {
        this.displayedProducts = this.allProducts.slice(0, this.productsPerPage);
        this.renderProducts();
        this.setupEventListeners();
        this.updateLoadMoreButton();
    }
    
    setupEventListeners() {
        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.resetAndFilter();
            });
        }
        
        // Sort filter
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.resetAndFilter();
            });
        }
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.resetAndFilter();
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchQuery = e.target.value.toLowerCase();
                    this.resetAndFilter();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                if (searchInput) {
                    this.searchQuery = searchInput.value.toLowerCase();
                    this.resetAndFilter();
                }
            });
        }
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProducts();
            });
        }
        
        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.currentFilter = category;
                const categoryFilter = document.getElementById('categoryFilter');
                if (categoryFilter) {
                    categoryFilter.value = category;
                }
                this.resetAndFilter();
                
                // Scroll to products section
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    resetAndFilter() {
        this.currentPage = 1;
        this.displayedProducts = [];
        this.loadMoreProducts();
    }
    
    getFilteredProducts() {
        let filtered = this.allProducts;
        
        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(product => product.category === this.currentFilter);
        }
        
        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(this.searchQuery) ||
                product.description.toLowerCase().includes(this.searchQuery) ||
                product.category.toLowerCase().includes(this.searchQuery)
            );
        }
        
        // Apply sorting
        switch (this.currentSort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            default:
                // Keep original order, but prioritize featured products
                filtered.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return 0;
                });
        }
        
        return filtered;
    }
    
    loadMoreProducts() {
        const filteredProducts = this.getFilteredProducts();
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const newProducts = filteredProducts.slice(startIndex, endIndex);
        
        if (this.currentPage === 1) {
            this.displayedProducts = newProducts;
        } else {
            this.displayedProducts = [...this.displayedProducts, ...newProducts];
        }
        
        this.currentPage++;
        this.renderProducts();
        this.updateLoadMoreButton();
    }
    
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const filteredProducts = this.getFilteredProducts();
        const hasMore = this.displayedProducts.length < filteredProducts.length;
        
        if (loadMoreBtn) {
            loadMoreBtn.style.display = hasMore ? 'block' : 'none';
        }
    }
    
    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;
        
        if (this.displayedProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        productsGrid.innerHTML = this.displayedProducts.map(product => this.createProductCard(product)).join('');
        
        // Add event listeners to add-to-cart buttons
        this.setupAddToCartListeners();
    }
    
    createProductCard(product) {
        const stars = this.generateStars(product.rating);
        const badge = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        const originalPrice = product.originalPrice ? 
            `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : '';
        
        // Create product image with gradient background
        const imageStyle = this.getProductImageStyle(product.image);
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image" style="${imageStyle}">
                    <div class="product-image-overlay">
                        ${this.getProductIcon(product.category)}
                    </div>
                    ${badge}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">(${product.reviews} reviews)</span>
                    </div>
                    <div class="product-colors">
                        ${product.colors ? product.colors.slice(0, 4).map(color => 
                            `<span class="color-dot" style="background: ${this.getColorCode(color)}" title="${color}"></span>`
                        ).join('') : ''}
                    </div>
                    <div class="product-footer">
                        <div class="product-price">
                            ₹${product.price.toLocaleString('en-IN')}
                            ${originalPrice}
                        </div>
                        <button class="add-to-cart" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    getProductImageStyle(imageName) {
        const gradients = {
            headphones: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            smartwatch: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            tshirt: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            chair: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            yogamat: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            mouse: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            jeans: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            speaker: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            plantpots: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
            shoes: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            laptopstand: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
            hoodie: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
        };
        
        return `background: ${gradients[imageName] || 'linear-gradient(135deg, #f1f5f9, #e2e8f0)'}`;
    }
    
    getProductIcon(category) {
        const icons = {
            electronics: '<i class="fas fa-laptop" style="font-size: 3rem; color: rgba(255,255,255,0.8);"></i>',
            clothing: '<i class="fas fa-tshirt" style="font-size: 3rem; color: rgba(255,255,255,0.8);"></i>',
            home: '<i class="fas fa-home" style="font-size: 3rem; color: rgba(255,255,255,0.8);"></i>',
            sports: '<i class="fas fa-dumbbell" style="font-size: 3rem; color: rgba(255,255,255,0.8);"></i>'
        };
        
        return icons[category] || '<i class="fas fa-box" style="font-size: 3rem; color: rgba(255,255,255,0.8);"></i>';
    }
    
    getColorCode(colorName) {
        const colors = {
            'Black': '#000000',
            'White': '#ffffff',
            'Blue': '#3b82f6',
            'Navy': '#1e3a8a',
            'Red': '#ef4444',
            'Gray': '#6b7280',
            'Silver': '#c0c0c0',
            'Rose Gold': '#e8b4b8',
            'Purple': '#8b5cf6',
            'Pink': '#ec4899',
            'Green': '#10b981',
            'Dark Blue': '#1e40af',
            'Light Blue': '#60a5fa',
            'Terracotta': '#cd853f',
            'Space Gray': '#4a5568',
            'Maroon': '#7c2d12',
            'Brown': '#92400e'
        };
        
        return colors[colorName] || '#94a3b8';
    }
    
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star star"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star star empty"></i>';
        }
        
        return stars;
    }
    
    setupAddToCartListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const product = this.allProducts.find(p => p.id === productId);
                
                if (product && window.cart) {
                    window.cart.addItem(product);
                    
                    // Visual feedback
                    button.textContent = 'Added!';
                    button.style.background = '#10b981';
                    
                    setTimeout(() => {
                        button.textContent = 'Add to Cart';
                        button.style.background = '#3b82f6';
                    }, 1500);
                }
            });
        });
    }
    
    getProductById(id) {
        return this.allProducts.find(product => product.id === id);
    }
}

// Initialize product manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.productManager = new ProductManager();
});
