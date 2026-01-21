package com.retailmanager.productsv.service;

import com.retailmanager.productsv.dto.ImportResult;
import com.retailmanager.productsv.dto.SupplierProductRequest;

import java.util.List;

public interface ProductImportService {
    ImportResult importFromSupplier(List<SupplierProductRequest> productRequests);
}
