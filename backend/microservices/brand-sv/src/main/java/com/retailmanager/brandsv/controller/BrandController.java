package com.retailmanager.brandsv.controller;

import com.retailmanager.brandsv.service.CategoryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    private final CategoryClient categoryClient;

    public BrandController(CategoryClient categoryClient) {
        this.categoryClient = categoryClient;
    }

    @GetMapping("/status")
    public String getStatus() {

        String categoryStatus = categoryClient.getCategoryStatus();
        return "Brand Service is up and running! Category Service Status: " + categoryStatus;
    }
}
