package com.retailmanager.supplierpricelistsv.importer;

import com.retailmanager.supplierpricelistsv.dto.ImportResult;
import com.retailmanager.supplierpricelistsv.model.SupplierPriceItem;
import com.retailmanager.supplierpricelistsv.repository.SupplierPriceItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PriceItemImportService {

    private final SupplierPriceItemRepository repository;

    @Transactional
    public ImportResult importItems(
            List<SupplierPriceItem> items,
            UUID supplierId,
            boolean updateExisting
    ) {

        int inserted = 0;
        int updated = 0;

        for (SupplierPriceItem item : items) {

            SupplierPriceItem existing =
                    repository.findProductByBrandAndSupplierCodeAndSupplierId(
                            item.getBrand(),
                            item.getSupplierCode(),
                            supplierId
                    );

            if (existing != null) {

                if (!updateExisting) continue;

                merge(existing, item);
                repository.save(existing);
                updated++;
            } else {
                item.setSupplierId(supplierId);
                repository.save(item);
                inserted++;
            }
        }

        return new ImportResult(inserted, updated);
    }

    private void merge(SupplierPriceItem target, SupplierPriceItem source) {
        if (source.getSupplierCode() != null) target.setSupplierCode(source.getSupplierCode());
        if (source.getBrand() != null) target.setBrand(source.getBrand());
        if (source.getModel() != null) target.setModel(source.getModel());
        if (source.getBarcode() != null) target.setBarcode(source.getBarcode());
        if (source.getDescription() != null) target.setDescription(source.getDescription());
        if (source.getCategory() != null) target.setCategory(source.getCategory());
        if (source.getPrice() != null) target.setPrice(source.getPrice());
        if (source.getSuggestedPrice() != null) target.setSuggestedPrice(source.getSuggestedPrice());
        if (source.getSuggestedWebPrice() != null) target.setSuggestedWebPrice(source.getSuggestedWebPrice());
        if (source.getCurrency() != null) target.setCurrency(source.getCurrency());
        if (source.getTaxRate() != null) target.setTaxRate(source.getTaxRate());
        if (source.getStockRaw() != null) target.setStockRaw(source.getStockRaw());
        target.setLastUpdate(Instant.now());
    }
}