# 个人博客网站重建计划

## 📌 重要沟通规则

1. **每个东西一步步做，我不说你不做**
2. **每次做一个东西，先说明为什么要做这一步，再等我确认后才做**

## ✅ 当前进度

**Day 1 已完成**
**Day 2 已完成**
**今天是 Day 3 - 准备开始**

## 第一周：框架

### Day 1：基础架构 ✅ 已完成

- ✅ 项目初始化 + 依赖安装
- ✅ 数据库 + Prisma (Profile、Post 模型)
- ✅ Clerk 认证
- ✅ 三层布局 (root → locale → dashboard)
- ✅ 极简 Navbar

### Day 2：多语言 + 导航栏设计 ✅ 已完成

- ✅ i18n.ts + 三个 JSON (只翻译 UI)
- ✅ middleware 路由重定向（含浏览器语言检测）
- ✅ LanguageSwitcher 组件
- ✅ 页面接入翻译（Navbar 已支持）
- ✅ 修复：语言下拉菜单暗色模式支持
- ✅ 修复：统一 hover 宽度
- ✅ 完全重构导航栏，模仿 jzliu.net 设计风格
- ✅ 字体系统：Rubik（正文）、Libre Baskerville（标题和 Logo）
- ✅ 统一颜色方案：黑色文字 + #F35029 橙色 hover
- ✅ 导航栏响应式：小屏上下居中，大屏左右分布
- ✅ 创建 site.ts 配置文件统一管理站点信息
- ✅ 修复 Clerk sign-in 路由到多语言路径

### Day 3-4：页面 🚧 准备开始

**计划调整：先建立统一的设计系统**

- ⏳ 参考 jzliu.net 的学术简约风格
- ⏳ 创建统一的 ArticleItem 组件（列表式，非卡片）
- ⏳ 定义颜色、排版系统

**原计划页面开发：**

- ⏳ About 页 (读 Profile，没有就占位)
- ⏳ Projects 页 (假数据卡片)
- ⏳ Blog 页 (假数据列表)
- ⏳ 首页 (欢迎语 + 链接)

### Day 5：权限

- ⏳ settings.ts + utils.ts
- ⏳ 根据用户名显示不同内容
- ⏳ Admin 导航项 (Ellis 专属)
- ⏳ 编辑按钮 (只显示不跳转)

---

## 第二周：内容

### Day 6-7：内容管理

- ⏳ 创建/编辑表单 (新页面，不用 Modal)
- ⏳ API 路由 (只实现 POST 和 PUT)
- ⏳ 原生 textarea (不用 MD 编辑器)
- ⏳ alert 提示 (不用 toast)

### Day 8-9：填充内容

- ⏳ 3-5 篇博客
- ⏳ 3-5 个项目
- ⏳ 个人介绍 (中英文)
- ⏳ 首页展示最新内容

### Day 10：详情页

- ⏳ 博客详情 ([id]路由)
- ⏳ 项目详情 (可选)
- ⏳ react-markdown 渲染
- ⏳ 返回按钮

### Day 11-12：可见性

- ⏳ visibility 字段
- ⏳ 内容过滤
- ⏳ 测试三种角色
- ⏳ 添加 VIP 内容

---

## 第三周：优化

### 必须的

- ⏳ Loading 状态
- ⏳ 404 和错误处理
- ⏳ 移动端响应式
- ⏳ SEO 基础 (title、description、OG)
- ⏳ next/image 优化

### 值得的

- ⏳ Toast 替代 alert
- ⏳ 表单验证 (zod)
- ⏳ MD 编辑器
- ⏳ 分页

### 以后再说

- ⏳ 图片上传
- ⏳ 标签搜索
- ⏳ 暗色模式手动切换
- ⏳ 评论系统
- ⏳ 性能优化

---

## 技术栈

- Next.js 15 (App Router)
- TypeScript
- Prisma + PostgreSQL
- Clerk (认证)
- Tailwind CSS
- i18n (中英法三语)

## 设计参考

- jzliu.net (学术简约风格)

## 项目文件结构

```
src/
├── app/
│   ├── layout.tsx (root)
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── (dashboard)/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── about/
│   │       ├── projects/
│   │       └── blog/
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   └── LanguageSwitcher.tsx
├── config/
│   └── site.ts
├── i18n/
│   ├── i18n.ts
│   └── locales/ (zh.json, en.json, fr.json)
└── lib/
    └── prisma.ts
```

## 当前样式系统

- 字体：Rubik (body), Libre Baskerville (headings/logo)
- 主色：#000 (黑)
- 强调色：#F35029 (橙)
- 边框：黑色 2-3px
- Hover：橙色 + 下划线
