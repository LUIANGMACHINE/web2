// 产品页面功能
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupFilters();
});

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // 模拟产品数据
    const products = [
        {
            id: 1,
            name: '加油机型号A',
            price: '1200',
            image: 'images/product1.jpg',
            category: 'fuel-dispenser',
            description: '高性能加油机，适用于各种加油站'
        },
        {
            id: 2,
            name: 'LC型流量计',
            price: '850',
            image: 'images/lc-flowmeter.jpg',
            category: 'industrial-pump',
            description: '高精度流量计，工业流体测量'
        },
        {
            id: 3,
            name: '工业泵型号C',
            price: '1500',
            image: 'images/product3.jpg',
            category: 'industrial-pump',
            description: '高效工业泵，耐腐蚀设计'
        },
        {
            id: 4,
            name: 'LPG设备型号D',
            price: '980',
            image: 'images/product4.jpg',
            category: 'lpg-equipment',
            description: '安全可靠的LPG设备'
        },
        {
            id: 5,
            name: '加油机配件套装',
            price: '350',
            image: 'images/product2.jpg',
            category: 'fuel-dispenser-parts',
            description: '完整的加油机维护配件'
        },
        {
            id: 6,
            name: '尿素加注设备',
            price: '720',
            image: 'images/product1.jpg',
            category: 'adblue-equipment',
            description: '环保尿素加注解决方案'
        }
    ];

    displayProducts(products);
}

function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.dataset.id = product.id;
        productItem.dataset.category = product.category;
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price}</p>
            <div class="product-actions">
                <a href="product-details.html?id=${product.id}" class="btn btn-secondary">查看详情</a>
                <button class="btn btn-primary add-to-cart">添加到购物车</button>
            </div>
        `;
        productsGrid.appendChild(productItem);
    });

    // 重新绑定添加到购物车事件
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const productId = productItem.dataset.id;
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = productItem.querySelector('.product-price').textContent.replace('$', '');
            const productImage = productItem.querySelector('img').src;
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === productId);
            
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
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // 更新购物车显示
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
            }
            
            alert('产品已添加到购物车');
        });
    });
}

function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
}

function filterProducts() {
    // 在实际应用中，这里应该重新从服务器加载产品数据
    loadProducts();
}