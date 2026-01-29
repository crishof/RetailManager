package com.retailmanager.inventorysv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class InventorySvApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventorySvApplication.class, args);
    }

}
