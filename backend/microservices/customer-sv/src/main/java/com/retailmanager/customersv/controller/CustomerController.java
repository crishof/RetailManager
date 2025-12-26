package com.retailmanager.customersv.controller;

import com.retailmanager.customersv.dto.CustomerRequest;
import com.retailmanager.customersv.dto.CustomerResponse;
import com.retailmanager.customersv.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Customers", description = "Customer management APIs")
@Validated
@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @Operation(summary = "Check service status")
    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("Customer Service is up and running!");
    }

    @Operation(summary = "Create a new customer")
    @PostMapping
    public CustomerResponse create(@RequestBody CustomerRequest customerRequest) {
        return customerService.create(customerRequest);
    }

    @Operation(summary = "Get all customers")
    @GetMapping
    public List<CustomerResponse> getAll() {
        return customerService.findAll();
    }

    @Operation(summary = "Get customer by ID")
    @GetMapping("/{id}")
    public CustomerResponse getById(@PathVariable UUID id) {
        return customerService.findById(id);
    }

    @Operation(summary = "Update an existing customer")
    @PatchMapping("/{id}")
    public CustomerResponse update(
            @PathVariable UUID id,
            @RequestBody CustomerRequest customerRequest) {
        return customerService.update(id, customerRequest);
    }

    @Operation(summary = "Delete a customer by ID")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        customerService.delete(id);
    }

    @Operation(summary = "Restore a deleted customer by ID")
    @PatchMapping("/{id}/restore")
    public CustomerResponse restore(@PathVariable UUID id) {
        return customerService.restore(id);
    }

    @Operation(summary = "Get total number of customers")
    @GetMapping("/count")
    public ResponseEntity<Long> getCustomerCount() {
        return ResponseEntity.ok(customerService.getCustomerCount());
    }
}
