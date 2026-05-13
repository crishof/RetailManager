package com.crishof.cashsv.repository;

import com.crishof.cashsv.model.CashMovement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CashMovementRepository extends JpaRepository<CashMovement, UUID> {

    List<CashMovement> findAllBySessionIdOrderByCreatedAtAsc(UUID sessionId);
}
