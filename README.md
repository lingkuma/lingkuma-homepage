# Lingkuma Homepage

Lingkuma 官方网站 - [Lingkuma](https://lingkuma.org/)

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **国际化**: i18next (中文 / English)
- **部署**: Cloudflare Pages

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build

# 预览构建结果
pnpm preview
```

## 项目结构

```
src/
├── components/     # React 组件
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── Footer.tsx
├── locales/        # 国际化文件
│   ├── en/
│   └── zh-CN/
├── App.tsx         # 主应用（含主题切换）
└── main.tsx        # 入口文件
```

## 主题

支持多种配色主题：
- Ayu Light / Dark / Mirage
- Dracula
- Nord

## License

MIT
