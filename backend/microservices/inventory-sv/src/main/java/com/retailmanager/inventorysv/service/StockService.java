package com.retailmanager.inventorysv.service;

import com.retailmanager.inventorysv.dto.StockMovementRequest;
import com.retailmanager.inventorysv.model.Stock;

import java.util.List;
import java.util.UUID;

public interface StockService {

    void registerMovement(StockMovementRequest req);

    Stock createStock(StockMovementRequest req);

    List<Stock> getProductStock(UUID productId);
}
