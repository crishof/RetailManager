package com.retailmanager.suppliercatalogsv.controller;

import com.retailmanager.suppliercatalogsv.dto.ImportResult;
import com.retailmanager.suppliercatalogsv.dto.PriceItemResponse;
import com.retailmanager.suppliercatalogsv.service.PriceItemService;
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

    // ============================
    // IMPORT PRICE ITEMS
    // ============================
    @PostMapping("/import")
    public ImportResult importPriceItems(
            @RequestParam MultipartFile file,
            @RequestParam UUID supplierId,
            @RequestParam(defaultValue = "false") boolean updateExisting
    ) {
        return priceItemService.importFile(file, supplierId, updateExisting);
    }

    // ============================
    // SEARCH FILTERED ITEMS
    // ============================
    @GetMapping
    public List<PriceItemResponse> findAll(
            @RequestParam(required = false) UUID supplierId,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String filter
    ) {
        return priceItemService.getAllByFilter(supplierId, brand, filter);
    }

    // ============================
    // GET ITEM BY ID
    // ============================
    @GetMapping("/{id}")
    public PriceItemResponse findById(@PathVariable UUID id) {
        return priceItemService.getById(id);
    }

    // ============================
    // GET BRANDS BY SUPPLIER
    // ============================
    @GetMapping("/brands")
    public List<String> getBrands(
            @RequestParam(required = false) UUID supplierId
    ) {
        return supplierId == null
                ? priceItemService.getAllBrands()
                : priceItemService.getBrandsBySupplier(supplierId);
    }
}