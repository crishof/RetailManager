package com.retailmanager.categorysv.controller;

import com.retailmanager.categorysv.dto.CategoryResponse;
import com.retailmanager.categorysv.service.CategoryService;
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

@Tag(name = "Categories", description = "Category management APIs")
@Validated
@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "Check service status")
    @GetMapping("/status")
    public ResponseEntity<String> root() {
        return ResponseEntity.ok("Category service is running");
    }

    @Operation(summary = "Create a new category")
    @PostMapping
    public CategoryResponse create(@RequestParam @NotBlank String name,
                                   @RequestPart(required = false) MultipartFile logo) {
        return categoryService.create(name, logo);
    }

    @Operation(summary = "Get all categories")
    @GetMapping
    public List<CategoryResponse> findAll() {
        return categoryService.findAll();
    }
    //TODO: Add pagination to findAll method

    @Operation(summary = "Get category by ID")
    @GetMapping("/{id}")
    public CategoryResponse findById(@PathVariable UUID id) {
        return categoryService.findById(id);
    }

    @Operation(summary = "Update an existing category")
    @PatchMapping("/{id}")
    public CategoryResponse update(
            @PathVariable UUID id,
            @RequestPart(required = false) String name,
            @RequestPart(required = false) MultipartFile logo
    ) {
        return categoryService.update(id, name, logo);
    }
    //TODO Update only category logo
    //TODO Update only category name

    @Operation(summary = "Delete a category by ID")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        categoryService.delete(id);
    }

    @Operation(summary = "Delete category image")
    @PatchMapping("/{id}/image")
    public void deleteImage(@PathVariable UUID id) {
        categoryService.deleteImage(id);
    }

    @Operation(summary = "Restore a deleted category by ID")
    @PatchMapping("/{id}/restore")
    public CategoryResponse restore(@PathVariable @NotNull UUID id) {
        return categoryService.restore(id);
    }

    @Operation(summary = "Get total count of categories")
    @GetMapping("/count")
    public ResponseEntity<Long> getCategoryCount() {
        return ResponseEntity.ok().body(categoryService.getCategoryCount());
    }

    //TODO: Write unit and integration tests for the controller methods
}
