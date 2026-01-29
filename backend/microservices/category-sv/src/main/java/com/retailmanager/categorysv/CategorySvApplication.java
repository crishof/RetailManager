package com.retailmanager.categorysv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CategorySvApplication {

    public static void main(String[] args) {
        SpringApplication.run(CategorySvApplication.class, args);
    }

}
