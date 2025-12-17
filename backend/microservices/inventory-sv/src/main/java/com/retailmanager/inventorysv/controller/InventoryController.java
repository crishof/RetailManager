package com.retailmanager.inventorysv.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryController {
    @GetMapping("/status")
    public String getStatus() {
        return "Inventory Service is up and running!";
    }
}
