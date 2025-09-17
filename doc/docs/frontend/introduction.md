# Next.js 15 前端框架架构

## 概览

本项目前端基于 Next.js 15 构建，采用现代化的 React 18 技术栈，提供高性能、类型安全的用户界面开发体验。

## 技术栈

### 核心技术
- **Next.js 15**: React 全栈框架，支持 App Router 和服务端渲染
- **React 18**: 前端UI库，支持并发特性和 Suspense
- **TypeScript**: 类型安全的 JavaScript 超集
- **Node.js**: 运行时环境

### UI 组件库
- **Ant Design (antd)**: 企业级 React UI 组件库
- **@ant-design/icons**: Ant Design 图标库
- **@ant-design/nextjs-registry**: Next.js 集成支持

### 状态管理
- **Zustand**: 轻量级状态管理库
- **React Context**: 组件间数据共享

### 样式方案
- **CSS Modules**: 模块化样式
- **Tailwind CSS**: 实用优先的 CSS 框架
- **styled-components**: CSS-in-JS 样式库

### 开发工具
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Husky**: Git hooks 管理
- **lint-staged**: 提交前代码检查

### 测试工具
- **Jest**: 单元测试框架
- **React Testing Library**: React 组件测试
- **Playwright**: 端到端测试

## 项目结构

```
frontend/
├── app/                    # Next.js App Router 路由目录
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局组件
│   ├── page.tsx            # 首页组件
│   └── api/                # API 路由
├── components/             # 可复用组件
│   ├── ui/                 # 基础UI组件
│   └── layout/             # 布局组件
├── lib/                    # 工具函数和配置
│   ├── utils.ts            # 通用工具函数
│   └── store.ts            # Zustand 状态管理
├── hooks/                  # 自定义 React Hooks
├── types/                  # TypeScript 类型定义
├── public/                 # 静态资源
├── __tests__/              # 测试文件
├── next.config.js          # Next.js 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
├── package.json            # 项目依赖
└── README.md               # 项目说明
```

## 核心特性

### 1. App Router 架构
- 基于文件系统的路由
- 支持嵌套布局和并行路由
- 服务端组件和客户端组件混合使用

### 2. 类型安全
- 全面的 TypeScript 支持
- 严格的类型检查配置
- API 类型自动生成

### 3. 组件设计
- 基于 Ant Design 的组件库
- 可复用的自定义组件
- 响应式设计支持

### 4. 状态管理
- Zustand 轻量级状态管理
- React Context 局部状态共享
- 服务端状态同步

### 5. 性能优化
- 代码分割和懒加载
- 图片优化 (Next.js Image)
- 字体优化 (Next.js Font)
- 构建时优化

## 开发指南

### 环境要求
- Node.js 18+ 
- pnpm 包管理器

### 安装依赖
```bash
cd frontend
pnpm install
```

### 开发服务器
```bash
pnpm dev
```
访问 http://localhost:3000

### 构建生产版本
```bash
pnpm build
pnpm start
```

### 代码质量检查
```bash
pnpm lint
pnpm lint:fix
```

### 运行测试
```bash
# 单元测试
pnpm test

# 监听模式
pnpm test:watch

# 端到端测试
pnpm test:e2e
```

## 开发规范

### 1. 组件开发
- 使用函数式组件和 Hooks
- 组件名使用 PascalCase
- Props 接口以组件名 + Props 命名

```tsx
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <Card>
      <h3>{user.name}</h3>
      <Button onClick={() => onEdit(user.id)}>编辑</Button>
    </Card>
  );
};
```

### 2. 状态管理
- 使用 Zustand 管理全局状态
- 局部状态使用 useState
- 复杂状态逻辑使用 useReducer

```tsx
// stores/userStore.ts
import { create } from 'zustand';

interface UserStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    // API 调用逻辑
    set({ users: data, loading: false });
  },
}));
```

### 3. API 集成
- 使用 fetch 或 axios 进行 HTTP 请求
- 统一的错误处理
- 请求和响应拦截器

```tsx
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },
};
```

### 4. 样式开发
- 优先使用 Tailwind CSS 工具类
- 复杂样式使用 CSS Modules
- 主题配置统一管理

```tsx
// 推荐写法
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800">标题</h2>
  <Button type="primary">操作</Button>
</div>
```

## 部署

### Docker 部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 环境变量配置
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_ENV=development
```

## 最佳实践

### 1. 性能优化
- 使用 React.memo 避免不必要的重渲染
- 合理使用 useMemo 和 useCallback
- 图片懒加载和 WebP 格式
- 代码分割和动态导入

### 2. 安全性
- 输入验证和消毒
- CSP (Content Security Policy) 配置
- 环境变量保护敏感信息

### 3. 可访问性
- 语义化 HTML 标签
- 键盘导航支持
- 屏幕阅读器友好

### 4. SEO 优化
- 合理的页面标题和描述
- 结构化数据标记
- 移动端优先设计

## 故障排除

### 常见问题

1. **样式不生效**
   - 检查 Tailwind CSS 配置
   - 确认 CSS 导入顺序

2. **组件渲染错误**
   - 检查 TypeScript 类型定义
   - 确认组件导入导出

3. **状态更新不及时**
   - 检查状态管理逻辑
   - 确认依赖数组配置

4. **构建失败**
   - 检查 TypeScript 编译错误
   - 确认环境变量配置

## 扩展阅读

- [Next.js 官方文档](https://nextjs.org/docs)
- [React 18 新特性](https://react.dev/blog/2022/03/29/react-v18)
- [Ant Design 组件库](https://ant.design/components/overview-cn)
- [Zustand 状态管理](https://github.com/pmndrs/zustand)
- [Tailwind CSS 工具类](https://tailwindcss.com/docs)