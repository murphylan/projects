package com.murphy.mvc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * MVC 示例控制器 - 传统阻塞式 Web 控制器
 * 演示传统 Spring MVC 的用法
 * 
 * @author Murphy Team
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/mvc")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000"})
public class MvcExampleController {

    /**
     * 简单的同步端点
     */
    @GetMapping("/hello")
    public ResponseEntity<Map<String, Object>> hello() {
        log.info("MVC: Processing hello request");
        
        return ResponseEntity.ok(Map.of(
            "message", "Hello from Spring MVC!",
            "timestamp", LocalDateTime.now(),
            "server", "MVC Backend",
            "port", 8080
        ));
    }

    /**
     * 模拟数据列表端点
     */
    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getUsers() {
        log.info("MVC: Fetching users list");
        
        // 模拟数据库查询延时
        try {
            Thread.sleep(100); // 模拟阻塞操作
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        List<Map<String, Object>> users = List.of(
            Map.of("id", 1, "name", "Alice", "email", "alice@mvc.com", "type", "mvc"),
            Map.of("id", 2, "name", "Bob", "email", "bob@mvc.com", "type", "mvc"),
            Map.of("id", 3, "name", "Charlie", "email", "charlie@mvc.com", "type", "mvc")
        );
        
        return ResponseEntity.ok(users);
    }

    /**
     * 创建用户端点
     */
    @PostMapping("/users")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody Map<String, String> userDto) {
        log.info("MVC: Creating user: {}", userDto);
        
        // 模拟数据库保存操作
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        Map<String, Object> createdUser = Map.of(
            "id", System.currentTimeMillis(),
            "name", userDto.get("name"),
            "email", userDto.get("email"),
            "type", "mvc",
            "createdAt", LocalDateTime.now()
        );
        
        return ResponseEntity.ok(createdUser);
    }

    /**
     * 异步端点示例（使用 CompletableFuture）
     */
    @GetMapping("/async-data")
    public CompletableFuture<ResponseEntity<Map<String, Object>>> getAsyncData() {
        log.info("MVC: Processing async request");
        
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(500); // 模拟长时间操作
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            
            return ResponseEntity.ok(Map.of(
                "data", "Async data from MVC",
                "timestamp", LocalDateTime.now(),
                "processingTime", "500ms"
            ));
        });
    }

    /**
     * 获取服务器信息
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getServerInfo() {
        return ResponseEntity.ok(Map.of(
            "framework", "Spring MVC",
            "architecture", "Servlet Stack",
            "server", "Tomcat",
            "threading", "One thread per request",
            "port", 8080,
            "features", List.of(
                "Blocking I/O",
                "Traditional Controllers",
                "JPA Support",
                "Synchronous Processing"
            )
        ));
    }
}