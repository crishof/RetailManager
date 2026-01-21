package com.retailmanager.productsv.service;

import com.retailmanager.productsv.dto.ImportResult;
import com.retailmanager.productsv.dto.SupplierProductRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductImportServiceImpl implements ProductImportService {
    @Override
    public ImportResult importFromSupplier(List<SupplierProductRequest> productRequests) {
        //TODO implement method
        return null;
    }
}
