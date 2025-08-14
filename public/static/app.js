// Hello World 网站前端交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    const testApiBtn = document.getElementById('testApi');
    const showTimeBtn = document.getElementById('showTime');
    const resultDiv = document.getElementById('result');

    // 显示结果的通用函数
    function showResult(content, type = 'info') {
        resultDiv.innerHTML = content;
        resultDiv.className = `result show ${type}`;
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 测试 API 功能
    testApiBtn.addEventListener('click', async function() {
        try {
            showResult('<div style="text-align: center;"><i class="fas fa-spinner fa-spin"></i> 正在调用 API...</div>', 'loading');
            
            const response = await axios.get('/api/hello');
            const data = response.data;
            
            const resultHtml = `
                <h4><i class="fas fa-check-circle" style="color: #10b981;"></i> API 调用成功！</h4>
                <pre>${JSON.stringify(data, null, 2)}</pre>
                <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
                    <i class="fas fa-info-circle"></i> 这是来自 Hono 后端的 JSON 响应
                </p>
            `;
            
            showResult(resultHtml, 'success');
        } catch (error) {
            console.error('API 调用错误:', error);
            const errorHtml = `
                <h4><i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i> API 调用失败</h4>
                <pre>错误信息: ${error.message}</pre>
            `;
            showResult(errorHtml, 'error');
        }
    });

    // 显示时间功能
    showTimeBtn.addEventListener('click', function() {
        const now = new Date();
        const timeString = now.toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            weekday: 'long'
        });
        
        const timeHtml = `
            <h4><i class="fas fa-clock" style="color: #3b82f6;"></i> 当前时间</h4>
            <div style="font-size: 1.2rem; font-weight: 600; color: #333; margin: 1rem 0;">
                ${timeString}
            </div>
            <p style="color: #666; font-size: 0.9rem;">
                <i class="fas fa-map-marker-alt"></i> 中国标准时间 (UTC+8)
            </p>
        `;
        
        showResult(timeHtml, 'info');
    });

    // 页面加载动画
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }

    // 添加一些交互反馈
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 特性卡片悬停效果
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.6s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 300 + index * 150);
    });

    console.log('🌟 Hello World 网站已加载完成！');
    console.log('🚀 基于 Hono + Cloudflare Pages 构建');
    console.log('⚡ 轻量、快速、现代化');
});