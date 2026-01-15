package com.retailmanager.productsv.controller;

import com.retailmanager.productsv.dto.InvoiceUpdateRequest;
import com.retailmanager.productsv.dto.OrderUpdateRequest;
import com.retailmanager.productsv.service.ProductStockService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products/stock")
@RequiredArgsConstructor
@Slf4j
public class ProductStockController {

    private final ProductStockService stockService;

    // ============================
    // UPDATE FROM INVOICE
    // ============================
    @Operation(summary = "update product from supplier invoice")
    @PutMapping("/from-invoice")
    public void updateFromInvoice(@RequestBody InvoiceUpdateRequest request) {
        log.info("Received request to update product from supplier invoice");
        stockService.updateFromInvoice(request);
    }

    // ============================
    // UPDATE FROM ORDER
    // ============================
    @Operation(summary = "Update stock from order")
    @PutMapping("/from-order")
    public void updateFromOrder(@RequestBody OrderUpdateRequest request) {
        log.info("Received request to update stock from order");
        stockService.updateStockFromOrder(request);
    }
}
