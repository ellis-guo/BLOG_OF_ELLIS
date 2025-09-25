# 个人博客网站重建计划

## 📌 重要沟通规则
1. **每个东西一步步做，我不说你不做**
2. **每次做一个东西，先说明为什么要做这一步，再等我确认后才做**

## ✅ 当前进度
**今天是 Day 2**  
**Day 1 已完成**

## 第一周：框架

### Day 1：基础架构 ✅ 已完成
- 项目初始化 + 依赖安装
- 数据库 + Prisma (Profile、Post模型)
- Clerk 认证
- 三层布局 (root → locale → dashboard)
- 极简 Navbar

### Day 2：多语言
- i18n.ts + 三个JSON (只翻译UI)
- middleware 路由重定向
- LanguageSwitcher 组件
- 页面接入翻译

### Day 3-4：页面
- About页 (读Profile，没有就占位)
- Projects页 (假数据卡片)
- Blog页 (假数据列表)
- 首页 (欢迎语 + 链接)

### Day 5：权限
- settings.ts + utils.ts
- 根据用户名显示不同内容
- Admin导航项 (Ellis专属)
- 编辑按钮 (只显示不跳转)

---

## 第二周：内容

### Day 6-7：内容管理
- 创建/编辑表单 (新页面，不用Modal)
- API路由 (只实现POST和PUT)
- 原生textarea (不用MD编辑器)
- alert提示 (不用toast)

### Day 8-9：填充内容
- 3-5篇博客
- 3-5个项目
- 个人介绍 (中英文)
- 首页展示最新内容

### Day 10：详情页
- 博客详情 ([id]路由)
- 项目详情 (可选)
- react-markdown渲染
- 返回按钮

### Day 11-12：可见性
- visibility字段
- 内容过滤
- 测试三种角色
- 添加VIP内容

---

## 第三周：优化

### 必须的
- Loading状态
- 404和错误处理
- 移动端响应式
- SEO基础 (title、description、OG)
- next/image优化

### 值得的
- Toast替代alert
- 表单验证 (zod)
- MD编辑器
- 分页

### 以后再说
- 图片上传
- 标签搜索
- 暗色模式
- 评论系统
- 性能优化