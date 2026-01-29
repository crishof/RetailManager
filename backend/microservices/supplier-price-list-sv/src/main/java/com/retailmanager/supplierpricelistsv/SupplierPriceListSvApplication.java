package com.retailmanager.supplierpricelistsv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SupplierPriceListSvApplication {

    public static void main(String[] args) {
        SpringApplication.run(SupplierPriceListSvApplication.class, args);
    }

}
