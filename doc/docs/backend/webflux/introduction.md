# Spring Boot WebFlux 响应式后端架构

## 概览

本项目采用 Spring Boot WebFlux 响应式架构，基于 Netty 的非阻塞异步编程模型，适合高并发、低延迟的应用场景。通过响应式流处理提供高性能的 RESTful API 服务。

## 技术栈

### 核心框架
- **Spring Boot 3.3.5**: Spring 生态系统的快速开发框架
- **Spring WebFlux**: 响应式 Web 应用程序框架
- **Spring Data R2DBC**: 响应式数据访问
- **Spring Security**: 响应式安全认证和授权
- **Java 21**: 长期支持版本的 JDK

### 响应式技术
- **Reactor Core**: 响应式编程库
- **Netty**: 高性能异步网络库
- **R2DBC**: 响应式数据库连接

### 数据存储
- **PostgreSQL**: 关系型数据库 (R2DBC 连接)
- **Redis**: 响应式缓存和会话存储
- **MongoDB**: 响应式文档数据库

### 消息队列
- **Apache Kafka**: 响应式流处理

### 容器化
- **Docker**: 容器化部署
- **Docker Compose**: 多容器编排

### 构建工具
- **Gradle 8.10**: 项目构建和依赖管理

### 监控和运维
- **Spring Boot Actuator**: 响应式应用监控
- **Micrometer**: 响应式指标收集
- **Logback**: 异步日志记录

## 项目结构

```
backend-webflux/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── yzt/
│   │   │           └── backendwebflux/
│   │   │               ├── YztBackendWebfluxApplication.java # 应用启动类
│   │   │               ├── config/                          # 配置类
│   │   │               │   ├── R2dbcConfig.java
│   │   │               │   ├── RedisConfig.java
│   │   │               │   ├── KafkaConfig.java
│   │   │               │   └── SecurityConfig.java
│   │   │               ├── controller/                      # 控制器层
│   │   │               │   ├── UserController.java
│   │   │               │   └── AuthController.java
│   │   │               ├── service/                         # 服务层
│   │   │               │   ├── UserService.java
│   │   │               │   └── AuthService.java
│   │   │               ├── repository/                      # 数据访问层
│   │   │               │   ├── UserRepository.java
│   │   │               │   └── RoleRepository.java
│   │   │               ├── entity/                          # 实体类
│   │   │               │   ├── User.java
│   │   │               │   └── Role.java
│   │   │               ├── dto/                             # 数据传输对象
│   │   │               │   ├── UserDto.java
│   │   │               │   └── AuthDto.java
│   │   │               ├── exception/                       # 异常处理
│   │   │               │   ├── GlobalExceptionHandler.java
│   │   │               │   └── BusinessException.java
│   │   │               ├── handler/                         # 路由处理器
│   │   │               │   ├── UserHandler.java
│   │   │               │   └── AuthHandler.java
│   │   │               ├── router/                          # 路由配置
│   │   │               │   ├── UserRouter.java
│   │   │               │   └── AuthRouter.java
│   │   │               └── util/                            # 工具类
│   │   │                   ├── JwtUtil.java
│   │   │                   └── ReactiveUtil.java
│   │   └── resources/
│   │       ├── application.yml                              # 主配置文件
│   │       ├── application-dev.yml                          # 开发环境配置
│   │       ├── application-prod.yml                         # 生产环境配置
│   │       └── db/migration/                                # 数据库迁移脚本
│   └── test/                                                # 测试代码
│       ├── java/
│       └── resources/
├── build.gradle                                             # Gradle 构建配置
├── gradle.properties                                        # Gradle 属性配置
├── Dockerfile                                               # Docker 镜像构建
└── README.md                                                # 项目说明
```

## 核心特性

### 1. 响应式架构
- **非阻塞 I/O**: 基于 Netty 的事件驱动模型
- **背压处理**: 自动处理生产者和消费者速度不匹配
- **流式处理**: 支持实时数据流处理
- **函数式编程**: 声明式的响应式编程模型

