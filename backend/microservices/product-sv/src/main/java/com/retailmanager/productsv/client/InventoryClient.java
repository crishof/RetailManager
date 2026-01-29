package com.retailmanager.productsv.client;

import com.retailmanager.productsv.dto.StockMovementRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;

@FeignClient(name = "inventory-sv", url = "http://inventory-sv:8080", path = "/internal/inventory")
public interface InventoryClient {

    @GetMapping("/product/{productId}/exists")
    boolean hasMovementsForProduct(@PathVariable UUID productId);

    @PostMapping("/movements")
    void registerMovement(@RequestBody StockMovementRequest request);
}