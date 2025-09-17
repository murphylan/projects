package com.murphy.mvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Murphy MVC Application Main Class
 * 传统 MVC Web 应用程序入口
 * 
 * @author Murphy Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
@EnableTransactionManagement
public class MurphyMvcApplication {

    public static void main(String[] args) {
        SpringApplication.run(MurphyMvcApplication.class, args);
    }
}