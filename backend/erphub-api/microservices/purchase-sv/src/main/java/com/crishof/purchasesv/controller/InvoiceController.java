package com.crishof.purchasesv.controller;

import com.crishof.purchasesv.dto.InvoiceRequest;
import com.crishof.purchasesv.dto.InvoiceResponse;
import com.crishof.purchasesv.dto.TransactionResponse;
import com.crishof.purchasesv.dto.AccountMovementResponse;
import com.crishof.purchasesv.dto.SupplierPaymentRequest;
import com.crishof.purchasesv.dto.SupplierPaymentResponse;
import com.crishof.purchasesv.service.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/purchases")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<List<InvoiceResponse>> getAll() {
        return ResponseEntity.ok(invoiceService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(invoiceService.getById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InvoiceResponse save(@Valid @RequestBody InvoiceRequest invoiceRequest) {
        return invoiceService.save(invoiceRequest);
    }

    @GetMapping("/supplier/{supplierId}")
    public ResponseEntity<List<InvoiceResponse>> getBySupplierId(@PathVariable UUID supplierId) {
        return ResponseEntity.ok(invoiceService.getAllBySupplierId(supplierId));
    }

    @GetMapping("/supplier/{supplierId}/transactions")
    public ResponseEntity<List<TransactionResponse>> getTransactionsBySupplierId(@PathVariable UUID supplierId) {
        return ResponseEntity.ok(invoiceService.getAllTransactionsBySupplier(supplierId));
    }

    @GetMapping("/supplier/{supplierId}/account")
    public ResponseEntity<List<AccountMovementResponse>> getAccountStatement(@PathVariable UUID supplierId) {
        return ResponseEntity.ok(invoiceService.getAccountStatement(supplierId));
    }

    @PostMapping("/supplier/{supplierId}/payments")
    @ResponseStatus(HttpStatus.CREATED)
    public SupplierPaymentResponse savePayment(@PathVariable UUID supplierId,
                                               @Valid @RequestBody SupplierPaymentRequest request) {
        request.setSupplierId(supplierId);
        return invoiceService.savePayment(request);
    }
}
