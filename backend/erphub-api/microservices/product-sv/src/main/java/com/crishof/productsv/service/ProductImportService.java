package com.crishof.productsv.service;

import com.crishof.productsv.dto.ImportResult;
import com.crishof.productsv.dto.SupplierProductRequest;

import java.util.List;

public interface ProductImportService {
    ImportResult importFromSupplier(List<SupplierProductRequest> productRequests);
}
