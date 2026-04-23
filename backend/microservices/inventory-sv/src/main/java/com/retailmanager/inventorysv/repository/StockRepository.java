package com.retailmanager.inventorysv.repository;

import com.retailmanager.inventorysv.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StockRepository extends JpaRepository<Stock, UUID> {

    Optional<Stock> findByProductIdAndBranchIdAndLocationId(UUID productId, UUID branchId, UUID locationId);

    List<Stock> findByProductId(UUID productId);
}