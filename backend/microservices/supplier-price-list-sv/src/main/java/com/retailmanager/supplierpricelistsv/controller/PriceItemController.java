package com.retailmanager.supplierpricelistsv.controller;

import com.retailmanager.supplierpricelistsv.dto.ImportResult;
import com.retailmanager.supplierpricelistsv.dto.PriceItemResponse;
import com.retailmanager.supplierpricelistsv.service.PriceItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/price-items")
@RequiredArgsConstructor
public class PriceItemController {

    private final PriceItemService priceItemService;

    // Import price list
    @PostMapping("/import")
    public ImportResult importPriceList(
            @RequestParam MultipartFile file,
            @RequestParam UUID supplierId,
            @RequestParam(defaultValue = "false") boolean updateExisting
    ) {
        return priceItemService.importFile(file, supplierId, updateExisting);
    }

    // Query price items
    @GetMapping
    public List<PriceItemResponse> findAll(
            @RequestParam(required = false) UUID supplierId,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String filter
    ) {
        return priceItemService.getAllByFilter(supplierId, brand, filter);
    }

    // Get by ID
    @GetMapping("/{id}")
    public PriceItemResponse findById(@PathVariable UUID id) {
        return priceItemService.getById(id);
    }

    // Distinct brands by supplier
    @GetMapping("/brands")
    public List<String> getBrands(
            @RequestParam(required = false) UUID supplierId
    ) {
        return supplierId == null
                ? priceItemService.getAllBrands()
                : priceItemService.getBrandsBySupplier(supplierId);
    }
}