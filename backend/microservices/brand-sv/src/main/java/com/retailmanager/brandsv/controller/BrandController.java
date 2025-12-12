package com.retailmanager.brandsv.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    @GetMapping("/status")
    public String getStatus() {
        return "Brand Service is up and running!";
    }
}
