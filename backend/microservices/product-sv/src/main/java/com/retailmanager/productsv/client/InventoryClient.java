package com.retailmanager.productsv.client;

import com.retailmanager.productsv.dto.StockMovementRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;

@Service
@Slf4j
public class InventoryClient {
    public boolean hasMovementsForProduct(UUID id) {
        //TODO implement method
        return false;
    }

    public void registerMovement(@RequestBody StockMovementRequest request) {
        //TODO implement method
    }
}