### 2. 高并发支持
- **异步处理**: 所有操作都是非阻塞的
- **资源效率**: 更少的线程处理更多的请求
- **内存优化**: 流式处理减少内存占用
- **弹性扩展**: 适应不同负载场景

### 3. 响应式数据访问
- **R2DBC**: 响应式数据库连接
- **响应式Repository**: 非阻塞数据操作
- **事务管理**: 响应式事务支持
- **连接池**: 异步连接池管理

### 4. 函数式路由
- **RouterFunction**: 函数式路由定义
- **HandlerFunction**: 处理器函数
- **过滤器链**: 响应式过滤器
- **内容协商**: 自动内容类型处理

## 开发指南

### 环境要求
- JDK 21+
- PostgreSQL 13+
- Redis 6+
- Docker & Docker Compose

### 项目启动

#### 1. 使用 Docker Compose (推荐)
```bash
# 在项目根目录
docker-compose up -d postgres redis kafka

# 启动应用
cd backend-webflux
./gradlew bootRun
```

#### 2. 本地开发环境
```bash
# 安装依赖并编译
./gradlew build

# 运行应用
./gradlew bootRun

# 应用将在 http://localhost:8081 启动
```

#### 3. 开发模式 (热重载)
```bash
./gradlew bootRun --continuous
```

### 数据库配置

#### R2DBC PostgreSQL 配置
```yaml
spring:
  r2dbc:
    url: r2dbc:postgresql://localhost:5432/yzt_webflux
    username: yzt_user
    password: yzt_password
    pool:
      max-size: 20
      initial-size: 5
      max-idle-time: PT30M
      validation-query: SELECT 1
      
  liquibase:
    change-log: classpath:db/changelog/db.changelog-master.yaml
    url: jdbc:postgresql://localhost:5432/yzt_webflux
    user: yzt_user
    password: yzt_password
```

#### 响应式 Redis 配置
```yaml
spring:
  data:
    redis:
      host: localhost
      port: 6379
      password: redis_password
      database: 1
      timeout: 2000ms
      lettuce:
        pool:
          max-active: 8
          max-idle: 8
          min-idle: 0
```

### 响应式 API 开发

#### 1. 控制器开发 (注解式)
```java
@RestController
@RequestMapping("/api/v1/users")
@Validated
@Slf4j
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping
    public Mono<ResponseEntity<ApiResponse<Flux<UserDto>>>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Flux<UserDto> users = userService.getUsers(page, size);
        return Mono.just(ResponseEntity.ok(ApiResponse.success(users)));
    }
    
    @PostMapping
    public Mono<ResponseEntity<ApiResponse<UserDto>>> createUser(
            @Valid @RequestBody Mono<CreateUserRequest> requestMono) {
        
        return requestMono
                .flatMap(userService::createUser)
                .map(user -> ResponseEntity.status(HttpStatus.CREATED)
                        .body(ApiResponse.success(user)))
                .onErrorResume(throwable -> {
                    log.error("创建用户失败", throwable);
                    return Mono.just(ResponseEntity.badRequest()
                            .body(ApiResponse.error(throwable.getMessage())));
                });
    }
    
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<UserDto> getUserStream() {
        return userService.getUserStream()
                .delayElements(Duration.ofSeconds(1))
                .doOnNext(user -> log.info("发送用户数据: {}", user.getId()));
    }
}
```

