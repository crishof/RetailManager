package com.crishof.productsv.service;

import com.crishof.productsv.dto.InvoiceUpdateRequest;
import com.crishof.productsv.dto.OrderUpdateRequest;
import jakarta.transaction.Transactional;

public interface ProductStockService {
    @Transactional
    void updateFromInvoice(InvoiceUpdateRequest request);

    @Transactional
    void updateFromOrder(OrderUpdateRequest request);
}
