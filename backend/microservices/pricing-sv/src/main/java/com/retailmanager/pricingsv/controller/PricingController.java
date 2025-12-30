package com.retailmanager.pricingsv.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pricing")
public class PricingController {
    @GetMapping("/status")
    public String getStatus() {
        return "Pricing Service is up and running!";
    }
}
