package com.retailmanager.supplierpricelistsv.service;

import java.util.List;
import java.util.UUID;

public interface SupplierService {

    List<String> getBrandsBySupplier(UUID supplierId);

    List<String> getAllBrands();
}
