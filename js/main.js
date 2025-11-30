// Main JavaScript functionality
class App {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupNewsletterForm();
        this.setupHeroButton();
        this.setupKeyboardNavigation();
        this.setupLazyLoading();
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Update active nav link based on scroll position
        const updateActiveNav = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };
        
        // Throttle scroll events for better performance
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveNav();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', onScroll);
        
        // Handle nav link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }
    
    setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const nav = document.querySelector('.nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                const isOpen = nav.classList.contains('active');
                
                // Update menu icon
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
                }
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }
    
    closeMobileMenu() {
        const nav = document.querySelector('.nav');
        const menuToggle = document.getElementById('menuToggle');
        
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            document.body.style.overflow = '';
            
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    }
    
    setupScrollEffects() {
        const header = document.querySelector('.header');
        
        if (header) {
            let lastScrollY = window.pageYOffset;
            
            const updateHeader = () => {
                const currentScrollY = window.pageYOffset;
                
                // Add/remove scrolled class for styling
                if (currentScrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Hide/show header on scroll
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollY = currentScrollY;
            };
            
            // Throttle scroll events
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        updateHeader();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
    }
    
    setupSmoothScrolling() {
        // Smooth scrolling for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter');
        
        if (newsletterForm) {
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            
            if (input && button) {
                const handleSubmit = (e) => {
                    e.preventDefault();
                    const email = input.value.trim();
                    
                    if (!email) {
                        this.showNotification('Please enter your email address', 'error');
                        return;
                    }
                    
                    if (!this.isValidEmail(email)) {
                        this.showNotification('Please enter a valid email address', 'error');
                        return;
                    }
                    
                    // Simulate newsletter subscription
                    button.textContent = 'Subscribing...';
                    button.disabled = true;
                    
                    setTimeout(() => {
                        this.showNotification('Successfully subscribed to newsletter!', 'success');
                        input.value = '';
                        button.textContent = 'Subscribe';
                        button.disabled = false;
                    }, 1500);
                };
                
                button.addEventListener('click', handleSubmit);
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                });
            }
        }
    }
    
    setupHeroButton() {
        const ctaBtn = document.querySelector('.cta-btn');
        
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = productsSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    setupKeyboardNavigation() {
        // Handle keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            // Close modals/sidebars with Escape key
            if (e.key === 'Escape') {
                if (window.cart && window.cart.isOpen) {
                    window.cart.closeCart();
                }
                if (window.checkout && window.checkout.isOpen) {
                    window.checkout.closeModal();
                }
                if (window.fashionChatbot && window.fashionChatbot.isOpen) {
                    window.fashionChatbot.toggleChatbot();
                }
                this.closeMobileMenu();
            }
            
            // Quick search with Ctrl/Cmd + K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
        
        // Improve focus visibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    setupLazyLoading() {
        // Intersection Observer for lazy loading animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.category-card, .product-card, .hero-text, .hero-image');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showNotification(message, type = 'success') {
        // Use cart notification system if available
        if (window.cart) {
            window.cart.showNotification(message, type);
        } else {
            // Fallback notification
            alert(message);
        }
    }
    
    // Utility method to format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    }
    
    // Utility method to debounce function calls
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Utility method to throttle function calls
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.recordPageLoadMetrics();
            }, 0);
        });
        
        // Monitor user interactions
        this.setupInteractionTracking();
    }
    
    recordPageLoadMetrics() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            
            if (paint.length > 0) {
                this.metrics.firstPaint = paint.find(entry => entry.name === 'first-paint')?.startTime;
                this.metrics.firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime;
            }
            
            console.log('Performance Metrics:', this.metrics);
        }
    }
    
    setupInteractionTracking() {
        // Track click interactions
        document.addEventListener('click', (e) => {
            const target = e.target.closest('button, a, .clickable');
            if (target) {
                this.recordInteraction('click', target);
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', (e) => {
            this.recordInteraction('form_submit', e.target);
        });
    }
    
    recordInteraction(type, element) {
        const interaction = {
            type,
            element: element.tagName.toLowerCase(),
            className: element.className,
            timestamp: Date.now()
        };
        
        // In a real application, you would send this data to analytics
        console.log('User Interaction:', interaction);
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    window.performanceMonitor = new PerformanceMonitor();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Add CSS for animations and keyboard navigation
const additionalStyles = `
    <style>
        .keyboard-navigation *:focus {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 2px !important;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .header.scrolled {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .loaded .hero-text,
        .loaded .hero-image {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .loaded .hero-image {
            animation-delay: 0.2s;
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
