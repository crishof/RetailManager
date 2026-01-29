package com.retailmanager.pricingsv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PricingSvApplication {

    public static void main(String[] args) {
        SpringApplication.run(PricingSvApplication.class, args);
    }

}
