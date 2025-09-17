package com.murphy.webflux.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * WebFlux 示例控制器 - 响应式 Web 控制器
 * 演示 Spring WebFlux 的响应式编程用法
 * 
 * @author Murphy Team
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/webflux")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000"})
public class WebFluxExampleController {

    /**
     * 简单的响应式端点
     */
    @GetMapping("/hello")
    public Mono<ResponseEntity<Map<String, Object>>> hello() {
        log.info("WebFlux: Processing hello request");
        
        return Mono.fromSupplier(() -> ResponseEntity.ok(Map.of(
            "message", "Hello from Spring WebFlux!",
            "timestamp", LocalDateTime.now(),
            "server", "WebFlux Backend",
            "port", 8081
        )));
    }

    /**
     * 响应式数据流端点
     */
    @GetMapping("/users")
    public Flux<Map<String, Object>> getUsers() {
        log.info("WebFlux: Streaming users");
        
        return Flux.fromIterable(List.of(
            Map.of("id", 1, "name", "Alice", "email", "alice@webflux.com", "type", "webflux"),
            Map.of("id", 2, "name", "Bob", "email", "bob@webflux.com", "type", "webflux"),
            Map.of("id", 3, "name", "Charlie", "email", "charlie@webflux.com", "type", "webflux")
        ))
        .delayElements(Duration.ofMillis(50)) // 模拟数据流
        .doOnNext(user -> log.info("Streaming user: {}", user.get("name")));
    }

    /**
     * 创建用户的响应式端点
     */
    @PostMapping("/users")
    public Mono<ResponseEntity<Map<String, Object>>> createUser(@RequestBody Map<String, String> userDto) {
        log.info("WebFlux: Creating user: {}", userDto);
        
        return Mono.fromSupplier(() -> Map.of(
            "id", System.currentTimeMillis(),
            "name", userDto.get("name"),
            "email", userDto.get("email"),
            "type", "webflux",
            "createdAt", LocalDateTime.now()
        ))
        .delayElement(Duration.ofMillis(100)) // 模拟异步操作
        .map(ResponseEntity::ok);
    }

    /**
     * 服务器发送事件 (SSE) 端点
     */
    @GetMapping(value = "/events", produces = "text/event-stream")
    public Flux<Map<String, Object>> streamEvents() {
        log.info("WebFlux: Starting event stream");
        
        return Flux.interval(Duration.ofSeconds(1))
            .take(10) // 只发送10个事件
            .map(i -> Map.of(
                "event", "heartbeat",
                "data", "Event " + (i + 1),
                "timestamp", LocalDateTime.now(),
                "server", "webflux"
            ))
            .doOnNext(event -> log.info("Sending event: {}", event.get("data")))
            .doOnComplete(() -> log.info("Event stream completed"));
    }

    /**
     * 长时间运行的异步操作
     */
    @GetMapping("/async-data")
    public Mono<ResponseEntity<Map<String, Object>>> getAsyncData() {
        log.info("WebFlux: Processing async request");
        
        return Mono.fromSupplier(() -> Map.of(
            "data", "Async data from WebFlux",
            "timestamp", LocalDateTime.now(),
            "processingTime", "500ms"
        ))
        .delayElement(Duration.ofMillis(500)) // 模拟长时间操作，但不阻塞线程
        .map(ResponseEntity::ok);
    }

    /**
     * 批量数据处理端点
     */
    @GetMapping("/batch-data")
    public Flux<Map<String, Object>> getBatchData(@RequestParam(defaultValue = "5") int count) {
        log.info("WebFlux: Processing batch data request for {} items", count);
        
        return Flux.range(1, count)
            .flatMap(i -> Mono.fromSupplier(() -> Map.of(
                "id", i,
                "data", "Batch item " + i,
                "timestamp", LocalDateTime.now()
            )).delayElement(Duration.ofMillis(100))) // 并行处理
            .doOnNext(item -> log.info("Processing batch item: {}", item.get("id")));
    }

    /**
     * 获取服务器信息
     */
    @GetMapping("/info")
    public Mono<ResponseEntity<Map<String, Object>>> getServerInfo() {
        return Mono.fromSupplier(() -> ResponseEntity.ok(Map.of(
            "framework", "Spring WebFlux",
            "architecture", "Reactive Stack",
            "server", "Netty",
            "threading", "Event Loop",
            "port", 8081,
            "features", List.of(
                "Non-blocking I/O",
                "Reactive Controllers",
                "R2DBC Support",
                "Backpressure Handling",
                "Server-Sent Events"
            )
        )));
    }

    /**
     * 错误处理示例
     */
    @GetMapping("/error-example")
    public Mono<ResponseEntity<Map<String, Object>>> errorExample() {
        return Mono.fromSupplier(() -> {
            if (Math.random() > 0.5) {
                throw new RuntimeException("Random error for demonstration");
            }
            return ResponseEntity.ok(Map.of("status", "success"));
        })
        .onErrorResume(error -> {
            log.error("Error occurred: {}", error.getMessage());
            return Mono.just(ResponseEntity.badRequest().body(Map.of(
                "error", error.getMessage(),
                "timestamp", LocalDateTime.now()
            )));
        });
    }
}