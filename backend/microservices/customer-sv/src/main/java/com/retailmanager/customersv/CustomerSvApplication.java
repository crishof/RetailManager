package com.retailmanager.customersv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CustomerSvApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerSvApplication.class, args);
    }

}
