# Spring MVC vs WebFlux 架构对比

本项目提供了两种不同的后端实现，展示了传统 Spring MVC 和现代 Spring WebFlux 之间的区别和各自的优势。

## 🏗️ 架构对比

### Spring MVC (backend-mvc)
- **端口**: 8080
- **服务器**: Tomcat (Servlet 容器)
- **编程模型**: 阻塞式 (Blocking I/O)
- **线程模型**: 一请求一线程
- **数据库**: JPA + PostgreSQL
- **适用场景**: 传统企业应用、CRUD 操作密集型应用

### Spring WebFlux (backend-webflux)
- **端口**: 8081
- **服务器**: Netty (事件驱动)
- **编程模型**: 响应式 (Non-blocking I/O)
- **线程模型**: 事件循环
- **数据库**: R2DBC + PostgreSQL
- **适用场景**: 高并发、流式数据处理、微服务

## 📊 性能特点对比

| 特性 | Spring MVC | Spring WebFlux |
|------|------------|----------------|
| **吞吐量** | 高 (CPU 密集型) | 极高 (I/O 密集型) |
| **延迟** | 较高 | 较低 |
| **内存使用** | 较高 (线程栈) | 较低 (事件循环) |
| **CPU 使用** | 较高 | 较低 |
| **学习曲线** | 平缓 | 陡峭 |
| **调试难度** | 简单 | 复杂 |

## 🔄 编程模型对比

### MVC 控制器示例

```java
@RestController
@RequestMapping("/api/v1/mvc")
public class MvcController {
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        // 阻塞式数据库查询
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        // 阻塞式保存操作
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}
```

### WebFlux 控制器示例

```java
@RestController
@RequestMapping("/api/v1/webflux")
public class WebFluxController {
    
    @GetMapping("/users")
    public Flux<User> getUsers() {
        // 响应式数据流
        return userRepository.findAll()
            .delayElements(Duration.ofMillis(50));
    }
    
    @PostMapping("/users")
    public Mono<User> createUser(@RequestBody User user) {
        // 响应式保存操作
        return userRepository.save(user);
    }
    
    @GetMapping(value = "/events", produces = "text/event-stream")
    public Flux<ServerSentEvent<String>> streamEvents() {
        // 服务器发送事件
        return Flux.interval(Duration.ofSeconds(1))
            .map(i -> ServerSentEvent.builder("Event " + i).build());
    }
}
```

## 🛠️ 技术栈差异

### MVC 技术栈
```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'org.postgresql:postgresql'
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui'
}
```

### WebFlux 技术栈
```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-webflux'
    implementation 'org.springframework.boot:spring-boot-starter-data-r2dbc'
    implementation 'io.r2dbc:r2dbc-postgresql'
    implementation 'org.springdoc:springdoc-openapi-starter-webflux-ui'
}
```

## 📈 使用场景建议

### 选择 Spring MVC 的场景
- ✅ 传统企业应用
- ✅ CRUD 操作为主
- ✅ 团队对响应式编程不熟悉
- ✅ 需要使用 JPA 复杂查询
- ✅ 集成大量第三方阻塞库
- ✅ 对性能要求不极端

### 选择 Spring WebFlux 的场景
- ✅ 高并发场景 (>10k 并发)
- ✅ 流式数据处理
- ✅ 微服务架构
- ✅ 实时数据推送 (SSE/WebSocket)
- ✅ I/O 密集型应用
- ✅ 需要背压控制
- ✅ 云原生应用

## 🧪 测试对比

### 压力测试示例

```bash
# 测试 MVC 端点
wrk -t12 -c400 -d30s http://localhost:8080/api/v1/mvc/users

# 测试 WebFlux 端点
wrk -t12 -c400 -d30s http://localhost:8081/api/v1/webflux/users
```

### 预期结果
- **MVC**: 适中的 RPS，较高的内存使用
- **WebFlux**: 更高的 RPS，较低的内存使用

## 🔧 开发体验对比

### 调试
- **MVC**: 传统断点调试，堆栈跟踪清晰
- **WebFlux**: 响应式调试复杂，需要特殊工具

### 测试
- **MVC**: 标准 MockMvc 测试
- **WebFlux**: WebTestClient + StepVerifier

### 错误处理
- **MVC**: 传统异常处理机制
- **WebFlux**: 响应式错误处理 (onError*)

## 🚀 部署建议

### 容器资源配置

```yaml
# MVC 后端
backend-mvc:
  deploy:
    resources:
      limits:
        memory: 1GB
        cpus: "1.0"
      
# WebFlux 后端  
backend-webflux:
  deploy:
    resources:
      limits:
        memory: 512MB
        cpus: "0.5"
```

## 🎯 最佳实践

### MVC 最佳实践
1. 合理配置线程池大小
2. 使用连接池管理数据库连接
3. 避免在控制器中进行耗时操作
4. 使用 @Async 处理异步任务

### WebFlux 最佳实践
1. 避免阻塞操作
2. 正确处理背压
3. 使用 subscribeOn/publishOn 控制执行上下文
4. 善用操作符组合流

## 📚 学习资源

- [Spring MVC 官方文档](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html)
- [Spring WebFlux 官方文档](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html)
- [Project Reactor 文档](https://projectreactor.io/docs)
- [R2DBC 文档](https://r2dbc.io/)