package com.retailmanager.suppliersv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SupplierSvApplication {

    public static void main(String[] args) {
        SpringApplication.run(SupplierSvApplication.class, args);
    }

}