#### 2. 函数式路由开发
```java
@Configuration
public class UserRouter {
    
    @Bean
    public RouterFunction<ServerResponse> userRoutes(UserHandler userHandler) {
        return RouterFunctions
                .route(GET("/api/v1/users").and(accept(MediaType.APPLICATION_JSON)), userHandler::getUsers)
                .andRoute(POST("/api/v1/users").and(contentType(MediaType.APPLICATION_JSON)), userHandler::createUser)
                .andRoute(GET("/api/v1/users/{id}"), userHandler::getUserById)
                .andRoute(PUT("/api/v1/users/{id}"), userHandler::updateUser)
                .andRoute(DELETE("/api/v1/users/{id}"), userHandler::deleteUser)
                .andRoute(GET("/api/v1/users/stream"), userHandler::getUserStream);
    }
}

@Component
@Slf4j
public class UserHandler {
    
    private final UserService userService;
    
    public UserHandler(UserService userService) {
        this.userService = userService;
    }
    
    public Mono<ServerResponse> getUsers(ServerRequest request) {
        int page = request.queryParam("page")
                .map(Integer::parseInt)
                .orElse(0);
        int size = request.queryParam("size")
                .map(Integer::parseInt)
                .orElse(10);
                
        Flux<UserDto> users = userService.getUsers(page, size);
        
        return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(users, UserDto.class);
    }
    
    public Mono<ServerResponse> createUser(ServerRequest request) {
        return request.bodyToMono(CreateUserRequest.class)
                .flatMap(userService::createUser)
                .flatMap(user -> ServerResponse.status(HttpStatus.CREATED)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(ApiResponse.success(user)))
                .onErrorResume(throwable -> {
                    log.error("创建用户失败", throwable);
                    return ServerResponse.badRequest()
                            .bodyValue(ApiResponse.error(throwable.getMessage()));
                });
    }
    
    public Mono<ServerResponse> getUserStream(ServerRequest request) {
        Flux<UserDto> userStream = userService.getUserStream()
                .delayElements(Duration.ofSeconds(1));
                
        return ServerResponse.ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(userStream, UserDto.class);
    }
}
```

#### 3. 响应式服务层开发
```java
@Service
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ReactiveRedisTemplate<String, Object> redisTemplate;
    
    public UserService(UserRepository userRepository,
                      PasswordEncoder passwordEncoder,
                      ReactiveRedisTemplate<String, Object> redisTemplate) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.redisTemplate = redisTemplate;
    }
    
    public Flux<UserDto> getUsers(int page, int size) {
        return userRepository.findAllByOrderByCreatedAtDesc()
                .skip((long) page * size)
                .take(size)
                .map(this::convertToDto)
                .doOnNext(user -> log.debug("加载用户: {}", user.getId()));
    }
    
    public Mono<UserDto> createUser(CreateUserRequest request) {
        return userRepository.existsByEmail(request.getEmail())
                .flatMap(exists -> {
                    if (exists) {
                        return Mono.error(new BusinessException("邮箱已存在"));
                    }
                    
                    User user = User.builder()
                            .email(request.getEmail())
                            .password(passwordEncoder.encode(request.getPassword()))
                            .name(request.getName())
                            .createdAt(LocalDateTime.now())
                            .build();
                            
                    return userRepository.save(user);
                })
                .map(this::convertToDto)
                .doOnSuccess(user -> log.info("创建用户成功: {}", user.getId()))
                .doOnError(error -> log.error("创建用户失败", error));
    }
    
    public Mono<UserDto> findUserById(Long id) {
        String cacheKey = "user:" + id;
        
        return redisTemplate.opsForValue()
                .get(cacheKey)
                .cast(UserDto.class)
                .switchIfEmpty(
                    userRepository.findById(id)
                            .map(this::convertToDto)
                            .flatMap(user -> redisTemplate.opsForValue()
                                    .set(cacheKey, user, Duration.ofMinutes(30))
                                    .thenReturn(user))
                )
                .doOnNext(user -> log.debug("获取用户: {}", user.getId()));
    }
    
    public Flux<UserDto> getUserStream() {
        return Flux.interval(Duration.ofSeconds(1))
                .flatMap(tick -> userRepository.findAllByOrderByCreatedAtDesc()
                        .take(10))
                .map(this::convertToDto)
                .distinct(UserDto::getId)
                .doOnNext(user -> log.debug("流式发送用户: {}", user.getId()));
    }
    
    @Transactional
    public Mono<Void> deleteUser(Long id) {
        return userRepository.findById(id)
                .switchIfEmpty(Mono.error(new BusinessException("用户不存在")))
                .flatMap(user -> userRepository.delete(user))
                .then(redisTemplate.delete("user:" + id))
                .then()
                .doOnSuccess(unused -> log.info("删除用户成功: {}", id));
    }
}
```

