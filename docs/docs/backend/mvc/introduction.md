# Spring Boot MVC 后端架构

## 概览

本项目采用传统的 Spring Boot MVC 架构，基于 Servlet 容器的同步编程模型，适合大多数企业级应用场景。提供稳定可靠的 RESTful API 服务。

## 技术栈

### 核心框架
- **Spring Boot 3.3.5**: Spring 生态系统的快速开发框架
- **Spring MVC**: Web 应用程序开发框架
- **Spring Data JPA**: 数据访问抽象层
- **Spring Security**: 安全认证和授权框架
- **Java 21**: 长期支持版本的 JDK

### 数据存储
- **PostgreSQL**: 关系型数据库
- **Redis**: 缓存和会话存储
- **MongoDB**: 文档数据库 (可选)

### 消息队列
- **Apache Kafka**: 分布式流处理平台

### 容器化
- **Docker**: 容器化部署
- **Docker Compose**: 多容器编排

### 构建工具
- **Gradle 8.10**: 项目构建和依赖管理

### 监控和运维
- **Spring Boot Actuator**: 应用监控和管理
- **Micrometer**: 指标收集
- **Logback**: 日志记录

## 项目结构

```
backend-mvc/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── yzt/
│   │   │           └── backendmvc/
│   │   │               ├── YztBackendMvcApplication.java    # 应用启动类
│   │   │               ├── config/                          # 配置类
│   │   │               │   ├── DatabaseConfig.java
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
│   │   │               └── util/                            # 工具类
│   │   │                   ├── JwtUtil.java
│   │   │                   └── DateUtil.java
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

### 1. 分层架构
- **Controller 层**: 处理 HTTP 请求和响应
- **Service 层**: 业务逻辑处理
- **Repository 层**: 数据访问和持久化
- **Entity 层**: 数据模型定义

### 2. 数据访问
- JPA/Hibernate ORM 映射
- 自动化的 CRUD 操作
- 自定义查询方法
- 事务管理

### 3. RESTful API
- 标准的 HTTP 方法语义
- JSON 数据格式
- 统一的响应结构
- API 版本控制

### 4. 安全认证
- JWT 令牌认证
- 基于角色的权限控制
- 密码加密存储
- 跨域资源共享 (CORS)

### 5. 缓存机制
- Redis 分布式缓存
- Spring Cache 抽象
- 缓存策略配置

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
cd backend-mvc
./gradlew bootRun
```

#### 2. 本地开发环境
```bash
# 安装依赖并编译
./gradlew build

# 运行应用
./gradlew bootRun

# 或者运行 JAR 文件
java -jar build/libs/yzt-backend-mvc-1.0.0.jar
```

#### 3. 开发模式 (热重载)
```bash
./gradlew bootRun --continuous
```

### 数据库配置

#### PostgreSQL 连接配置
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/yzt_mvc
    username: yzt_user
    password: yzt_password
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
```

#### Redis 配置
```yaml
spring:
  data:
    redis:
      host: localhost
      port: 6379
      password: redis_password
      database: 0
      timeout: 2000ms
      lettuce:
        pool:
          max-active: 8
          max-idle: 8
          min-idle: 0
```

### API 开发规范

#### 1. Controller 开发
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
    public ResponseEntity<ApiResponse<Page<UserDto>>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<UserDto> users = userService.getUsers(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.success(users));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<UserDto>> createUser(
            @Valid @RequestBody CreateUserRequest request) {
        
        UserDto user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(user));
    }
}
```

#### 2. Service 层开发
```java
@Service
@Transactional
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, 
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Transactional(readOnly = true)
    public Page<UserDto> getUsers(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(this::convertToDto);
    }
    
    public UserDto createUser(CreateUserRequest request) {
        // 业务逻辑验证
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("邮箱已存在");
        }
        
        // 创建用户实体
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();
                
        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }
}
```

