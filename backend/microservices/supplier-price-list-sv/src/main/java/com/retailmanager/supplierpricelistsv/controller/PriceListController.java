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
public class PriceListController {

    private final PriceItemService priceItemService;

    @PostMapping("/import")
    public ImportResult importPriceList(
            @RequestParam MultipartFile file,
            @RequestParam UUID supplierId,
            @RequestParam boolean updateExisting
    ) {
        return priceItemService.importFile(file, supplierId, updateExisting);
    }

    @GetMapping("/getAllByFilter")
    public List<PriceItemResponse> getAllByFilter(
            @RequestParam(required = false) UUID supplierId,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String filter) {

        return priceItemService.getAllByFilter(supplierId, brand, filter);
    }

    @GetMapping("/{id}")
    public PriceItemResponse getById(@PathVariable UUID id) {
        return priceItemService.getById(id);
    }

    @GetMapping("/getBrandsBySupplier")
    public List<String> getBrandsBySupplier(@RequestParam UUID supplierId) {
        return priceItemService.getBrandsBySupplier(supplierId);
    }

    @GetMapping("/getAllBrands")
    public List<String> getAllBrands() {
        return priceItemService.getAllBrands();
    }
}
