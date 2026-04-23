package com.retailmanager.suppliercatalogsv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SupplierCatalogSvApplication {

    public static void main(String[] args) {
        SpringApplication.run(SupplierCatalogSvApplication.class, args);
    }

}
