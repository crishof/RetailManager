package com.retailmanager.productsv.service;

import com.retailmanager.productsv.dto.InvoiceUpdateRequest;
import com.retailmanager.productsv.dto.OrderUpdateRequest;
import jakarta.transaction.Transactional;

public interface ProductStockService {
    @Transactional
    void updateFromInvoice(InvoiceUpdateRequest request);

    @Transactional
    void updateFromOrder(OrderUpdateRequest request);
}
