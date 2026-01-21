package com.retailmanager.productsv.controller;

import com.retailmanager.productsv.dto.ProductRequest;
import com.retailmanager.productsv.dto.ProductResponse;
import com.retailmanager.productsv.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "Products", description = "Product management APIs")
@Validated
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    // ============================
    // GET ALL PRODUCTS (PAGINATED)
    // ============================
    @Operation(summary = "Get all products with optional filters (paginated)")
    @ApiResponse(responseCode = "200", description = "Products retrieved successfully")
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAll(@RequestParam(required = false) UUID brandId, @RequestParam(required = false) UUID categoryId, @RequestParam(required = false) UUID supplierId, @RequestParam(required = false) Boolean highlighted, @RequestParam(required = false) Boolean published, @RequestParam(required = false) String search, Pageable pageable) {
        log.info("Fetching products with pagination ");
        Page<ProductResponse> page = productService.findAll(brandId, categoryId, supplierId, highlighted, published, search, pageable);
        return ResponseEntity.ok(page);
    }

    // ============================
    // GET PRODUCT BY ID
    // ============================
    @Operation(summary = "Get product by ID")
    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable UUID id) {
        return productService.getById(id);
    }

    // ============================
    // CREATE NEW PRODUCT
    // ============================
    @Operation(summary = "Create a new product")
    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(request));
    }

    // ============================
    // UPDATE PRODUCT
    // ============================
    @Operation(summary = "Update an existing product")
    @PatchMapping("/{id}")
    public ProductResponse update(@PathVariable UUID id, @RequestBody ProductRequest request) {
        return productService.update(id, request);
    }

    // ============================
    // DELETE PRODUCT
    // ============================
    @Operation(summary = "Delete a product by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ============================
    // RESTORE PRODUCT
    // ============================
    @Operation(summary = "Restore a deleted product by ID")
    @PatchMapping("/{id}/restore")
    public void restore(@PathVariable UUID id) {
        productService.restore(id);
    }

    // ============================
    // COUNT PRODUCTS
    // ============================
    @Operation(summary = "Get total count of products with optional filters")
    @GetMapping("/count")
    public long count(@RequestParam(required = false) UUID brandId, @RequestParam(required = false) UUID categoryId, @RequestParam(required = false) UUID supplierId) {
        return productService.count(brandId, categoryId, supplierId);
    }
}
