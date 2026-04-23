package com.retailmanager.suppliercatalogsv.service;

import com.retailmanager.suppliercatalogsv.dto.ImportResult;
import com.retailmanager.suppliercatalogsv.dto.PriceItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface PriceItemService {

    ImportResult importFile(
            MultipartFile file,
            UUID supplierId,
            boolean updateExisting
    );

    List<PriceItemResponse> getAllByFilter(UUID supplierId, String brand, String filter);

    PriceItemResponse getById(UUID id);

    List<String> getBrandsBySupplier(UUID supplierId);

    List<String> getAllBrands();
}
