package com.retailmanager.supplierpricelistsv.service;

import com.retailmanager.supplierpricelistsv.model.SupplierPriceItem;
import com.retailmanager.supplierpricelistsv.repository.SupplierPriceItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierPriceItemRepository supplierPriceItemRepository;

    @Override
    public List<String> getBrandsBySupplier(UUID supplierId) {

        List<SupplierPriceItem> products = supplierPriceItemRepository.findAllBySupplierId(supplierId);

        return products.stream()
                .map(SupplierPriceItem::getBrand)
                .distinct().sorted()
                .toList();
    }

    @Override
    public List<String> getAllBrands() {
        List<SupplierPriceItem> products = supplierPriceItemRepository.findAll();

        return products.stream()
                .map(SupplierPriceItem::getBrand)
                .distinct()
                .sorted()
                .toList();
    }
}
