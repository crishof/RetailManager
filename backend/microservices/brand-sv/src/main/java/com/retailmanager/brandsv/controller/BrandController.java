package com.retailmanager.brandsv.controller;

import com.retailmanager.brandsv.dto.BrandResponse;
import com.retailmanager.brandsv.service.BrandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Tag(name = "Brands", description = "Brand management APIs")
@Validated
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
    @PostMapping
    public BrandResponse create(@RequestParam @NotBlank String name,
                                @RequestPart(required = false) MultipartFile logo) {
        return brandService.create(name, logo);
    }

    @Operation(summary = "Get all brands")
    @GetMapping
    public List<BrandResponse> findAll() {
        return brandService.findAll();
    }
    //TODO: Add pagination to findAll method

    @Operation(summary = "Get brand by ID")
    @GetMapping("/{id}")
    public BrandResponse findById(@PathVariable UUID id) {
        return brandService.findById(id);
    }

    @Operation(summary = "Update an existing brand")
    @PatchMapping("/{id}")
    public BrandResponse update(
            @PathVariable UUID id,
            @RequestPart(required = false) String name,
            @RequestPart(required = false) MultipartFile logo
    ) {
        return brandService.update(id, name, logo);
    }
    //TODO Update only brand logo
    //TODO Update only brand name

    @Operation(summary = "Delete a brand by ID")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        brandService.delete(id);
    }

    @Operation(summary = "Delete brand logo")
    @PatchMapping("/{id}/logo")
    public void deleteLogo(@PathVariable UUID id) {
        brandService.deleteBrandLogo(id);
    }

    @Operation(summary = "Restore a deleted brand by ID")
    @PatchMapping("/{id}/restore")
    public BrandResponse restore(@PathVariable @NotNull UUID id) {
        return brandService.restore(id);
    }

    @Operation(summary = "Get total count of brands")
    @GetMapping("/count")
    public ResponseEntity<Long> getBrandCount() {
        return ResponseEntity.ok().body(brandService.getBrandCount());
    }

    //TODO: Write unit and integration tests for the controller methods
}