#### 4. 响应式 Repository 开发
```java
@Repository
public interface UserRepository extends ReactiveCrudRepository<User, Long> {
    
    Mono<User> findByEmail(String email);
    
    Mono<Boolean> existsByEmail(String email);
    
    Flux<User> findAllByOrderByCreatedAtDesc();
    
    @Query("SELECT * FROM users WHERE name ILIKE :name ORDER BY created_at DESC LIMIT :limit OFFSET :offset")
    Flux<User> findByNameContaining(String name, int limit, int offset);
    
    @Modifying
    @Query("UPDATE users SET last_login_at = :loginTime WHERE id = :userId")
    Mono<Integer> updateLastLoginTime(Long userId, LocalDateTime loginTime);
    
    @Query("SELECT COUNT(*) FROM users WHERE status = :status")
    Mono<Long> countByStatus(UserStatus status);
}
```

### 响应式编程模式

#### 1. 基本操作符
```java
// 创建 Mono
Mono<String> mono = Mono.just("Hello")
        .map(String::toUpperCase)
        .filter(s -> s.length() > 3)
        .defaultIfEmpty("Default");

// 创建 Flux
Flux<Integer> flux = Flux.range(1, 10)
        .filter(i -> i % 2 == 0)
        .map(i -> i * 2)
        .take(5);

// 错误处理
Mono<String> result = service.getData()
        .onErrorReturn("fallback")
        .onErrorResume(throwable -> {
            log.error("操作失败", throwable);
            return Mono.just("error");
        });
```

#### 2. 组合操作
```java
// 并行处理
Mono<UserProfile> profile = Mono.zip(
        userService.findById(userId),
        profileService.findByUserId(userId),
        orderService.countByUserId(userId)
).map(tuple -> UserProfile.builder()
        .user(tuple.getT1())
        .profile(tuple.getT2())
        .orderCount(tuple.getT3())
        .build());

// 序列处理
Flux<ProcessedData> processed = dataService.getAllData()
        .flatMap(data -> processService.process(data))
        .filter(ProcessedData::isValid)
        .collectList()
        .flatMapMany(list -> Flux.fromIterable(list));
```

#### 3. 背压处理
```java
// 缓冲策略
Flux<Data> buffered = dataSource.getData()
        .onBackpressureBuffer(1000)
        .buffer(Duration.ofSeconds(1))
        .flatMap(batch -> processBatch(batch));

// 丢弃策略
Flux<Data> dropped = dataSource.getData()
        .onBackpressureDrop(dropped -> log.warn("数据被丢弃: {}", dropped))
        .sample(Duration.ofMillis(100));
```

### 配置管理

#### 应用配置 (application.yml)
```yaml
server:
  port: 8081
  netty:
    connection-timeout: 2s
    h2c-max-content-length: 0B
    initial-buffer-size: 128B

spring:
  application:
    name: yzt-backend-webflux
    
  profiles:
    active: dev
    
  r2dbc:
    url: r2dbc:postgresql://localhost:5432/yzt_webflux
    username: ${DB_USERNAME:yzt_user}
    password: ${DB_PASSWORD:yzt_password}
    pool:
      max-size: 20
      initial-size: 5
      max-idle-time: PT30M
      
  data:
    redis:
      host: ${REDIS_HOST:localhost}
      port: ${REDIS_PORT:6379}
      
  kafka:
    bootstrap-servers: ${KAFKA_SERVERS:localhost:9092}
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.JsonSerializer
    consumer:
      group-id: yzt-webflux-group
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.JsonDeserializer

  webflux:
    multipart:
      max-in-memory-size: 1MB
      max-disk-usage-per-part: 10MB

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized
  metrics:
    tags:
      application: yzt-backend-webflux

logging:
  level:
    com.yzt: DEBUG
    reactor.netty: INFO
    org.springframework.r2dbc: DEBUG
```

