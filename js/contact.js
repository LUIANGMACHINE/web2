// 联系页面功能
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                date: new Date().toISOString()
            };
            
            // 保存到本地存储（在实际应用中应该发送到服务器）
            let messages = JSON.parse(localStorage.getItem('contact-messages')) || [];
            messages.push(formData);
            localStorage.setItem('contact-messages', JSON.stringify(messages));
            
            // 发送邮件（模拟）
            sendContactEmail(formData);
            
            // 显示成功消息
            alert('消息已发送！我们会尽快回复您。');
            
            // 重置表单
            contactForm.reset();
        });
    }
}

function sendContactEmail(formData) {
    const email = 'luiangparts@luiangparts.com';
    const subject = `网站联系表单: ${formData.subject}`;
    const body = `
姓名: ${formData.name}
公司: ${formData.company}
邮箱: ${formData.email}
电话: ${formData.phone}
主题: ${formData.subject}

消息内容:
${formData.message}

发送时间: ${new Date().toLocaleString()}
    `;
    
    // 在实际应用中，这里应该通过服务器发送邮件
    // 这里只是模拟，在实际部署时需要后端支持
    console.log('发送邮件到:', email);
    console.log('主题:', subject);
    console.log('内容:', body);
    
    // 或者使用mailto链接（但有限制）
    // window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}