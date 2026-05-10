package com.crishof.pricingsv.controller;

import com.crishof.pricingsv.dto.CreateSnapshotPriceRequest;
import com.crishof.pricingsv.dto.PriceRequest;
import com.crishof.pricingsv.dto.PriceResponse;
import com.crishof.pricingsv.dto.PurchasePriceUpdateRequest;
import com.crishof.pricingsv.service.PricingService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/internal/pricing")
@RequiredArgsConstructor
@Validated
@Hidden
public class PricingController {

    private final PricingService pricingService;

    @PostMapping
    public UUID createOrUpdatePrice(@RequestBody @Valid PriceRequest request) {
        return pricingService.createOrUpdatePrice(request);
    }

    @PostMapping("/purchase")
    public void updatePurchasePrice(@RequestBody @Valid PurchasePriceUpdateRequest request) {
        pricingService.updatePurchasePrice(request);
    }

    @GetMapping("/product/{productId}")
    public List<PriceResponse> getProductPrices(@PathVariable UUID productId) {
        return pricingService.getProductPrices(productId);
    }

    // Usado por product-sv al importar
    @PostMapping("/snapshot")
    public UUID createSnapshot(@RequestBody @Valid CreateSnapshotPriceRequest request) {

        return pricingService.createSnapshot(
                request.getProductId(),
                request.getPurchasePrice(),
                request.getSuggestedPrice(),
                request.getSuggestedWebPrice(),
                request.getTaxRate()
        );
    }
}