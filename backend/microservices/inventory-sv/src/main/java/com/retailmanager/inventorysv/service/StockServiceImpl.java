package com.retailmanager.inventorysv.service;

import com.retailmanager.inventorysv.dto.StockMovementRequest;
import com.retailmanager.inventorysv.exception.BusinessException;
import com.retailmanager.inventorysv.model.Stock;
import com.retailmanager.inventorysv.model.StockMovement;
import com.retailmanager.inventorysv.repository.StockMovementRepository;
import com.retailmanager.inventorysv.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;
    private final StockMovementRepository movementRepository;

    @Override
    @Transactional
    public void registerMovement(StockMovementRequest req) {

        log.info("Registering stock movement | product={} qty={} reason={}", req.getProductId(), req.getQuantity(), req.getReason());

        Stock stock = stockRepository.findByProductIdAndBranchIdAndLocationId(req.getProductId(), req.getBranchId(), req.getLocationId()).orElseGet(() -> createStock(req));

        int newQty = stock.getQuantity() + req.getQuantity();
        if (newQty < 0) {
            throw new BusinessException("Insufficient stock");
        }

        stock.applyMovement(req.getQuantity());
        stockRepository.save(stock);

        StockMovement movement = StockMovement.builder().stockId(stock.getId()).productId(req.getProductId()).branchId(req.getBranchId()).locationId(req.getLocationId()).quantity(req.getQuantity()).reason(req.getReason()).createdAt(Instant.now()).build();

        movementRepository.save(movement);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Stock> getProductStock(UUID productId) {
        return stockRepository.findByProductId(productId);
    }

    @Transactional
    public Stock createStock(StockMovementRequest req) {
        return stockRepository.save(Stock.builder().productId(req.getProductId()).branchId(req.getBranchId()).locationId(req.getLocationId()).quantity(0).updatedAt(Instant.now()).build());
    }
}

