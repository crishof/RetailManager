package com.retailmanager.salessv.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/sales")
public class SalesController {
    @GetMapping("/status")
    public String getStatus() {
        return "Sales Service is up and running!";
    }
}
