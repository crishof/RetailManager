package com.retailmanager.exchangesv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ExchangeSvApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExchangeSvApplication.class, args);
    }

}
