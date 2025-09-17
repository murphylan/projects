# Murphy - 现代化全栈应用框架

[![CI/CD](https://github.com/murphy/murphy/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/murphy/murphy/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Java Version](https://img.shields.io/badge/java-21-orange.svg)](https://openjdk.java.net/projects/jdk/21/)

基于 Next.js 15 + Spring Boot 3.x 的企业级全栈应用开发框架，同时提供**传统 MVC** 和**响应式 WebFlux** 两种后端架构选择。

## 🚀 架构对比

### 🔄 双后端架构设计

本项目提供两种不同的后端实现，您可以根据具体需求选择合适的架构：

| 特性 | MVC Backend (端口8080) | WebFlux Backend (端口8081) |
|------|----------------------|---------------------------|
| **技术栈** | Spring MVC + Servlet | Spring WebFlux + Netty |
| **编程模型** | 阻塞式 (Blocking) | 响应式 (Reactive) |
| **线程模型** | 一请求一线程 | 事件循环 |
| **数据库** | JPA + PostgreSQL | R2DBC + PostgreSQL |
| **适用场景** | 传统企业应用 | 高并发、流式数据 |
| **学习成本** | 低 | 高 |
| **性能特点** | 高吞吐量，资源占用较高 | 高并发，资源占用较低 |

## 🚀 技术栈

### 前端技术
- **框架**: Next.js 15 + React 18
- **语言**: TypeScript
- **UI 组件**: Ant Design 5.x
- **状态管理**: Zustand (轻量化状态管理 + 持久化)
- **样式**: Tailwind CSS
- **实时通信**: Server-Sent Events (SSE)
- **API 请求**: React Query
- **测试**: Jest + React Testing Library + Playwright
- **代码质量**: ESLint + Prettier

### 后端技术
- **框架**: Spring Boot 3.3.x + Spring Security + Spring Data
- **语言**: Java 21
- **数据库**: 
  - 关系型：PostgreSQL
  - 非关系型：MongoDB
  - 缓存：Redis
- **消息队列**: Kafka / RabbitMQ
- **搜索引擎**: Elasticsearch
- **API 文档**: OpenAPI 3.0 + Swagger UI
- **安全**: JWT + OAuth2
- **测试**: JUnit 5 + Testcontainers + WireMock
- **代码质量**: Checkstyle + SpotBugs

### 基础设施
- **容器化**: Docker + Docker Compose
- **编排**: Kubernetes (可选)
- **CI/CD**: GitHub Actions
- **监控**: Prometheus + Grafana + ELK Stack
- **负载均衡**: Nginx
- **包管理**: pnpm (前端) + Gradle (后端)

## 📁 项目结构 (重构后)

经过架构优化，Murphy项目现在采用更清晰的模块化架构：

```
murphy/
├── apps/                    # 应用层
│   └── frontend/           # Next.js 15 前端应用
│       ├── src/
│       │   ├── app/        # App Router 页面
│       │   ├── components/ # 可复用组件
│       │   ├── store/      # Zustand 状态管理
│       │   ├── lib/        # 工具库
│       │   └── types/      # TypeScript 类型定义
│       ├── e2e/            # Playwright E2E 测试
│       └── package.json
├── packages/               # 可复用包
│   ├── common/             # 通用工具和类型定义
│   │   ├── src/
│   │   │   ├── types/      # 共享TypeScript类型
│   │   │   ├── utils/      # 通用工具函数
│   │   │   └── constants/  # 业务常量
│   │   └── package.json
│   ├── auth-service/       # 认证服务 (Spring Boot)
│   │   ├── src/main/java/com/murphy/auth/
│   │   │   ├── config/     # Spring Security配置
│   │   │   ├── controller/ # 认证API
│   │   │   ├── service/    # 认证业务逻辑
│   │   │   └── entity/     # 用户实体
│   │   └── build.gradle
│   └── database/           # 数据库抽象层
│       ├── src/main/java/com/murphy/database/
│       │   ├── entity/     # JPA实体定义
│       │   ├── repository/ # Repository接口
│       │   └── config/     # 数据库配置
│       └── build.gradle
├── services/               # 业务服务
│   ├── backend-mvc/        # Spring MVC 服务
│   │   ├── src/main/java/com/murphy/mvc/
│   │   │   ├── config/     # 配置类
│   │   │   ├── controller/ # REST 控制器
│   │   │   ├── service/    # 业务逻辑层
│   │   │   └── dto/        # 数据传输对象
│   │   └── build.gradle
│   └── backend-webflux/    # Spring WebFlux 服务
│       ├── src/main/java/com/murphy/webflux/
│       │   ├── config/     # 配置类
│       │   ├── controller/ # 响应式控制器
│       │   ├── service/    # 响应式业务逻辑层
│       │   └── dto/        # 数据传输对象
│       └── build.gradle
├── docs/                   # Docusaurus 文档站点
├── .github/                # GitHub Actions 工作流
├── monitoring/             # 监控配置 (Prometheus, Grafana)
├── docker-compose.yml      # 完整开发环境
├── package.json           # Workspace 根配置
└── pnpm-workspace.yaml    # pnpm 工作空间配置
```

### 🏗️ 架构设计优势

#### 🎯 **清晰的层次结构**
- **apps/** - 应用层：面向用户的应用程序
- **packages/** - 可复用包：跨项目共享的模块
- **services/** - 业务服务：独立的Spring Boot服务

#### 📦 **模块化设计**

**1. packages/common** - 通用工具包
- 🔧 **作用**: 前后端共享的类型定义、工具函数、常量
- 📋 **包含**: 
  - API接口类型、用户类型、分页类型
  - 日期处理、字符串处理、验证函数
  - API端点、HTTP状态码、默认配置
- 🎯 **优势**: 保证前后端类型一致性，减少重复代码

**2. packages/auth-service** - 认证服务
- 🔐 **作用**: 独立的认证和授权服务
- 🛠️ **技术栈**: Spring Boot 3.5.5 + Spring Security + JWT
- 🚀 **功能**: 用户登录/注册、JWT令牌管理、权限验证
- 🌐 **端口**: 8082 (独立运行)

**3. packages/database** - 数据库层
- 🗄️ **作用**: 数据访问层的抽象和共享
- 🛠️ **技术栈**: Spring Data JPA + Flyway + PostgreSQL
- 📊 **功能**: JPA实体定义、Repository接口、数据库迁移
- 🔄 **使用方式**: 被其他Spring Boot服务引用

**4. services/backend-mvc** - MVC业务服务
- 🌐 **作用**: 传统的RESTful API服务
- ⚡ **特点**: 同步请求处理，适合CRUD操作
- 🚀 **端口**: 8080

**5. services/backend-webflux** - 响应式服务
- 🔄 **作用**: 高并发的响应式服务
- ⚡ **特点**: 异步非阻塞处理，适合高并发场景
- 🚀 **端口**: 8081

**6. apps/frontend** - 前端应用
- 💻 **技术栈**: Next.js 15 + React + TypeScript
- 🎨 **UI**: Tailwind CSS + Ant Design
- 🔗 **集成**: 使用common包中的类型定义
- 🚀 **端口**: 3000

## 🏗️ 快速开始

### 前置要求

- **Node.js**: >= 18.0.0
- **Java**: 21 (推荐使用 OpenJDK 21)
- **pnpm**: >= 8.0.0
- **Docker**: >= 20.10 (可选，用于容器化部署)

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/murphy/murphy.git
cd murphy

# 安装 pnpm (如果还没安装)
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 开发环境启动

#### 方式一：使用 Docker Compose (推荐)

```bash
# 启动完整开发环境 (包括数据库、缓存、消息队列等)
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

#### 方式二：本地开发

1. **启动 MVC 后端服务** (传统阻塞式)
```bash
cd services/backend-mvc
./gradlew bootRunDev
# 访问: http://localhost:8080/api/v1/mvc
```

2. **启动 WebFlux 后端服务** (响应式)
```bash
cd services/backend-webflux
./gradlew bootRunDev
# 访问: http://localhost:8081/api/v1/webflux
```

3. **启动认证服务**
```bash
cd packages/auth-service
./gradlew bootRunDev
# 访问: http://localhost:8082/api/auth
```

4. **同时启动所有后端服务**
```bash
pnpm backend:all
```

5. **启动前端服务**
```bash
cd apps/frontend
pnpm dev
# 访问: http://localhost:3000
```

6. **启动文档站点**
```bash
cd docs
pnpm dev
# 访问: http://localhost:3000 (文档)
```

### 访问应用

- **前端应用**: http://localhost:3000
- **MVC 后端 API**: http://localhost:8080/api/v1/mvc
- **WebFlux 后端 API**: http://localhost:8081/api/v1/webflux
- **认证服务 API**: http://localhost:8082/api/auth
- **MVC API 文档**: http://localhost:8080/api/swagger-ui.html
- **WebFlux API 文档**: http://localhost:8081/api/swagger-ui.html
- **认证服务 API 文档**: http://localhost:8082/api/swagger-ui.html
- **H2 数据库控制台**: http://localhost:8080/api/h2-console (开发环境)
- **文档站点**: http://localhost:3001 (docs)
- **Grafana 监控**: http://localhost:3002 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Kibana**: http://localhost:5601

## 🔄 项目重构说明

### 📈 **重构优势**

相比原有的平铺式结构，新的模块化架构具有以下优势：

1. **🏗️ 清晰的层次结构** - apps、packages、services分层明确
2. **🎯 明确的职责边界** - 每个模块都有清晰的功能定义
3. **♻️ 更好的复用性** - packages可以被多个服务复用
4. **🔧 模块化架构** - 服务间松耦合，易于独立部署
5. **💻 更好的开发体验** - 支持独立开发和测试
6. **📦 统一的包管理** - 使用PNPM workspace统一管理依赖

### 🔄 **迁移指南**

从旧结构迁移到新结构的步骤：

1. **更新导入路径**: 前端代码中使用 `@murphy/common` 包的类型
2. **重新配置IDE**: 更新IDE的项目结构配置
3. **更新CI/CD**: 修改构建脚本以适应新的目录结构
4. **数据库迁移**: 使用 `packages/database` 中的迁移脚本

### 🎯 **下一步规划**

- [ ] 添加API网关 (Nginx/Spring Cloud Gateway)
- [ ] 完善服务间通信机制
- [ ] 添加分布式链路追踪
- [ ] 优化CI/CD流水线

### 🔍 API 端点对比

| 功能 | MVC 端点 | WebFlux 端点 | 认证服务端点 |
|------|----------|-------------|-------------|
| 基础信息 | GET /api/v1/mvc/hello | GET /api/v1/webflux/hello | GET /api/auth/info |
| 用户登录 | POST /api/v1/mvc/auth/login | POST /api/v1/webflux/auth/login | POST /api/auth/login |
| 用户注册 | POST /api/v1/mvc/auth/register | POST /api/v1/webflux/auth/register | POST /api/auth/register |
| 用户列表 | GET /api/v1/mvc/users | GET /api/v1/webflux/users | GET /api/auth/users |
| 创建用户 | POST /api/v1/mvc/users | POST /api/v1/webflux/users | POST /api/auth/users |
| 异步数据 | GET /api/v1/mvc/async-data | GET /api/v1/webflux/async-data | - |
| 服务器信息 | GET /api/v1/mvc/info | GET /api/v1/webflux/info | GET /api/auth/health |
| 事件流 | - | GET /api/v1/webflux/events | - |
| 批量数据 | - | GET /api/v1/webflux/batch-data | - |
| 令牌刷新 | - | - | POST /api/auth/refresh |

## 🧪 测试

### 前端测试

```bash
cd apps/frontend

# 单元测试
pnpm test

# 测试覆盖率
pnpm test:coverage

# E2E 测试
pnpm test:e2e

# E2E 测试 UI 模式
pnpm test:e2e:ui
```

### 后端测试

```bash
# MVC 服务测试
cd services/backend-mvc
./gradlew test

# WebFlux 服务测试
cd services/backend-webflux
./gradlew test

# 认证服务测试
cd packages/auth-service
./gradlew test

# 数据库包测试
cd packages/database
./gradlew test

# 运行测试并生成覆盖率报告
./gradlew test jacocoTestReport

# 运行 Checkstyle 检查
./gradlew checkstyleMain checkstyleTest
```

### 通用工具包测试

```bash
cd packages/common

# TypeScript 单元测试
pnpm test

# 类型检查
pnpm type-check
```

## 🚢 部署

### Docker 部署

```bash
# 构建镜像
docker-compose build

# 生产环境部署
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Kubernetes 部署

```bash
# 应用 Kubernetes 配置
kubectl apply -f k8s/
```

## 📊 监控与日志

### Prometheus 指标
- 应用性能指标
- JVM 指标
- 数据库连接池指标
- 自定义业务指标

### Grafana 仪表板
- 应用概览
- 系统资源监控
- 数据库性能
- 用户行为分析

### ELK 日志分析
- 结构化日志收集
- 错误监控和告警
- 性能分析
- 安全审计

## 🔧 开发指南

### 代码规范

- **前端**: 遵循 ESLint + Prettier 规范
- **后端**: 遵循 Google Java Style Guide (通过 Checkstyle 检查)

### Git 工作流

```bash
# 功能开发
git checkout -b feature/your-feature-name
git commit -m "feat: add new feature"
git push origin feature/your-feature-name

# 创建 Pull Request
```

### API 设计规范

- 遵循 RESTful API 设计原则
- 使用 OpenAPI 3.0 规范
- 统一的错误响应格式
- API 版本控制策略

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙋‍♂️ 支持

如果您遇到任何问题或有建议，请：

1. 查看 [FAQ](docs/faq.md)
2. 搜索 [Issues](https://github.com/murphy/murphy/issues)
3. 创建新的 Issue
4. 联系维护团队

## 🎯 路线图

- [x] 基础框架搭建
- [x] 前后端集成
- [x] Docker 容器化
- [x] CI/CD 流水线
- [x] **项目架构重构** (模块化设计)
- [x] **认证服务拆分** (独立服务)
- [x] **通用包抽离** (复用性优化)
- [ ] API网关集成 (Nginx/Spring Cloud Gateway)
- [ ] Kubernetes 部署配置
- [ ] 容器编排优化
- [ ] 分布式链路追踪
- [ ] 性能优化
- [ ] 安全加固
- [ ] 多租户支持
- [ ] 事件驱动架构

---

**Murphy Team** - 构建现代化的企业级应用