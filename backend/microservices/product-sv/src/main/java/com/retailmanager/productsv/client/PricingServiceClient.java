package com.retailmanager.productsv.client;

import com.retailmanager.productsv.dto.CreateSnapshotPriceRequest;
import com.retailmanager.productsv.dto.PriceRequest;
import com.retailmanager.productsv.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PricingServiceClient {

    private final PricingClient pricingClient;

    public UUID createSnapshot(UUID productId, double price, double suggestedPrice, double suggestedWebPrice, double taxRate) {
        try {
            return pricingClient.createSnapshot(CreateSnapshotPriceRequest.builder().productId(productId).purchasePrice(BigDecimal.valueOf(price)).suggestedPrice(BigDecimal.valueOf(suggestedPrice)).suggestedWebPrice(BigDecimal.valueOf(suggestedWebPrice)).taxRate(BigDecimal.valueOf(taxRate)).build());
        } catch (Exception e) {
            log.error("Error creating pricing snapshot for product {}", productId, e);
            throw new BusinessException("Failed to create pricing snapshot");
        }
    }

    public void update(UUID priceId, PriceRequest request) {
        try {
            pricingClient.update(priceId, request);
        } catch (Exception e) {
            log.error("Error updating price {}", priceId, e);
            throw new BusinessException("Failed to update price");
        }
    }
}