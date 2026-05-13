package com.crishof.purchasesv.service;

import com.crishof.purchasesv.dto.*;

import java.util.List;
import java.util.UUID;

public interface InvoiceService {

    List<InvoiceResponse> getAll();

    List<InvoiceResponse> getAllBySupplierId(UUID supplierId);

    InvoiceResponse getById(UUID id);

    InvoiceResponse save(InvoiceRequest invoiceRequest);

    void deleteById(UUID id);

    List<TransactionResponse> getAllTransactionsBySupplier(UUID supplierId);

    SupplierPaymentResponse savePayment(SupplierPaymentRequest request);

    List<AccountMovementResponse> getAccountStatement(UUID supplierId);
}
