package com.retailmanager.productsv.controller;

import com.retailmanager.productsv.dto.CategoryReplaceRequest;
import com.retailmanager.productsv.dto.ProductRequest;
import com.retailmanager.productsv.dto.ProductResponse;
import com.retailmanager.productsv.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Products", description = "Product management APIs")
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /*
        Actuator endpoints:
        Health: /products/actuator/health
        Info: /products/actuator/info
        Metrics: /products/actuator/metrics
        Prometheus: /products/actuator/prometheus
    */

    @Operation(summary = "Get all products with optional filters")
    @GetMapping
    public List<ProductResponse> getAll(
            @RequestParam(required = false) UUID brandId,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID supplierId,
            @RequestParam(required = false) Boolean highlighted,
            @RequestParam(required = false) Boolean published,
            @RequestParam(required = false) String search
    ) {
        return productService.findAll(brandId, categoryId, supplierId, highlighted, published, search);
    }

    @Operation(summary = "Get product by ID")
    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable UUID id) {
        return productService.getById(id);
    }

    @Operation(summary = "Create a new product")
    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.create(request));
    }

    @Operation(summary = "Update an existing product")
    @PatchMapping("/{id}")
    public ProductResponse update(@PathVariable UUID id, @RequestBody ProductRequest request) {
        return productService.update(id, request);
    }

    @Operation(summary = "Delete a product by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Restore a deleted product by ID")
    @PatchMapping("/{id}/restore")
    public void restore(@PathVariable UUID id) {
        productService.restore(id);
    }

    @Operation(summary = "Get total count of products with optional filters")
    @GetMapping("/count")
    public long count(@RequestParam(required = false) UUID brandId,
                      @RequestParam(required = false) UUID categoryId,
                      @RequestParam(required = false) UUID supplierId) {
        return productService.count(brandId, categoryId, supplierId);
    }

    @Operation(summary = "Check if products exist by brand ID")
    @GetMapping("/exists")
    public boolean existsByBrand(@RequestParam UUID brandId) {
        return productService.existsByBrand(brandId);
    }

    @Operation(summary = "Remove category from product")
    @PatchMapping("/category/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeCategory(@PathVariable UUID categoryId) {
        productService.removeCategory(categoryId);
    }

    @Operation(summary = "Replace category from product")
    @PatchMapping("/category")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void replaceCategory(@RequestBody @Valid CategoryReplaceRequest request) {
        productService.replaceCategory(request.from(), request.to());
    }
}
