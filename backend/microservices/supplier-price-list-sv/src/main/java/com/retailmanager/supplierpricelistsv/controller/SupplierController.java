package com.retailmanager.supplierpricelistsv.controller;


import com.retailmanager.supplierpricelistsv.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/supplierPriceList")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService priceItemService;

    @GetMapping("/getBrandsBySupplier")
    public List<String> getBrandsBySupplier(@RequestParam UUID supplierId) {
        return priceItemService.getBrandsBySupplier(supplierId);
    }

    @GetMapping("/getAllBrands")
    public List<String> getAllBrands() {
        return priceItemService.getAllBrands();
    }
}
