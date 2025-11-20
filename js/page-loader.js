// 页面加载器 - 用于加载header和footer
class PageLoader {
    constructor() {
        this.init();
    }
    
    async init() {
        await this.loadHeader();
        await this.loadFooter();
        this.initializeComponents();
    }
    
    async loadHeader() {
        try {
            // 创建header元素
            const headerHTML = `
                <header>
                    <div class="container">
                        <div class="logo">
                            <a href="index.html">
                                <img src="images/logo.png" alt="LUIANG MACHINE" onerror="this.style.display='none'">
                                <span style="color: white; font-weight: bold; font-size: 20px;">LUIANG MACHINE</span>
                            </a>
                        </div>
                        <nav class="main-nav">
                            <ul>
                                <li><a href="index.html" data-lang="home">首页</a></li>
                                <li><a href="about.html" data-lang="about">关于我们</a></li>
                                <li class="dropdown">
                                    <a href="products.html" data-lang="products">产品中心</a>
                                    <ul class="dropdown-menu">
                                        <li><a href="products.html?category=fuel-dispenser" data-category="fuel-dispenser" data-lang="fuel-dispenser">加油机</a></li>
                                        <li><a href="products.html?category=fuel-dispenser-parts" data-category="fuel-dispenser-parts" data-lang="fuel-dispenser-parts">加油机配件</a></li>
                                        <li><a href="products.html?category=adblue-equipment" data-category="adblue-equipment" data-lang="adblue-equipment">尿素配件</a></li>
                                        <li><a href="products.html?category=industrial-pump" data-category="industrial-pump" data-lang="industrial-pump">工业泵和流量计</a></li>
                                        <li><a href="products.html?category=lpg-equipment" data-category="lpg-equipment" data-lang="lpg-equipment">LPG 配件</a></li>
                                        <li><a href="products.html?category=other-equipment" data-category="other-equipment" data-lang="other-equipment">其他</a></li>
                                    </ul>
                                </li>
                                <li><a href="blog.html" data-lang="blog">博客</a></li>
                                <li><a href="contact.html" data-lang="contact">联系我们</a></li>
                            </ul>
                        </nav>
                        <div class="header-actions">
                            <div class="language-selector">
                                <select id="language-select">
                                    <option value="zh-CN">中文</option>
                                    <option value="en">English</option>
                                    <option value="ru">Русский</option>
                                    <option value="vi">Tiếng Việt</option>
                                </select>
                            </div>
                            <div class="cart-icon">
                                <a href="#" id="cart-toggle">
                                    <span class="cart-count">0</span>
                                </a>
                            </div>
                        </div>
                        <div class="mobile-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </header>

                <!-- 购物车侧边栏 -->
                <div class="cart-sidebar">
                    <div class="cart-header">
                        <h3 data-lang="shopping-cart">购物车</h3>
                        <button class="close-cart">&times;</button>
                    </div>
                    <div class="cart-items">
                        <!-- 购物车项目将动态添加 -->
                    </div>
                    <div class="cart-footer">
                        <button class="btn btn-primary request-quotation" data-lang="request-quotation">请求报价</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
        } catch (error) {
            console.error('Failed to load header:', error);
        }
    }
    
    async loadFooter() {
        try {
            // 创建footer元素
            const footerHTML = `
                <footer>
                    <div class="container">
                        <div class="footer-content">
                            <div class="footer-section">
                                <h3 data-lang="contact-info">联系信息</h3>
                                <p data-lang="company-name1">连云港路扬配件有限公司 LUIANG PARTS LIANYUNGANG CO.,LTD</p>
                                <p data-lang="address1">地址: 江苏省灌云县义凡广场1号楼 222200</p>
                                <p data-lang="company-name2">路扬配件有限公司 LUIANG PARTS CO.,LTD</p>
                                <p data-lang="address2">地址: 上海市灵山路958号5号楼</p>
                                <p>电话: +86-177 1287 5791</p>
                                <p>邮箱: luiangparts@luiangparts.com</p>
                            </div>
                            <div class="footer-section">
                                <h3 data-lang="quick-links">快速链接</h3>
                                <ul>
                                    <li><a href="index.html" data-lang="home">首页</a></li>
                                    <li><a href="about.html" data-lang="about">关于我们</a></li>
                                    <li><a href="products.html" data-lang="products">产品中心</a></li>
                                    <li><a href="blog.html" data-lang="blog">博客</a></li>
                                    <li><a href="contact.html" data-lang="contact">联系我们</a></li>
                                </ul>
                            </div>
                            <div class="footer-section">
                                <h3 data-lang="product-categories">产品分类</h3>
                                <ul>
                                    <li><a href="products.html?category=fuel-dispenser" data-lang="fuel-dispenser">加油机</a></li>
                                    <li><a href="products.html?category=fuel-dispenser-parts" data-lang="fuel-dispenser-parts">加油机配件</a></li>
                                    <li><a href="products.html?category=adblue-equipment" data-lang="adblue-equipment">尿素配件</a></li>
                                    <li><a href="products.html?category=industrial-pump" data-lang="industrial-pump">工业泵和流量计</a></li>
                                    <li><a href="products.html?category=lpg-equipment" data-lang="lpg-equipment">LPG 配件</a></li>
                                    <li><a href="products.html?category=other-equipment" data-lang="other-equipment">其他</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p>&copy; 2023 LUIANG MACHINE. <span data-lang="all-rights-reserved">版权所有</span></p>
                        </div>
                    </div>
                </footer>
            `;
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        } catch (error) {
            console.error('Failed to load footer:', error);
        }
    }
    
    initializeComponents() {
        // 初始化移动端菜单
        this.initializeMobileMenu();
        
        // 初始化购物车
        this.initializeCart();
        
        // 重新初始化语言系统以确保header和footer中的文本被翻译
        if (window.languageSystem) {
            window.languageSystem.applyLanguage(window.languageSystem.currentLang);
        }
    }
    
    initializeMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
            });
        }
    }
    
    initializeCart() {
        const cartToggle = document.getElementById('cart-toggle');
        const cartSidebar = document.querySelector('.cart-sidebar');
        const closeCart = document.querySelector('.close-cart');
        const cartItems = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const requestQuotationBtn = document.querySelector('.request-quotation');
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // 更新购物车显示
        const updateCartDisplay = () => {
            if (!cartItems) return;
            
            cartItems.innerHTML = '';
            let totalItems = 0;
            
            cart.forEach((item, index) => {
                totalItems += item.quantity;
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRThGMkZGIi8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiMxRTZGRDkiLz4KPC9zdmc+'">
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
        };
        
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
                let emailBody = '产品询价请求:\\n\\n';
                let totalValue = 0;
                
                cart.forEach(item => {
                    emailBody += `产品: ${item.name}\\n`;
                    emailBody += `单价: $${item.price}\\n`;
                    emailBody += `数量: ${item.quantity}\\n`;
                    emailBody += `小计: $${(item.price * item.quantity).toFixed(2)}\\n\\n`;
                    totalValue += item.price * item.quantity;
                });
                
                emailBody += `总计: $${totalValue.toFixed(2)}\\n\\n`;
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
}

// 初始化页面加载器
document.addEventListener('DOMContentLoaded', function() {
    new PageLoader();
});