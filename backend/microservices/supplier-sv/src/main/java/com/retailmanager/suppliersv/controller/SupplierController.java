package com.retailmanager.suppliersv.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
    @GetMapping("/status")
    public String getStatus() {
        return "Supplier Service is up and running!";
    }
}
