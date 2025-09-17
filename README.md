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
- **样式**: Tailwind CSS + CSS Modules
- **实时通信**: Server-Sent Events (SSE)
- **API 请求**: Axios + React Query / SWR
- **测试**: Jest + React Testing Library + Playwright
- **代码质量**: ESLint + Prettier

### 后端技术
- **框架**: Spring Boot 3.3.x + Spring Security + Spring Data
- **语言**: Java 21
- **微服务**: Spring Cloud 2023.x
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

## 📁 项目结构

```
murphy/
├── frontend/                 # Next.js 前端应用
│   ├── src/
│   │   ├── app/             # App Router 页面
│   │   ├── components/      # 可复用组件
│   │   ├── store/          # Zustand 状态管理
│   │   ├── lib/            # 工具库
│   │   └── types/          # TypeScript 类型定义
│   ├── e2e/                # Playwright E2E 测试
│   ├── public/             # 静态资源
│   └── package.json
├── backend-mvc/             # Spring MVC 传统后端
│   ├── src/main/java/com/yzt/mvc/
│   │   ├── config/         # 配置类
│   │   ├── controller/     # REST 控制器
│   │   ├── service/        # 业务逻辑层
│   │   ├── repository/     # JPA 数据访问层
│   │   ├── entity/         # JPA 实体类
│   │   └── dto/            # 数据传输对象
│   └── build.gradle
├── backend-webflux/         # Spring WebFlux 响应式后端
│   ├── src/main/java/com/yzt/webflux/
│   │   ├── config/         # 配置类
│   │   ├── controller/     # 响应式控制器
│   │   ├── service/        # 响应式业务逻辑层
│   │   ├── repository/     # R2DBC 数据访问层
│   │   ├── entity/         # R2DBC 实体类
│   │   └── dto/            # 数据传输对象
│   └── build.gradle
├── doc/                    # Docusaurus 文档站点
├── salesplan/              # 销售计划模块 (示例)
├── .github/                # GitHub Actions 工作流
├── monitoring/             # 监控配置 (Prometheus, Grafana)
├── docker-compose.yml      # 完整开发环境
├── package.json           # Workspace 根配置
└── pnpm-workspace.yaml    # pnpm 工作空间配置
```

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
cd backend-mvc
./gradlew bootRunDev
# 访问: http://localhost:8080/api/v1/mvc
```

2. **启动 WebFlux 后端服务** (响应式)
```bash
cd backend-webflux
./gradlew bootRunDev
# 访问: http://localhost:8081/api/v1/webflux
```

3. **同时启动两个后端**
```bash
pnpm backend:both
```

4. **启动前端服务**
```bash
cd frontend
pnpm dev
```

### 访问应用

- **前端应用**: http://localhost:3000
- **MVC 后端 API**: http://localhost:8080/api/v1/mvc
- **WebFlux 后端 API**: http://localhost:8081/api/v1/webflux
- **MVC API 文档**: http://localhost:8080/api/swagger-ui.html
- **WebFlux API 文档**: http://localhost:8081/api/swagger-ui.html
- **H2 数据库控制台**: http://localhost:8080/api/h2-console (开发环境)
- **Grafana 监控**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Kibana**: http://localhost:5601

### 🔍 API 端点对比

| 功能 | MVC 端点 | WebFlux 端点 |
|------|----------|-------------|
| 基础信息 | GET /api/v1/mvc/hello | GET /api/v1/webflux/hello |
| 用户列表 | GET /api/v1/mvc/users | GET /api/v1/webflux/users |
| 创建用户 | POST /api/v1/mvc/users | POST /api/v1/webflux/users |
| 异步数据 | GET /api/v1/mvc/async-data | GET /api/v1/webflux/async-data |
| 服务器信息 | GET /api/v1/mvc/info | GET /api/v1/webflux/info |
| 事件流 | - | GET /api/v1/webflux/events |
| 批量数据 | - | GET /api/v1/webflux/batch-data |

## 🧪 测试

### 前端测试

```bash
cd frontend

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
cd backend

# 运行所有测试
./gradlew test

# 运行测试并生成覆盖率报告
./gradlew test jacocoTestReport

# 运行 Checkstyle 检查
./gradlew checkstyleMain checkstyleTest
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
- [ ] Kubernetes 部署配置
- [ ] 微服务拆分
- [ ] 性能优化
- [ ] 安全加固
- [ ] 多租户支持

---

**Murphy Team** - 构建现代化的企业级应用