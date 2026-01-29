package com.retailmanager.imagesv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ImageSvApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImageSvApplication.class, args);
    }

}
