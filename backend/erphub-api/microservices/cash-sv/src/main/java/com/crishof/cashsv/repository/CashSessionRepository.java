package com.crishof.cashsv.repository;

import com.crishof.cashsv.model.CashSession;
import com.crishof.cashsv.model.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CashSessionRepository extends JpaRepository<CashSession, UUID> {

    Optional<CashSession> findFirstByBranchIdAndStatusOrderByOpenedAtDesc(UUID branchId, SessionStatus status);

    List<CashSession> findAllByBranchIdOrderByOpenedAtDesc(UUID branchId);
}
