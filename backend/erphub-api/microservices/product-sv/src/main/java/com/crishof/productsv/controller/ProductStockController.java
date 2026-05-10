package com.crishof.productsv.controller;

import com.crishof.productsv.dto.InvoiceUpdateRequest;
import com.crishof.productsv.dto.OrderUpdateRequest;
import com.crishof.productsv.service.ProductStockService;
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

    private final ProductStockService productStockService;

    // ============================
    // UPDATE FROM INVOICE
    // ============================
    @PutMapping("/from-invoice")
    @Operation(summary = "Update product stock and price from supplier invoice")
    public void updateFromInvoice(@RequestBody InvoiceUpdateRequest request) {
        log.info("Updating products from supplier invoice");
        productStockService.updateFromInvoice(request);
    }

    // ============================
    // UPDATE FROM ORDER
    // ============================
    @PutMapping("/from-order")
    @Operation(summary = "Update product stock from order")
    public void updateFromOrder(@RequestBody OrderUpdateRequest request) {
        log.info("Updating product stock from order");
        productStockService.updateFromOrder(request);
    }
}