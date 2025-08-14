import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

app.use(renderer)

// API route - 返回 JSON 数据
app.get('/api/hello', (c) => {
  const currentTime = new Date().toLocaleString('zh-CN', { 
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  return c.json({ 
    message: 'Hello from Hono API!',
    time: currentTime,
    status: 'success'
  })
})

// 主页 - 返回 HTML
app.get('/', (c) => {
  return c.render(
    <div className="container">
      <div className="hero">
        <h1>🌟 Hello World!</h1>
        <p className="subtitle">欢迎来到基于 Hono + Cloudflare Pages 构建的网站</p>
        <div className="features">
          <div className="feature">
            <span className="icon">🚀</span>
            <h3>高性能</h3>
            <p>基于 Cloudflare Edge Runtime</p>
          </div>
          <div className="feature">
            <span className="icon">⚡</span>
            <h3>轻量级</h3>
            <p>Hono 框架，快如闪电</p>
          </div>
          <div className="feature">
            <span className="icon">🌐</span>
            <h3>全球部署</h3>
            <p>边缘计算，全球加速</p>
          </div>
        </div>
        <div className="actions">
          <button id="testApi" className="btn btn-primary">测试 API</button>
          <button id="showTime" className="btn btn-secondary">显示时间</button>
        </div>
        <div id="result" className="result"></div>
      </div>
    </div>
  )
})

export default app
