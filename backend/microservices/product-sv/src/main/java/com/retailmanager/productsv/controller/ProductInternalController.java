package com.retailmanager.productsv.controller;

import com.retailmanager.productsv.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/internal/products")
@RequiredArgsConstructor
@Slf4j
public class ProductInternalController {

    private final ProductService productService;

    @PatchMapping("/category/{categoryId}/clear")
    public int clearCategory(@PathVariable UUID categoryId) {
        log.info("Clearing category {} from products", categoryId);
        return productService.clearCategory(categoryId);
    }
}