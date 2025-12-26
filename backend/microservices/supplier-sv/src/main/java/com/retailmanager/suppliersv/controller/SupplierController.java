package com.retailmanager.suppliersv.controller;

import com.retailmanager.suppliersv.dto.SupplierRequest;
import com.retailmanager.suppliersv.dto.SupplierResponse;
import com.retailmanager.suppliersv.service.SupplierService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @Operation(summary = "Check service status")
    @GetMapping("/status")
    public String getStatus() {
        return "Supplier Service is up and running!";
    }

    @Operation(summary = "Create a new supplier")
    @PostMapping
    public SupplierResponse create(@RequestBody SupplierRequest supplierRequest) {
        return supplierService.create(supplierRequest);
    }

    @Operation(summary = "Get All Suppliers")
    @GetMapping
    public List<SupplierResponse> getSuppliers() {
        return supplierService.findAll();
    }

    @Operation(summary = "Get Supplier by ID")
    @GetMapping("/{id}")
    public SupplierResponse getSupplierById(@PathVariable UUID id) {
        return supplierService.findById(id);
    }

    @Operation(summary = "Update existing supplier")
    @PatchMapping("/{id}")
    public SupplierResponse updateSupplier(
            @PathVariable UUID id,
            @RequestBody SupplierRequest supplierRequest) {
        return supplierService.update(id, supplierRequest);
    }

    @Operation(summary = "Delete Supplier by ID")
    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable UUID id) {
        supplierService.delete(id);
    }

    @Operation(summary = "Restore a deleted Supplier by ID")
    @PatchMapping("/{id}/restore")
    public SupplierResponse restore(@PathVariable UUID id) {
        return supplierService.restore(id);
    }

    @Operation(summary = "Get total count of Suppliers")
    @GetMapping("/count")
    public Long getSupplierCount() {
        return supplierService.getSupplierCount();
    }
}
