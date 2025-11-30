// AI Fashion Chatbot
class FashionChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.fashionKnowledge = this.initializeFashionKnowledge();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadWelcomeMessage();
    }
    
    setupEventListeners() {
        // Floating button
        const floatBtn = document.getElementById('chatbotFloat');
        if (floatBtn) {
            floatBtn.addEventListener('click', () => {
                this.toggleChatbot();
            });
        }
        
        // Toggle button
        const toggleBtn = document.getElementById('chatbotToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggleChatbot();
            });
        }
        
        // Send button
        const sendBtn = document.getElementById('chatbotSend');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }
        
        // Input field
        const input = document.getElementById('chatbotInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }
    
    toggleChatbot() {
        const container = document.getElementById('chatbotContainer');
        const notification = document.getElementById('chatbotNotification');
        
        if (container) {
            this.isOpen = !this.isOpen;
            container.classList.toggle('open', this.isOpen);
            
            // Hide notification when opened
            if (this.isOpen && notification) {
                notification.style.display = 'none';
            }
        }
    }
    
    loadWelcomeMessage() {
        // Welcome message is already in HTML
        this.messages.push({
            type: 'bot',
            content: 'Welcome message loaded',
            timestamp: new Date()
        });
    }
    
    sendMessage() {
        const input = document.getElementById('chatbotInput');
        if (!input || !input.value.trim()) return;
        
        const userMessage = input.value.trim();
        input.value = '';
        
        // Add user message
        this.addMessage('user', userMessage);
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            const botResponse = this.generateResponse(userMessage);
            this.addMessage('bot', botResponse);
        }, 1000 + Math.random() * 1000); // Random delay for realism
    }
    
    addMessage(type, content) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (typeof content === 'string') {
            messageContent.innerHTML = content;
        } else {
            messageContent.appendChild(content);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store message
        this.messages.push({
            type,
            content,
            timestamp: new Date()
        });
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
    
    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Color combination queries
        if (this.containsWords(message, ['color', 'combination', 'match', 'goes with'])) {
            return this.getColorAdvice(message);
        }
        
        // Styling tips
        if (this.containsWords(message, ['style', 'styling', 'outfit', 'wear', 'look'])) {
            return this.getStyleAdvice(message);
        }
        
        // Occasion-based advice
        if (this.containsWords(message, ['party', 'wedding', 'office', 'casual', 'formal', 'date'])) {
            return this.getOccasionAdvice(message);
        }
        
        // Body type advice
        if (this.containsWords(message, ['body', 'figure', 'shape', 'tall', 'short', 'slim', 'curvy'])) {
            return this.getBodyTypeAdvice(message);
        }
        
        // Seasonal advice
        if (this.containsWords(message, ['summer', 'winter', 'spring', 'autumn', 'fall', 'season'])) {
            return this.getSeasonalAdvice(message);
        }
        
        // Product recommendations
        if (this.containsWords(message, ['recommend', 'suggest', 'buy', 'purchase', 'need'])) {
            return this.getProductRecommendations(message);
        }
        
        // Trend advice
        if (this.containsWords(message, ['trend', 'trendy', 'fashion', 'latest', 'popular'])) {
            return this.getTrendAdvice();
        }
        
        // Default responses
        return this.getDefaultResponse();
    }
    
    containsWords(message, words) {
        return words.some(word => message.includes(word));
    }
    
    getColorAdvice(message) {
        const colorAdvice = [
            {
                title: "Classic Color Combinations 🎨",
                content: `
                    <div class="fashion-tip">
                        <p><strong>Navy Blue + White:</strong> Timeless and elegant, perfect for any occasion.</p>
                        <div class="color-palette">
                            <div class="color-sample" style="background: #1e3a8a" data-color="Navy"></div>
                            <div class="color-sample" style="background: #ffffff; border: 2px solid #ccc" data-color="White"></div>
                        </div>
                    </div>
                    <div class="fashion-tip">
                        <p><strong>Black + Gold:</strong> Sophisticated and luxurious for evening wear.</p>
                        <div class="color-palette">
                            <div class="color-sample" style="background: #000000" data-color="Black"></div>
                            <div class="color-sample" style="background: #ffd700" data-color="Gold"></div>
                        </div>
                    </div>
                    <div class="fashion-tip">
                        <p><strong>Blush Pink + Gray:</strong> Soft and modern, great for casual and office wear.</p>
                        <div class="color-palette">
                            <div class="color-sample" style="background: #ffc0cb" data-color="Blush"></div>
                            <div class="color-sample" style="background: #6b7280" data-color="Gray"></div>
                        </div>
                    </div>
                `
            },
            {
                title: "Bold Color Combinations 💫",
                content: `
                    <div class="fashion-tip">
                        <p><strong>Emerald Green + Gold:</strong> Rich and vibrant for special occasions.</p>
                        <div class="color-palette">
                            <div class="color-sample" style="background: #10b981" data-color="Emerald"></div>
                            <div class="color-sample" style="background: #ffd700" data-color="Gold"></div>
                        </div>
                    </div>
                    <div class="fashion-tip">
                        <p><strong>Royal Blue + Silver:</strong> Modern and striking combination.</p>
                        <div class="color-palette">
                            <div class="color-sample" style="background: #3b82f6" data-color="Royal Blue"></div>
                            <div class="color-sample" style="background: #c0c0c0" data-color="Silver"></div>
                        </div>
                    </div>
                `
            }
        ];
        
        const randomAdvice = colorAdvice[Math.floor(Math.random() * colorAdvice.length)];
        return `<h4>${randomAdvice.title}</h4>${randomAdvice.content}<p>💡 <em>Pro tip: Start with neutral colors and add one bold accent color for a balanced look!</em></p>`;
    }
    
    getStyleAdvice(message) {
        const styleAdvice = [
            `<h4>Essential Styling Tips ✨</h4>
            <div class="fashion-tip">
                <p><strong>The Rule of Three:</strong> Limit your outfit to 3 colors maximum for a cohesive look.</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Fit is Everything:</strong> Well-fitted clothes in basic colors look more expensive than designer pieces that don't fit properly.</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Accessorize Wisely:</strong> One statement piece is better than multiple competing accessories.</p>
            </div>`,
            
            `<h4>Layering Like a Pro 🧥</h4>
            <div class="fashion-tip">
                <p><strong>Start with basics:</strong> Begin with fitted base layers and add looser pieces on top.</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Play with textures:</strong> Mix different fabrics like cotton, wool, and silk for visual interest.</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Length variation:</strong> Vary the lengths of your layers for a dynamic silhouette.</p>
            </div>`,
            
            `<h4>Creating Visual Balance ⚖️</h4>
            <div class="fashion-tip">
                <p><strong>Proportions matter:</strong> If you wear loose on top, go fitted on bottom and vice versa.</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Define your waist:</strong> Use belts or fitted pieces to create an hourglass silhouette.</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Vertical lines:</strong> Create length with vertical stripes, long necklaces, or open cardigans.</p>
            </div>`
        ];
        
        return styleAdvice[Math.floor(Math.random() * styleAdvice.length)];
    }
    
    getOccasionAdvice(message) {
        if (message.includes('office') || message.includes('work')) {
            return `<h4>Office Wear Essentials 💼</h4>
            <div class="fashion-tip">
                <p><strong>Smart Casual:</strong> Blazer + dark jeans + blouse + loafers</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Business Formal:</strong> Tailored suit + button-down shirt + closed-toe shoes</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Colors:</strong> Stick to navy, black, gray, white, and muted tones</p>
            </div>
            <p>💡 <em>Invest in quality basics that mix and match easily!</em></p>`;
        }
        
        if (message.includes('party') || message.includes('evening')) {
            return `<h4>Party Perfect Looks 🎉</h4>
            <div class="fashion-tip">
                <p><strong>Cocktail Party:</strong> Little black dress + statement jewelry + heels</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Casual Party:</strong> Silk blouse + leather pants + ankle boots</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Formal Evening:</strong> Floor-length dress + elegant accessories + clutch</p>
            </div>
            <p>✨ <em>Don't forget: confidence is your best accessory!</em></p>`;
        }
        
        if (message.includes('date')) {
            return `<h4>Date Night Outfits 💕</h4>
            <div class="fashion-tip">
                <p><strong>Dinner Date:</strong> Midi dress + cardigan + comfortable heels</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Casual Coffee:</strong> High-waisted jeans + cute top + sneakers</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Activity Date:</strong> Athleisure wear + comfortable shoes + light jacket</p>
            </div>
            <p>💖 <em>Choose something that makes YOU feel confident and comfortable!</em></p>`;
        }
        
        return `<h4>Occasion Styling Guide 📅</h4>
        <div class="fashion-tip">
            <p><strong>Casual:</strong> Comfort meets style - jeans, t-shirts, sneakers</p>
        </div>
        <div class="fashion-tip">
            <p><strong>Smart Casual:</strong> Elevated basics - chinos, blouses, loafers</p>
        </div>
        <div class="fashion-tip">
            <p><strong>Formal:</strong> Polished and professional - suits, dresses, dress shoes</p>
        </div>`;
    }
    
    getSeasonalAdvice(message) {
        const season = new Date().getMonth();
        let currentSeason = '';
        
        if (season >= 2 && season <= 4) currentSeason = 'spring';
        else if (season >= 5 && season <= 7) currentSeason = 'summer';
        else if (season >= 8 && season <= 10) currentSeason = 'autumn';
        else currentSeason = 'winter';
        
        const seasonalTips = {
            spring: `<h4>Spring Fashion 🌸</h4>
            <div class="fashion-tip">
                <p><strong>Colors:</strong> Pastels, soft pinks, mint green, lavender</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Fabrics:</strong> Light cotton, linen, chiffon</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Key Pieces:</strong> Light cardigans, floral dresses, ankle boots</p>
            </div>`,
            
            summer: `<h4>Summer Vibes ☀️</h4>
            <div class="fashion-tip">
                <p><strong>Colors:</strong> Bright whites, coral, turquoise, sunny yellow</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Fabrics:</strong> Breathable cotton, linen, bamboo</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Key Pieces:</strong> Sundresses, shorts, sandals, sun hats</p>
            </div>`,
            
            autumn: `<h4>Autumn Elegance 🍂</h4>
            <div class="fashion-tip">
                <p><strong>Colors:</strong> Burgundy, mustard, forest green, burnt orange</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Fabrics:</strong> Wool, cashmere, tweed, corduroy</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Key Pieces:</strong> Cozy sweaters, boots, scarves, jackets</p>
            </div>`,
            
            winter: `<h4>Winter Warmth ❄️</h4>
            <div class="fashion-tip">
                <p><strong>Colors:</strong> Deep navy, charcoal, emerald, rich burgundy</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Fabrics:</strong> Heavy wool, cashmere, fleece, down</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Key Pieces:</strong> Coats, sweaters, boots, warm accessories</p>
            </div>`
        };
        
        return seasonalTips[currentSeason] + `<p>🌟 <em>Current season: ${currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}! Perfect time to refresh your wardrobe.</em></p>`;
    }
    
    getProductRecommendations(message) {
        if (window.productManager) {
            const clothingProducts = window.productManager.allProducts.filter(p => p.category === 'clothing');
            if (clothingProducts.length > 0) {
                const randomProduct = clothingProducts[Math.floor(Math.random() * clothingProducts.length)];
                return `<h4>Product Recommendation 🛍️</h4>
                <div class="fashion-tip">
                    <p><strong>${randomProduct.name}</strong></p>
                    <p>${randomProduct.description}</p>
                    <p><strong>Price:</strong> ₹${randomProduct.price.toLocaleString('en-IN')}</p>
                    <p><strong>Available Colors:</strong> ${randomProduct.colors ? randomProduct.colors.join(', ') : 'Multiple options'}</p>
                </div>
                <p>💡 <em>This would pair beautifully with neutral accessories!</em></p>`;
            }
        }
        
        return `<h4>Wardrobe Essentials 👗</h4>
        <div class="fashion-tip">
            <p><strong>Must-Have Basics:</strong></p>
            <ul>
                <li>Well-fitted jeans in dark wash</li>
                <li>White button-down shirt</li>
                <li>Little black dress</li>
                <li>Comfortable blazer</li>
                <li>Quality white sneakers</li>
            </ul>
        </div>`;
    }
    
    getTrendAdvice() {
        const trends = [
            `<h4>Current Fashion Trends 🔥</h4>
            <div class="fashion-tip">
                <p><strong>Oversized Blazers:</strong> Perfect for creating a powerful silhouette</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Wide-Leg Pants:</strong> Comfortable and chic alternative to skinny jeans</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Statement Sleeves:</strong> Puff sleeves and bell sleeves are making a comeback</p>
            </div>`,
            
            `<h4>Sustainable Fashion Trends 🌱</h4>
            <div class="fashion-tip">
                <p><strong>Vintage Revival:</strong> Thrifted and vintage pieces are trendy and eco-friendly</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Quality over Quantity:</strong> Investing in timeless, well-made pieces</p>
            </div>
            <div class="fashion-tip">
                <p><strong>Neutral Palettes:</strong> Beige, cream, and earth tones for versatile styling</p>
            </div>`
        ];
        
        return trends[Math.floor(Math.random() * trends.length)];
    }
    
    getDefaultResponse() {
        const responses = [
            `<h4>Fashion Questions I Can Help With 💫</h4>
            <p>I'm here to help with all your fashion needs! Try asking me about:</p>
            <ul>
                <li>🎨 "What colors go well with navy blue?"</li>
                <li>👗 "What should I wear to a wedding?"</li>
                <li>💼 "Office outfit ideas"</li>
                <li>🌟 "Latest fashion trends"</li>
                <li>👕 "How to style a white shirt?"</li>
            </ul>`,
            
            `<h4>Style Tip of the Day ✨</h4>
            <div class="fashion-tip">
                <p>The best outfit is the one that makes you feel confident and comfortable. Fashion rules are meant to be guidelines, not restrictions!</p>
            </div>
            <p>What specific fashion question can I help you with today?</p>`,
            
            `<h4>Let's Talk Fashion! 👗</h4>
            <p>I'm your personal fashion assistant! I can help you with:</p>
            <ul>
                <li>Color coordination and matching</li>
                <li>Styling tips for different occasions</li>
                <li>Seasonal fashion advice</li>
                <li>Trend insights and recommendations</li>
            </ul>
            <p>What would you like to know?</p>`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    initializeFashionKnowledge() {
        return {
            colorCombinations: {
                'navy': ['white', 'cream', 'gold', 'pink', 'gray'],
                'black': ['white', 'gold', 'silver', 'red', 'pink'],
                'white': ['navy', 'black', 'red', 'blue', 'green'],
                'gray': ['yellow', 'pink', 'white', 'black', 'blue'],
                'beige': ['white', 'brown', 'navy', 'green', 'pink']
            },
            occasions: {
                'office': ['blazer', 'trousers', 'shirt', 'loafers'],
                'party': ['dress', 'heels', 'jewelry', 'clutch'],
                'casual': ['jeans', 'tshirt', 'sneakers', 'jacket'],
                'formal': ['suit', 'dress shoes', 'tie', 'dress']
            },
            bodyTypes: {
                'pear': 'Emphasize shoulders, choose A-line skirts',
                'apple': 'Define waist, choose V-necks',
                'hourglass': 'Highlight waist, fitted silhouettes',
                'rectangle': 'Create curves, use belts and layers'
            }
        };
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.fashionChatbot = new FashionChatbot();
});