## 测试

### 响应式单元测试
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void shouldCreateUserSuccessfully() {
        // Given
        CreateUserRequest request = CreateUserRequest.builder()
                .email("test@example.com")
                .password("password123")
                .name("Test User")
                .build();
                
        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(Mono.just(false));
        when(passwordEncoder.encode(request.getPassword()))
                .thenReturn("encoded_password");
        when(userRepository.save(any(User.class)))
                .thenReturn(Mono.just(createMockUser()));
        
        // When & Then
        StepVerifier.create(userService.createUser(request))
                .assertNext(result -> {
                    assertThat(result.getEmail()).isEqualTo(request.getEmail());
                    assertThat(result.getName()).isEqualTo(request.getName());
                })
                .verifyComplete();
                
        verify(userRepository).save(any(User.class));
    }
    
    @Test
    void shouldFailWhenEmailExists() {
        // Given
        CreateUserRequest request = CreateUserRequest.builder()
                .email("existing@example.com")
                .build();
                
        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(Mono.just(true));
        
        // When & Then
        StepVerifier.create(userService.createUser(request))
                .expectErrorMatches(throwable -> 
                    throwable instanceof BusinessException &&
                    throwable.getMessage().equals("邮箱已存在"))
                .verify();
    }
}
```

### 响应式集成测试
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Testcontainers
class UserControllerIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("test")
            .withUsername("test")
            .withPassword("test");
            
    @Autowired
    private WebTestClient webTestClient;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldCreateUserSuccessfully() {
        // Given
        CreateUserRequest request = CreateUserRequest.builder()
                .email("test@example.com")
                .password("password123")
                .name("Test User")
                .build();
        
        // When & Then
        webTestClient.post()
                .uri("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .exchange()
                .expectStatus().isCreated()
                .expectBody()
                .jsonPath("$.data.email").isEqualTo("test@example.com")
                .jsonPath("$.data.name").isEqualTo("Test User");
                
        // Verify database
        StepVerifier.create(userRepository.findByEmail("test@example.com"))
                .assertNext(user -> {
                    assertThat(user.getEmail()).isEqualTo("test@example.com");
                    assertThat(user.getName()).isEqualTo("Test User");
                })
                .verifyComplete();
    }
    
    @Test
    void shouldStreamUsers() {
        // When & Then
        webTestClient.get()
                .uri("/api/v1/users/stream")
                .accept(MediaType.TEXT_EVENT_STREAM)
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentTypeCompatibleWith(MediaType.TEXT_EVENT_STREAM)
                .returnResult(UserDto.class)
                .getResponseBody()
                .take(3)
                .as(StepVerifier::create)
                .expectNextCount(3)
                .verifyComplete();
    }
}
```

## 性能调优

### 1. Netty 调优
```yaml
server:
  netty:
    connection-timeout: 2s
    h2c-max-content-length: 0B
    initial-buffer-size: 128B
    worker-count: 8
    max-keep-alive-requests: 1000
```

### 2. R2DBC 连接池调优
```yaml
spring:
  r2dbc:
    pool:
      max-size: 50
      initial-size: 10
      max-idle-time: PT30M
      max-create-connection-time: PT10S
      max-acquire-time: PT10S
      validation-query: SELECT 1
```

