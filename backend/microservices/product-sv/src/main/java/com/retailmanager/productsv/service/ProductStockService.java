package com.retailmanager.productsv.service;

import com.retailmanager.productsv.dto.InvoiceUpdateRequest;
import com.retailmanager.productsv.dto.OrderUpdateRequest;

public interface ProductStockService {
    void updateFromInvoice(InvoiceUpdateRequest request);

    void updateStockFromOrder(OrderUpdateRequest request);
}
