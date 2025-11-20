// 产品详情页面功能
document.addEventListener('DOMContentLoaded', function() {
    initializeProductGallery();
    initializeQuantitySelector();
    initializeTabs();
});

function initializeProductGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // 移除所有active类
            thumbnails.forEach(t => t.classList.remove('active'));
            // 添加active类到当前缩略图
            this.classList.add('active');
            // 更新主图
            mainImage.src = this.src;
        });
    });
}

function initializeQuantitySelector() {
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) {
                this.value = 1;
            }
        });
    }
    
    // 添加到购物车按钮
    const addToCartBtn = document.querySelector('.add-to-cart-large');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productName = document.getElementById('product-title').textContent;
            const productPrice = document.querySelector('.current-price').textContent.replace('$', '');
            const productImage = document.getElementById('main-product-image').src;
            const quantity = parseInt(document.querySelector('.quantity-input').value);
            const productId = new URLSearchParams(window.location.search).get('id') || Date.now().toString();
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: quantity
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // 更新购物车显示
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
            }
            
            alert(`已添加 ${quantity} 件产品到购物车`);
        });
    }
}

function initializeTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 移除所有active类
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // 添加active类到当前标签
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}