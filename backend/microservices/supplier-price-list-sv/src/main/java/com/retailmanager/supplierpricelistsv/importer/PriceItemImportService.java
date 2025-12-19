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
                    repository.findProductByBrandAndCodeAndSupplierId(
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

        target.setPrice(source.getPrice());
        target.setTaxRate(source.getTaxRate());
        target.setSuggestedPrice(source.getSuggestedPrice());
        target.setSuggestedWebPrice(source.getSuggestedWebPrice());
        target.setStockRaw(source.getStockRaw());
        target.setCurrency(source.getCurrency());
        target.setLastUpdate(Instant.now());
    }
}