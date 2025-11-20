// 主JavaScript文件 - 更新为模块化
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeCart();
    initializeCarousel();
    initializeHeroSlider();
});

// 移动端菜单初始化
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
}

// 主轮播图初始化
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // 自动轮播
    setInterval(nextSlide, 5000);
}

// 产品轮播初始化
function initializeCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlide = document.querySelector('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!carouselTrack || !carouselSlide) return;
    
    let currentPosition = 0;
    const slideWidth = 300; // 每个产品的宽度 + gap
    
    function updateCarousel() {
        carouselSlide.style.transform = `translateX(-${currentPosition}px)`;
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const maxPosition = (carouselSlide.children.length - 4) * slideWidth;
            if (currentPosition < maxPosition) {
                currentPosition += slideWidth;
                updateCarousel();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPosition > 0) {
                currentPosition -= slideWidth;
                updateCarousel();
            }
        });
    }
}

// 购物车初始化
function initializeCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const requestQuotationBtn = document.querySelector('.request-quotation');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 更新购物车显示
    function updateCartDisplay() {
        if (!cartItems) return;
        
        cartItems.innerHTML = '';
        let totalItems = 0;
        
        cart.forEach((item, index) => {
            totalItems += item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-increase" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">&times;</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // 购物车切换
    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('active');
        });
    }
    
    if (closeCart && cartSidebar) {
        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
        });
    }
    
    // 添加产品到购物车
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                if (!productCard) return;
                
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent.replace('$', '').replace(',', '');
                const productImage = productCard.querySelector('img').src;
                const productId = Date.now().toString(); // 生成唯一ID
                
                // 检查产品是否已在购物车中
                const existingItem = cart.find(item => item.name === productName);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    });
                }
                
                updateCartDisplay();
                
                // 显示添加成功消息
                alert('产品已添加到购物车');
            });
        });
    }
    
    // 购物车项目数量调整
    if (cartItems) {
        cartItems.addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-increase')) {
                const index = e.target.dataset.index;
                cart[index].quantity += 1;
                updateCartDisplay();
            }
            
            if (e.target.classList.contains('quantity-decrease')) {
                const index = e.target.dataset.index;
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                updateCartDisplay();
            }
            
            if (e.target.classList.contains('remove-item')) {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCartDisplay();
            }
        });
    }
    
    // 请求报价
    if (requestQuotationBtn) {
        requestQuotationBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('购物车为空，请先添加产品');
                return;
            }
            
            // 构建邮件内容
            let emailBody = '产品询价请求:\n\n';
            let totalValue = 0;
            
            cart.forEach(item => {
                emailBody += `产品: ${item.name}\n`;
                emailBody += `单价: $${item.price}\n`;
                emailBody += `数量: ${item.quantity}\n`;
                emailBody += `小计: $${(item.price * item.quantity).toFixed(2)}\n\n`;
                totalValue += item.price * item.quantity;
            });
            
            emailBody += `总计: $${totalValue.toFixed(2)}\n\n`;
            emailBody += '请尽快联系我们确认订单细节。';
            
            // 发送邮件
            const email = 'luiangparts@luiangparts.com';
            const subject = 'LUIANG MACHINE 产品询价请求';
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // 清空购物车
            cart = [];
            updateCartDisplay();
            if (cartSidebar) {
                cartSidebar.classList.remove('active');
            }
            
            alert('询价请求已发送，我们将尽快与您联系');
        });
    }
    
    // 初始化购物车显示
    updateCartDisplay();
}