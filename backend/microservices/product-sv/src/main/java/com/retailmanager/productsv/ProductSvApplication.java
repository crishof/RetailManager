package com.retailmanager.productsv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ProductSvApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductSvApplication.class, args);
    }

}
