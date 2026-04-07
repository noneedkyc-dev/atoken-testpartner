# AToken Network Explorer 可上线版本

## 支持部署平台
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- 任意静态服务器 / CDN / Nginx

## 包含
- 页面源码：`index.html`
- 样式：`css/styles.css`
- 脚本：`js/main.js`
- 数据：`data/partners.json`
- 资源：`assets/atoken-logo.png`
- 上线配置：`vercel.json`、`netlify.toml`
- SEO：`robots.txt`、`sitemap.xml`、`site.webmanifest`

## 本地预览
```bash
python -m http.server 8000
```

打开：
```text
http://localhost:8000
```

## Vercel 部署
1. 上传全部文件到 GitHub
2. 打开 Vercel，导入仓库
3. Framework 选择 `Other`
4. 直接 Deploy

## Netlify 部署
1. 上传到 GitHub
2. Netlify 中导入仓库
3. Publish directory 填 `.`
4. Deploy

## 上线前需要替换
### 1. 域名
把这些文件里的 `https://example.com` 改成真实域名：
- `sitemap.xml`
- `robots.txt`
- `index.html` 里的 `og:url`

### 2. 真实合作方数据
编辑：
- `data/partners.json`

### 3. 真实链接
替换：
- 顶部导航跳转
- Connect Wallet
- View Profile
- View All Partners

## 建议继续补充
- 真实头像 / logo
- GA / Plausible 统计
- 多语言
- favicon 多尺寸
- partnership profile 详情页
