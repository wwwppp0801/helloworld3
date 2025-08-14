// PM2 配置文件 - Hello World 网站
module.exports = {
  apps: [
    {
      name: 'webapp',
      script: 'npx',
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false, // 禁用 PM2 文件监控（wrangler 有自己的热重载）
      instances: 1, // 开发模式只用一个实例
      exec_mode: 'fork',
      restart_delay: 2000,
      max_restarts: 5,
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      autorestart: true
    }
  ]
}