package com.crishof.inventorysv.service;

import com.crishof.inventorysv.dto.StockMovementRequest;
import com.crishof.inventorysv.dto.StockMovementResponse;
import com.crishof.inventorysv.model.Stock;

import java.util.List;
import java.util.UUID;

public interface StockService {

    void registerMovement(StockMovementRequest req);

    Stock createStock(StockMovementRequest req);

    List<Stock> getProductStock(UUID productId);

    List<StockMovementResponse> getMovementsByReference(UUID referenceId);
}
