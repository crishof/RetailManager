package com.retailmanager.brandsv.controller;

import com.retailmanager.brandsv.dto.BrandResponse;
import com.retailmanager.brandsv.service.BrandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Tag(name = "Brands", description = "Brand management APIs")
@Validated
@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
@Slf4j
public class BrandController {

    private final BrandService brandService;

    // ============================
    // CREATE BRAND
    // ============================
    @Operation(summary = "Create a new brand")
    @ApiResponse(responseCode = "201", description = "Brand created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BrandResponse> create(
            @RequestParam @NotBlank @Size(max = 100) String name,
            @RequestPart(required = false) MultipartFile logo
    ) {
        log.info("Creating brand | name={} | hasLogo={}", name, logo != null);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(brandService.create(name, logo));
    }

    // ============================
    // GET ALL BRANDS (PAGINATED)
    // ============================
    @Operation(summary = "Get all brands (paginated)")
    @ApiResponse(responseCode = "200", description = "Brands retrieved successfully")
    @GetMapping
    public ResponseEntity<Page<BrandResponse>> getAll(Pageable pageable) {
        log.info("Fetching all brands with pagination");
        Page<BrandResponse> page = brandService.getAll(pageable);
        return ResponseEntity.ok(page);
    }

    // ============================
    // GET BRAND BY ID
    // ============================
    @Operation(summary = "Get brand by ID")
    @ApiResponse(responseCode = "200", description = "Brand retrieved successfully")
    @ApiResponse(responseCode = "404", description = "Brand not found")
    @GetMapping("/{id}")
    public ResponseEntity<BrandResponse> getById(@PathVariable @NotNull UUID id) {
        log.info("Fetching brand by id={}", id);
        return ResponseEntity.ok(brandService.getById(id));
    }

    // ============================
    // UPDATE BRAND
    // ============================
    @Operation(summary = "Update an existing brand (name and/or logo)")
    @ApiResponse(responseCode = "200", description = "Brand updated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Brand not found")
    @PatchMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BrandResponse> update(
            @PathVariable @NotNull UUID id,
            @RequestPart(required = false) String name,
            @RequestPart(required = false) MultipartFile logo
    ) {
        log.info("Updating brand id={} | name present={}", id, name != null);
        return ResponseEntity.ok(brandService.update(id, name, logo));
    }

    // ============================
    // SOFT DELETE BRAND
    // ============================
    @Operation(summary = "Soft delete a brand by ID")
    @ApiResponse(responseCode = "204", description = "Brand deleted successfully")
    @ApiResponse(responseCode = "404", description = "Brand not found")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDelete(@PathVariable @NotNull UUID id) {
        log.info("Soft deleting brand id={}", id);
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ============================
    // FORCE DELETE BRAND
    // ============================
    @Operation(summary = "Hard delete a brand by ID")
    @ApiResponse(responseCode = "204", description = "Brand deleted successfully")
    @ApiResponse(responseCode = "404", description = "Brand not found")
    @DeleteMapping("/{id}/force")
    public ResponseEntity<Void> forceDelete(@PathVariable @NotNull UUID id) {
        log.info("Hard deleting brand id={}", id);
        brandService.forceDelete(id);
        return ResponseEntity.noContent().build();
    }

    // ============================
    // DELETE BRAND LOGO
    // ============================
    @Operation(summary = "Delete only the logo of a brand")
    @ApiResponse(responseCode = "204", description = "Brand logo deleted successfully")
    @ApiResponse(responseCode = "404", description = "Brand not found")
    @PatchMapping("/{id}/logo")
    public ResponseEntity<Void> deleteBrandLogo(@PathVariable @NotNull UUID id) {
        log.info("Deleting logo for brand id={}", id);
        brandService.deleteBrandLogo(id);
        return ResponseEntity.noContent().build();
    }

    // ============================
    // RESTORE BRAND
    // ============================
    @Operation(summary = "Restore a soft-deleted brand by ID")
    @ApiResponse(responseCode = "200", description = "Brand restored successfully")
    @ApiResponse(responseCode = "404", description = "Brand not found")
    @PatchMapping("/{id}/restore")
    public ResponseEntity<BrandResponse> restore(@PathVariable @NotNull UUID id) {
        log.info("Restoring brand id={}", id);
        return ResponseEntity.ok(brandService.restore(id));
    }

    // ============================
    // COUNT BRANDS
    // ============================
    @Operation(summary = "Get total count of brands")
    @ApiResponse(responseCode = "200", description = "Brand count retrieved successfully")
    @GetMapping("/count")
    public ResponseEntity<Long> getBrandCount() {
        log.info("Getting total count of brands");
        return ResponseEntity.ok(brandService.getBrandCount());
    }

    //TODO: Write unit and integration tests for the controller methods
}