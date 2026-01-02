package com.retailmanager.productsv.controller;

import com.retailmanager.productsv.dto.ImportResult;
import com.retailmanager.productsv.dto.SupplierProductRequest;
import com.retailmanager.productsv.service.ProductImportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products/import")
@RequiredArgsConstructor
public class ProductImportController {

    private final ProductImportService importService;

    @Operation(summary = "Import products from supplier item list")
    @PostMapping("/supplier")
    public ResponseEntity<ImportResult> importFromSupplier(@RequestBody List<SupplierProductRequest> productRequests) {
        return ResponseEntity.ok(importService.importFromSupplier(productRequests));
    }
}
