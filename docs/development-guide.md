# 开发指南

## 环境配置

### 前端环境配置

1. **Node.js 版本管理**
```bash
# 使用 nvm 管理 Node.js 版本
nvm use 20
nvm alias default 20
```

2. **VS Code 扩展推荐**
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- Auto Rename Tag

3. **开发环境变量**
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_ENV=development
```

### 后端环境配置

1. **Java 环境**
```bash
# 使用 SDKMAN 管理 Java 版本
sdk install java 21.0.1-tem
sdk use java 21.0.1-tem
```

2. **IDE 配置 (IntelliJ IDEA)**
- 安装 Lombok 插件
- 启用 Annotation Processing
- 配置 Checkstyle 插件
- 设置 Java 21 为项目 SDK

3. **数据库配置**
```yaml
# 开发环境使用 H2 内存数据库
spring:
  datasource:
    url: jdbc:h2:mem:devdb
    username: sa
    password: password
```

## 开发工作流

### 1. 创建新功能

```bash
# 创建功能分支
git checkout -b feature/user-management

# 前端开发
cd frontend
pnpm dev

# 后端开发
cd backend
./gradlew bootRunDev
```

### 2. 代码提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
git commit -m "feat(user): add user registration endpoint"
git commit -m "fix(auth): resolve JWT token validation issue"
git commit -m "docs(api): update swagger documentation"
git commit -m "style(frontend): fix component styling"
git commit -m "refactor(service): optimize user service logic"
git commit -m "test(auth): add authentication integration tests"
```

### 3. 代码审查检查清单

- [ ] 代码符合项目规范
- [ ] 单元测试覆盖率 >= 80%
- [ ] API 文档已更新
- [ ] 没有敏感信息泄露
- [ ] 性能影响已评估
- [ ] 安全问题已考虑

## API 开发规范

### RESTful API 设计

```java
@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {
    
    @GetMapping
    public ResponseEntity<Page<UserDto>> getUsers(
            @PageableDefault Pageable pageable) {
        // 获取用户列表
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        // 获取单个用户
    }
    
    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserRequest request) {
        // 创建用户
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        // 更新用户
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        // 删除用户
    }
}
```

### 统一响应格式

```java
@Data
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;
    
    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setData(data);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }
    
    public static <T> ApiResponse<T> error(String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(false);
        response.setMessage(message);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }
}
```

### 错误处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidation(ValidationException ex) {
        return ResponseEntity.badRequest()
            .body(ApiResponse.error(ex.getMessage()));
    }
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.notFound()
            .build();
    }
}
```

## 前端开发规范

### 组件开发

```typescript
// components/UserCard.tsx
import React from 'react';
import { Card, Avatar, Button } from 'antd';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card
      className="user-card"
      actions={[
        <Button key="edit" onClick={() => onEdit?.(user)}>
          编辑
        </Button>,
        <Button key="delete" danger onClick={() => onDelete?.(user.id)}>
          删除
        </Button>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={user.avatar} />}
        title={user.name}
        description={user.email}
      />
    </Card>
  );
};
```

### 状态管理

```typescript
// store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      loading: false,
      error: null,
      
      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('/api/v1/users');
          const users = await response.json();
          set({ users, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
      
      addUser: (user) => {
        set((state) => ({ users: [...state.users, user] }));
      },
      
      updateUser: (id, updatedUser) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
          ),
        }));
      },
      
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }));
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
```

## 测试策略

### 后端测试

```java
@SpringBootTest
@Testcontainers
class UserServiceIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
            .withDatabaseName("test")
            .withUsername("test")
            .withPassword("test");
    
    @Autowired
    private UserService userService;
    
    @Test
    void shouldCreateUser() {
        // Given
        CreateUserRequest request = new CreateUserRequest("John", "john@example.com");
        
        // When
        UserDto result = userService.createUser(request);
        
        // Then
        assertThat(result.getName()).isEqualTo("John");
        assertThat(result.getEmail()).isEqualTo("john@example.com");
    }
}
```

### 前端测试

```typescript
// __tests__/UserCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from '@/components/UserCard';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByText('编辑'));
    expect(onEdit).toHaveBeenCalledWith(mockUser);
  });
});
```

## 部署指南

### 开发环境部署

```bash
# 启动开发环境
docker-compose up -d

# 查看服务状态
docker-compose ps

# 重启特定服务
docker-compose restart frontend
```

### 生产环境部署

```bash
# 构建生产镜像
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# 部署到生产环境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 环境变量配置

```bash
# .env.production
DATABASE_URL=jdbc:postgresql://prod-db:5432/yzt_db
REDIS_URL=redis://prod-redis:6379
JWT_SECRET=your-production-secret
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 故障排查

### 常见问题

1. **前端构建失败**
```bash
# 清理缓存
pnpm store prune
rm -rf node_modules
pnpm install
```

2. **后端启动失败**
```bash
# 检查 Java 版本
java -version

# 清理构建缓存
./gradlew clean

# 重新构建
./gradlew build
```

3. **数据库连接问题**
```bash
# 检查数据库容器状态
docker-compose ps postgres

# 查看数据库日志
docker-compose logs postgres
```

### 性能监控

- 使用 Grafana 监控应用性能
- 通过 Prometheus 收集指标
- 使用 ELK Stack 分析日志
- 配置告警规则

### 安全检查

- 定期更新依赖包
- 运行安全扫描
- 检查敏感信息泄露
- 验证权限控制