### 3. 响应式缓存策略
```java
@Component
public class CacheService {
    
    private final ReactiveRedisTemplate<String, Object> redisTemplate;
    private final Cache<String, Object> caffeine;
    
    public <T> Mono<T> getOrCache(String key, Supplier<Mono<T>> supplier, Class<T> type) {
        return Mono.fromCallable(() -> caffeine.getIfPresent(key))
                .cast(type)
                .switchIfEmpty(
                    redisTemplate.opsForValue().get(key)
                            .cast(type)
                            .switchIfEmpty(
                                supplier.get()
                                        .flatMap(value -> redisTemplate.opsForValue()
                                                .set(key, value, Duration.ofMinutes(30))
                                                .thenReturn(value))
                                        .doOnNext(value -> caffeine.put(key, value))
                            )
                );
    }
}
```

## 部署

### Docker 部署
```dockerfile
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# 复制 JAR 文件
COPY build/libs/yzt-backend-webflux-1.0.0.jar app.jar

# 创建非特权用户
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

USER appuser

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8081/actuator/health || exit 1

EXPOSE 8081

# 优化 JVM 参数
ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxGCPauseMillis=100", "-Xms512m", "-Xmx1024m", "-jar", "/app/app.jar"]
```

## 监控和运维

### 响应式监控指标
```java
@Component
public class ReactiveMetrics {
    
    private final MeterRegistry meterRegistry;
    
    public ReactiveMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }
    
    public <T> Mono<T> timedMono(String metricName, Mono<T> mono) {
        return mono.doOnSubscribe(subscription -> 
                Timer.Sample.start(meterRegistry).stop(metricName))
                .doOnNext(result -> 
                    meterRegistry.counter(metricName + ".success").increment())
                .doOnError(error -> 
                    meterRegistry.counter(metricName + ".error").increment());
    }
    
    public <T> Flux<T> timedFlux(String metricName, Flux<T> flux) {
        return flux.doOnSubscribe(subscription -> 
                Timer.Sample.start(meterRegistry).stop(metricName))
                .doOnNext(result -> 
                    meterRegistry.counter(metricName + ".items").increment())
                .doOnError(error -> 
                    meterRegistry.counter(metricName + ".error").increment());
    }
}
```

## 最佳实践

### 1. 响应式编程原则
- 避免阻塞操作
- 合理使用操作符
- 正确处理背压
- 及时释放资源

### 2. 错误处理策略
- 使用 onErrorResume 提供备选方案
- 使用 retry 处理临时故障
- 记录详细的错误日志
- 提供有意义的错误信息

### 3. 性能优化
- 合理配置线程池
- 使用适当的缓冲策略
- 避免不必要的数据转换
- 监控背压情况

### 4. 安全考虑
- 验证输入数据
- 实现适当的限流
- 保护敏感数据
- 监控异常访问

## 常见问题

### 1. 内存泄漏排查
```bash
# 监控 Reactor 订阅
-Dreactor.trace.operatorStacktrace=true

# 堆转储分析
jcmd <pid> GC.run_finalization
```

### 2. 背压问题
```java
// 检测背压
Flux.create(sink -> {
    // 生产数据
}, FluxSink.OverflowStrategy.BUFFER)
.onBackpressureBuffer(1000, 
    dropped -> log.warn("Buffer overflow: {}", dropped),
    BufferOverflowStrategy.DROP_LATEST);
```

### 3. 连接池监控
```java
@EventListener
public void handlePoolEvent(ConnectionPoolEvent event) {
    log.info("连接池事件: {}, 当前连接数: {}", 
        event.getEventType(), event.getConnectionPool().getMetrics());
}
```

## 相关文档

- [Spring WebFlux 官方文档](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html)
- [Project Reactor 参考指南](https://projectreactor.io/docs/core/release/reference/)
- [R2DBC 规范](https://r2dbc.io/spec)
- [Netty 用户指南](https://netty.io/wiki/user-guide.html)
- [响应式编程最佳实践](https://projectreactor.io/docs/core/release/reference/#best-practices)