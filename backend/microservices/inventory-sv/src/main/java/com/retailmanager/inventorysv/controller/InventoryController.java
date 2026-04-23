package com.retailmanager.inventorysv.controller;

import com.retailmanager.inventorysv.dto.StockMovementRequest;
import com.retailmanager.inventorysv.model.Stock;
import com.retailmanager.inventorysv.service.StockService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/internal/inventory")
@RequiredArgsConstructor
@Hidden
public class InventoryController {

    private final StockService stockService;

    @PostMapping("/movements")
    public ResponseEntity<Void> registerMovement(@RequestBody @Valid StockMovementRequest request) {
        stockService.registerMovement(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/product/{productId}")
    public List<Stock> getProductStock(@PathVariable UUID productId) {
        return stockService.getProductStock(productId);
    }
}
