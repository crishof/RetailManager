package com.retailmanager.productsv.client;

import com.retailmanager.productsv.dto.StockMovementRequest;
import com.retailmanager.productsv.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class InventoryServiceClient {

    private final InventoryClient inventoryClient;

    public boolean hasMovementsForProduct(UUID productId) {
        try {
            return inventoryClient.hasMovementsForProduct(productId);
        } catch (Exception e) {
            log.error("Error calling inventory-sv for product {}", productId, e);
            throw new BusinessException("Failed to verify inventory movements for product");
        }
    }

    public void registerMovement(StockMovementRequest request) {
        try {
            inventoryClient.registerMovement(request);
        } catch (Exception e) {
            log.error("Error registering stock movement {}", request, e);
            throw new BusinessException("Failed to register stock movement");
        }
    }
}