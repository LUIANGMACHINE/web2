// 后台管理JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 导航切换
    const adminNavs = document.querySelectorAll('.admin-nav');
    const adminSections = document.querySelectorAll('.admin-section');
    
    adminNavs.forEach(nav => {
        nav.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // 更新活动导航
            adminNavs.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            
            // 显示目标部分
            adminSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // 产品管理
    const addProductBtn = document.getElementById('add-product-btn');
    const productForm = document.querySelector('.product-form');
    const productFormElement = document.getElementById('product-form');
    const cancelProductBtn = document.getElementById('cancel-product');
    const productsList = document.getElementById('products-list');
    
    let products = JSON.parse(localStorage.getItem('admin-products')) || [];
    let editingProductId = null;
    
    // 显示/隐藏产品表单
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            productForm.style.display = 'block';
            productFormElement.reset();
            editingProductId = null;
            document.getElementById('product-image-preview').innerHTML = '';
        });
    }
    
    if (cancelProductBtn) {
        cancelProductBtn.addEventListener('click', function() {
            productForm.style.display = 'none';
        });
    }
    
    // 处理产品表单提交
    if (productFormElement) {
        productFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const productData = {
                id: editingProductId || Date.now().toString(),
                name: document.getElementById('product-name').value,
                category: document.getElementById('product-category').value,
                price: document.getElementById('product-price').value,
                stock: document.getElementById('product-stock').value || 0,
                description: document.getElementById('product-description').value,
                image: document.getElementById('product-image-preview').querySelector('img')?.src || 'images/product1.jpg',
                createdAt: new Date().toISOString()
            };
            
            if (editingProductId) {
                // 更新现有产品
                const index = products.findIndex(p => p.id === editingProductId);
                if (index !== -1) {
                    products[index] = productData;
                }
            } else {
                // 添加新产品
                products.push(productData);
            }
            
            // 保存到本地存储
            localStorage.setItem('admin-products', JSON.stringify(products));
            
            // 更新显示
            loadProducts();
            
            // 重置表单
            productForm.style.display = 'none';
            productFormElement.reset();
            editingProductId = null;
            
            alert('产品保存成功');
        });
    }
    
    // 加载产品列表
    function loadProducts() {
        if (!productsList) return;
        
        productsList.innerHTML = '';
        
        if (products.length === 0) {
            productsList.innerHTML = `
                <div class="empty-state">
                    <p>暂无产品，点击"添加新产品"开始添加</p>
                </div>
            `;
            return;
        }
        
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRThGMkZGIi8+CjxwYXRoIGQ9Ik0yMCAyMEg2MFY2MEgyMFYyMFoiIGZpbGw9IiMxRTZGRDkiLz4KPC9zdmc+''">
                <div class="product-details">
                    <h4>${product.name}</h4>
                    <div class="product-meta">
                        <span>分类: ${getCategoryName(product.category)}</span> | 
                        <span>价格: $${product.price}</span> | 
                        <span>库存: ${product.stock}</span>
                    </div>
                    <p>${product.description.substring(0, 100)}...</p>
                </div>
                <div class="product-actions">
                    <button class="btn-edit" data-id="${product.id}">编辑</button>
                    <button class="btn-delete" data-id="${product.id}">删除</button>
                </div>
            `;
            productsList.appendChild(productItem);
        });
        
        // 更新产品数量
        document.getElementById('product-count').textContent = products.length;
        
        // 绑定编辑和删除事件
        document.querySelectorAll('.product-item .btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                editProduct(productId);
            });
        });
        
        document.querySelectorAll('.product-item .btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                deleteProduct(productId);
            });
        });
    }
    
    // 获取分类名称
    function getCategoryName(category) {
        const categories = {
            'fuel-dispenser': '加油机',
            'fuel-dispenser-parts': '加油机配件',
            'adblue-equipment': '尿素配件',
            'industrial-pump': '工业泵和流量计',
            'lpg-equipment': 'LPG 配件',
            'other-equipment': '其他'
        };
        return categories[category] || category;
    }
    
    // 编辑产品
    function editProduct(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-description').value = product.description;
        
        const imagePreview = document.getElementById('product-image-preview');
        imagePreview.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
        
        productForm.style.display = 'block';
        editingProductId = productId;
    }
    
    // 删除产品
    function deleteProduct(productId) {
        if (confirm('确定要删除这个产品吗？')) {
            products = products.filter(p => p.id !== productId);
            localStorage.setItem('admin-products', JSON.stringify(products));
            loadProducts();
        }
    }
    
    // 图片预览
    const productImageInput = document.getElementById('product-image');
    if (productImageInput) {
        productImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imagePreview = document.getElementById('product-image-preview');
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="预览">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // 博客管理
    const addBlogBtn = document.getElementById('add-blog-btn');
    const blogForm = document.querySelector('.blog-form');
    const blogFormElement = document.getElementById('blog-form');
    const cancelBlogBtn = document.getElementById('cancel-blog');
    const blogsList = document.getElementById('blogs-list');
    
    let blogs = JSON.parse(localStorage.getItem('admin-blogs')) || [];
    let editingBlogId = null;
    
    // 显示/隐藏博客表单
    if (addBlogBtn) {
        addBlogBtn.addEventListener('click', function() {
            blogForm.style.display = 'block';
            blogFormElement.reset();
            editingBlogId = null;
            document.getElementById('blog-image-preview').innerHTML = '';
        });
    }
    
    if (cancelBlogBtn) {
        cancelBlogBtn.addEventListener('click', function() {
            blogForm.style.display = 'none';
        });
    }
    
    // 处理博客表单提交
    if (blogFormElement) {
        blogFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const blogData = {
                id: editingBlogId || Date.now().toString(),
                title: document.getElementById('blog-title').value,
                content: document.getElementById('blog-content').value,
                image: document.getElementById('blog-image-preview').querySelector('img')?.src || 'images/blog1.jpg',
                date: new Date().toLocaleDateString('zh-CN'),
                createdAt: new Date().toISOString()
            };
            
            if (editingBlogId) {
                // 更新现有博客
                const index = blogs.findIndex(b => b.id === editingBlogId);
                if (index !== -1) {
                    blogs[index] = blogData;
                }
            } else {
                // 添加新博客
                blogs.push(blogData);
            }
            
            // 保存到本地存储
            localStorage.setItem('admin-blogs', JSON.stringify(blogs));
            
            // 更新显示
            loadBlogs();
            
            // 重置表单
            blogForm.style.display = 'none';
            blogFormElement.reset();
            editingBlogId = null;
            
            alert('博客文章保存成功');
        });
    }
    
    // 加载博客列表
    function loadBlogs() {
        if (!blogsList) return;
        
        blogsList.innerHTML = '';
        
        if (blogs.length === 0) {
            blogsList.innerHTML = `
                <div class="empty-state">
                    <p>暂无文章，点击"添加新文章"开始撰写</p>
                </div>
            `;
            return;
        }
        
        blogs.forEach(blog => {
            const blogItem = document.createElement('div');
            blogItem.className = 'blog-item';
            blogItem.innerHTML = `
                <img src="${blog.image}" alt="${blog.title}" class="blog-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRThGMkZGIi8+CjxwYXRoIGQ9Ik0yMCAyMEg2MFY2MEgyMFYyMFoiIGZpbGw9IiMxRTZGRDkiLz4KPC9zdmc+''">
                <div class="blog-details">
                    <h4>${blog.title}</h4>
                    <div class="blog-meta">
                        <span>发布日期: ${blog.date}</span>
                    </div>
                    <p>${blog.content.substring(0, 100)}...</p>
                </div>
                <div class="blog-actions">
                    <button class="btn-edit" data-id="${blog.id}">编辑</button>
                    <button class="btn-delete" data-id="${blog.id}">删除</button>
                </div>
            `;
            blogsList.appendChild(blogItem);
        });
        
        // 更新博客数量
        document.getElementById('blog-count').textContent = blogs.length;
        
        // 绑定编辑和删除事件
        document.querySelectorAll('.blog-item .btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = this.getAttribute('data-id');
                editBlog(blogId);
            });
        });
        
        document.querySelectorAll('.blog-item .btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = this.getAttribute('data-id');
                deleteBlog(blogId);
            });
        });
    }
    
    // 编辑博客
    function editBlog(blogId) {
        const blog = blogs.find(b => b.id === blogId);
        if (!blog) return;
        
        document.getElementById('blog-id').value = blog.id;
        document.getElementById('blog-title').value = blog.title;
        document.getElementById('blog-content').value = blog.content;
        
        const imagePreview = document.getElementById('blog-image-preview');
        imagePreview.innerHTML = `<img src="${blog.image}" alt="${blog.title}">`;
        
        blogForm.style.display = 'block';
        editingBlogId = blogId;
    }
    
    // 删除博客
    function deleteBlog(blogId) {
        if (confirm('确定要删除这篇博客文章吗？')) {
            blogs = blogs.filter(b => b.id !== blogId);
            localStorage.setItem('admin-blogs', JSON.stringify(blogs));
            loadBlogs();
        }
    }
    
    // 博客图片预览
    const blogImageInput = document.getElementById('blog-image');
    if (blogImageInput) {
        blogImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imagePreview = document.getElementById('blog-image-preview');
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="预览">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // 留言管理
    function loadMessages() {
        const messagesList = document.getElementById('messages-list');
        if (!messagesList) return;
        
        const messages = JSON.parse(localStorage.getItem('contact-messages')) || [];
        
        messagesList.innerHTML = '';
        
        if (messages.length === 0) {
            messagesList.innerHTML = `
                <div class="empty-state">
                    <p>暂无留言</p>
                </div>
            `;
            return;
        }
        
        messages.forEach((message, index) => {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            messageItem.innerHTML = `
                <div class="message-details">
                    <div class="message-header">
                        <h4>${message.name} - ${message.email}</h4>
                        <span>${new Date(message.date).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <div class="message-content">
                        <p><strong>主题:</strong> ${message.subject}</p>
                        <p><strong>公司:</strong> ${message.company || '未提供'}</p>
                        <p><strong>电话:</strong> ${message.phone || '未提供'}</p>
                        <p><strong>内容:</strong> ${message.message}</p>
                    </div>
                </div>
                <div class="message-actions">
                    <button class="btn-delete" data-index="${index}">删除</button>
                </div>
            `;
            messagesList.appendChild(messageItem);
        });
        
        // 更新留言数量
        document.getElementById('message-count').textContent = messages.length;
        
        // 绑定删除事件
        document.querySelectorAll('.message-item .btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                deleteMessage(index);
            });
        });
    }
    
    // 删除留言
    function deleteMessage(index) {
        if (confirm('确定要删除这条留言吗？')) {
            const messages = JSON.parse(localStorage.getItem('contact-messages')) || [];
            messages.splice(index, 1);
            localStorage.setItem('contact-messages', JSON.stringify(messages));
            loadMessages();
        }
    }
    
    // 网站设置
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const settings = {
                email: document.getElementById('company-email').value,
                phone: document.getElementById('company-phone').value,
                address1: document.getElementById('company-address1').value,
                address2: document.getElementById('company-address2').value,
                name1: document.getElementById('company-name1').value,
                name2: document.getElementById('company-name2').value
            };
            
            localStorage.setItem('website-settings', JSON.stringify(settings));
            alert('设置已保存');
        });
    }
    
    // 加载设置
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('website-settings')) || {};
        
        if (settings.email) {
            document.getElementById('company-email').value = settings.email;
        }
        if (settings.phone) {
            document.getElementById('company-phone').value = settings.phone;
        }
        if (settings.address1) {
            document.getElementById('company-address1').value = settings.address1;
        }
        if (settings.address2) {
            document.getElementById('company-address2').value = settings.address2;
        }
        if (settings.name1) {
            document.getElementById('company-name1').value = settings.name1;
        }
        if (settings.name2) {
            document.getElementById('company-name2').value = settings.name2;
        }
    }
    
    // 初始化加载
    loadProducts();
    loadBlogs();
    loadMessages();
    loadSettings();
});