package com.retailmanager.productsv.controller;

import com.retailmanager.productsv.dto.InvoiceUpdateRequest;
import com.retailmanager.productsv.dto.OrderUpdateRequest;
import com.retailmanager.productsv.service.ProductStockService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products/stock")
@RequiredArgsConstructor
public class ProductStockController {

    private final ProductStockService stockService;

    @Operation(summary = "update product from supplier invoice")
    @PutMapping("/from-invoice")
    public void updateFromInvoice(@RequestBody InvoiceUpdateRequest request) {
        stockService.updateFromInvoice(request);
    }

    @Operation(summary = "Update stock from order")
    @PutMapping("/from-order")
    public void updateFromOrder(@RequestBody OrderUpdateRequest request) {
        stockService.updateStockFromOrder(request);
    }

}
