package com.retailmanager.supplierpricelistsv.service;

import com.retailmanager.supplierpricelistsv.dto.ImportResult;
import com.retailmanager.supplierpricelistsv.dto.PriceItemResponse;
import com.retailmanager.supplierpricelistsv.exception.PriceItemNotFoundException;
import com.retailmanager.supplierpricelistsv.importer.ExcelPriceItemReader;
import com.retailmanager.supplierpricelistsv.importer.PriceItemImportService;
import com.retailmanager.supplierpricelistsv.mapper.PriceItemMapper;
import com.retailmanager.supplierpricelistsv.model.SupplierPriceItem;
import com.retailmanager.supplierpricelistsv.repository.SupplierPriceItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PriceItemServiceImpl implements PriceItemService {

    final SupplierPriceItemRepository supplierPriceItemRepository;
    private final ExcelPriceItemReader excelReader;
    private final PriceItemImportService importService;
    private final PriceItemMapper priceItemMapper;

    @Override
    public ImportResult importFile(
            MultipartFile file,
            UUID supplierId,
            boolean updateExisting
    ) {

        log.info("Starting price list import | supplierId={}", supplierId);

        List<SupplierPriceItem> items = excelReader.read(file);

        ImportResult result =
                importService.importItems(items, supplierId, updateExisting);

        log.info("Import finished | inserted={} | updated={}",
                result.inserted(), result.updated());

        return result;
    }

    @Override
    public List<PriceItemResponse> getAllByFilter(UUID supplierId, String brand, String filter) {
        List<SupplierPriceItem> products = new ArrayList<>();

        if (supplierId == null) {
            if (brand == null && filter == null) {
                log.info("// Supplier null && brand null && filter null");
                products = supplierPriceItemRepository.findAll();
            } else if (brand == null) {
                log.info("// Supplier null && brand null && filter");
                products = supplierPriceItemRepository.findAllByBrandContainingOrModelContainingOrDescriptionContaining(filter);
            } else if (filter == null) {
                log.info("// Supplier null && brand && filter null");
                products = supplierPriceItemRepository.findAllByBrand(brand);
            } else {
                log.info("// Supplier null && brand && filter");
                products = supplierPriceItemRepository.findAllByBrandAndModelContainingOrDescriptionContaining(brand, filter);
            }
        }

        if (supplierId != null) {
            if (brand == null && filter == null) {
                log.info("// Supplier && brand null && filter null");
                products = supplierPriceItemRepository.findAllBySupplierId(supplierId);
            } else if (brand == null) {
                log.info("// Supplier && brand null && filter");
                products = supplierPriceItemRepository.findAllBySupplierIdAndBrandContainingOrModelContainingOrDescriptionContaining(supplierId, filter);
            } else if (filter == null) {
                log.info("// Supplier && brand && filter null");
                products = supplierPriceItemRepository.findAllBySupplierIdAndBrand(supplierId, brand);
            } else {
                log.info("// Supplier && brand && filter");
                products = supplierPriceItemRepository.findAllBySupplierIdAndBrandAndCodeContainingOrDescriptionContaining(supplierId, brand, filter);
            }
        }
        return products.stream().map(priceItemMapper::toDto).toList();
    }

    @Override
    public PriceItemResponse getById(UUID id) {

        SupplierPriceItem priceItem = supplierPriceItemRepository.findById(id)
                .orElseThrow(() -> new PriceItemNotFoundException(id));

        return priceItemMapper.toDto(priceItem);
    }

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
