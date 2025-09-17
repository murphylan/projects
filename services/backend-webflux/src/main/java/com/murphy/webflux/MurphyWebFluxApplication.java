package com.murphy.webflux;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Murphy WebFlux Application Main Class
 * 响应式 Web 应用程序入口
 * 
 * @author Murphy Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
@EnableTransactionManagement
public class MurphyWebFluxApplication {

    public static void main(String[] args) {
        SpringApplication.run(MurphyWebFluxApplication.class, args);
    }
}