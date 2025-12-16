package com.retailmanager.brandsv.controller;

import com.retailmanager.brandsv.dto.BrandResponse;
import com.retailmanager.brandsv.service.BrandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Tag(name = "Brands", description = "Brand management APIs")
@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @Operation(summary = "Check service status")
    @GetMapping("/status")
    public ResponseEntity<String> root() {
        return ResponseEntity.ok("Brand service is running");
    }

    @Operation(summary = "Create a new brand")
    @PostMapping("/create")
    public BrandResponse create(@RequestParam String name,
                                @RequestPart(required = false) MultipartFile logo) {
        return brandService.create(name, logo);
    }

    @Operation(summary = "Get all brands")
    @GetMapping("/getAll")
    public List<BrandResponse> findAll() {
        return brandService.findAll();
    }

    @Operation(summary = "Get brand by ID")
    @GetMapping("/getById/{id}")
    public BrandResponse findById(@PathVariable UUID id) {
        return brandService.findById(id);
    }

    @Operation(summary = "Update an existing brand")
    @PatchMapping("/update/{id}")
    public BrandResponse update(
            @PathVariable UUID id,
            @RequestPart(required = false) String name,
            @RequestPart(required = false) MultipartFile logo
    ) {
        return brandService.update(id, name, logo);
    }

    @Operation(summary = "Delete a brand by ID")
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable UUID id) {
        brandService.delete(id);
    }
}