#### 3. Repository 开发
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.name LIKE %:name%")
    Page<User> findByNameContaining(@Param("name") String name, Pageable pageable);
    
    @Modifying
    @Query("UPDATE User u SET u.lastLoginAt = :loginTime WHERE u.id = :userId")
    void updateLastLoginTime(@Param("userId") Long userId, 
                           @Param("loginTime") LocalDateTime loginTime);
}
```

#### 4. 实体类开发
```java
@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.ACTIVE;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}
```

### 配置管理

#### 应用配置 (application.yml)
```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: yzt-backend-mvc
  
  profiles:
    active: dev
    
  datasource:
    url: jdbc:postgresql://localhost:5432/yzt_mvc
    username: ${DB_USERNAME:yzt_user}
    password: ${DB_PASSWORD:yzt_password}
    
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    
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
      group-id: yzt-mvc-group
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.JsonDeserializer

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized

logging:
  level:
    com.yzt: DEBUG
    org.springframework.security: DEBUG
  pattern:
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

## 测试

### 单元测试
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
                
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded_password");
        when(userRepository.save(any(User.class))).thenReturn(createMockUser());
        
        // When
        UserDto result = userService.createUser(request);
        
        // Then
        assertThat(result.getEmail()).isEqualTo(request.getEmail());
        assertThat(result.getName()).isEqualTo(request.getName());
        verify(userRepository).save(any(User.class));
    }
}
```

### 集成测试
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
    private TestRestTemplate restTemplate;
    
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
        
        // When
        ResponseEntity<ApiResponse> response = restTemplate.postForEntity(
                "/api/v1/users", request, ApiResponse.class);
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(userRepository.findByEmail("test@example.com")).isPresent();
    }
}
```

## 部署

### Docker 部署
```dockerfile
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# 复制 JAR 文件
COPY build/libs/yzt-backend-mvc-1.0.0.jar app.jar

# 创建非特权用户
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

USER appuser

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/actuator/health || exit 1

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

### Kubernetes 部署
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: yzt-backend-mvc
spec:
  replicas: 3
  selector:
    matchLabels:
      app: yzt-backend-mvc
  template:
    metadata:
      labels:
        app: yzt-backend-mvc
    spec:
      containers:
      - name: yzt-backend-mvc
        image: yzt/backend-mvc:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: DB_HOST
          value: "postgres-service"
        livenessProbe:
          httpGet:
            path: /api/actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/actuator/health/readiness
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

## 监控和运维

### 应用监控
```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus,loggers
  endpoint:
    health:
      show-details: always
      show-components: always
  metrics:
    tags:
      application: yzt-backend-mvc
    export:
      prometheus:
        enabled: true
```

### 日志配置
```xml
<!-- logback-spring.xml -->
<configuration>
    <springProfile name="dev">
        <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
            <encoder>
                <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            </encoder>
        </appender>
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>
    
    <springProfile name="prod">
        <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
            <file>logs/application.log</file>
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                <fileNamePattern>logs/application.%d{yyyy-MM-dd}.%i.gz</fileNamePattern>
                <maxFileSize>100MB</maxFileSize>
                <maxHistory>30</maxHistory>
            </rollingPolicy>
            <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
                <providers>
                    <timestamp/>
                    <logLevel/>
                    <loggerName/>
                    <message/>
                    <mdc/>
                    <stackTrace/>
                </providers>
            </encoder>
        </appender>
        <root level="INFO">
            <appender-ref ref="FILE"/>
        </root>
    </springProfile>
</configuration>
```

## 最佳实践

### 1. 代码组织
- 遵循单一职责原则
- 合理使用设计模式
- 保持代码简洁和可读性

### 2. 数据库设计
- 合理的表结构设计
- 适当的索引策略
- 数据库连接池配置

### 3. 性能优化
- 查询优化和延迟加载
- 合理使用缓存
- 连接池和线程池调优

### 4. 安全实践
- 输入验证和参数化查询
- 敏感数据加密
- API 访问限流

## 常见问题

### 1. 数据库连接问题
```bash
# 检查数据库连接
./gradlew flywayInfo

# 数据库迁移
./gradlew flywayMigrate
```

### 2. 缓存问题
```bash
# 清理 Redis 缓存
docker exec -it redis redis-cli FLUSHDB
```

### 3. 内存泄漏排查
```bash
# 生成堆转储
jcmd <pid> GC.run_finalization
jcmd <pid> VM.classloader_stats
```

## 相关文档

- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [Spring Data JPA 参考](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)
- [Redis 官方文档](https://redis.io/documentation)
- [Gradle 用户指南](https://docs.gradle.org/current/userguide/userguide.html)