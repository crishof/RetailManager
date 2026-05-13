package com.crishof.pricingsv.service;

import com.crishof.pricingsv.dto.PriceRequest;
import com.crishof.pricingsv.dto.PriceResponse;
import com.crishof.pricingsv.dto.PurchasePriceUpdateRequest;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface PricingService {

    UUID createOrUpdatePrice(PriceRequest request);

    void updatePurchasePrice(PurchasePriceUpdateRequest request);

    List<PriceResponse> getProductPrices(UUID productId);

    UUID createSnapshot(
            UUID productId,
            BigDecimal purchasePrice,
            BigDecimal suggestedPrice,
            BigDecimal suggestedWebPrice,
            BigDecimal taxRate
    );
}