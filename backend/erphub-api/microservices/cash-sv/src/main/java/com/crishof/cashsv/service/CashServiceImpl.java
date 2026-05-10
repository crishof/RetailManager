package com.crishof.cashsv.service;

import com.crishof.cashsv.dto.*;
import com.crishof.cashsv.model.*;
import com.crishof.cashsv.repository.CashMovementRepository;
import com.crishof.cashsv.repository.CashSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CashServiceImpl implements CashService {

    private final CashSessionRepository sessionRepository;
    private final CashMovementRepository movementRepository;

    @Override
    public CashSessionResponse openSession(OpenSessionRequest request) {
        CashSession session = CashSession.builder()
                .branchId(request.getBranchId())
                .userId(request.getUserId())
                .sessionDate(LocalDate.now())
                .openedAt(LocalDateTime.now())
                .openingBalance(request.getOpeningBalance())
                .closingBalance(0)
                .status(SessionStatus.OPEN)
                .notes(request.getNotes())
                .build();

        session = sessionRepository.save(session);

        // Opening movement
        CashMovement openingMovement = CashMovement.builder()
                .sessionId(session.getId())
                .branchId(request.getBranchId())
                .type(MovementType.OPENING)
                .amount(request.getOpeningBalance())
                .description("Apertura de caja")
                .createdAt(LocalDateTime.now())
                .build();
        movementRepository.save(openingMovement);

        return toSessionResponse(session);
    }

    @Override
    public CashSessionResponse closeSession(UUID sessionId, CloseSessionRequest request) {
        CashSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new NoSuchElementException("Sesión no encontrada: " + sessionId));

        session.setClosedAt(LocalDateTime.now());
        session.setClosingBalance(request.getClosingBalance());
        session.setStatus(SessionStatus.CLOSED);
        if (request.getNotes() != null && !request.getNotes().isBlank()) {
            session.setNotes(request.getNotes());
        }

        session = sessionRepository.save(session);

        // Closing movement
        CashMovement closingMovement = CashMovement.builder()
                .sessionId(session.getId())
                .branchId(session.getBranchId())
                .type(MovementType.CLOSING)
                .amount(request.getClosingBalance())
                .description("Cierre de caja")
                .createdAt(LocalDateTime.now())
                .build();
        movementRepository.save(closingMovement);

        return toSessionResponse(session);
    }

    @Override
    public CashSessionResponse getCurrentSession(UUID branchId) {
        CashSession session = sessionRepository
                .findFirstByBranchIdAndStatusOrderByOpenedAtDesc(branchId, SessionStatus.OPEN)
                .orElseThrow(() -> new NoSuchElementException("No hay sesión abierta para la sucursal: " + branchId));
        return toSessionResponse(session);
    }

    @Override
    public List<CashSessionResponse> getAllSessions(UUID branchId) {
        return sessionRepository.findAllByBranchIdOrderByOpenedAtDesc(branchId)
                .stream()
                .map(this::toSessionResponse)
                .toList();
    }

    @Override
    public CashSessionResponse getSessionById(UUID sessionId) {
        CashSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new NoSuchElementException("Sesión no encontrada: " + sessionId));
        return toSessionResponse(session);
    }

    @Override
    public CashMovementResponse addMovement(UUID sessionId, CashMovementRequest request) {
        CashSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new NoSuchElementException("Sesión no encontrada: " + sessionId));

        if (session.getStatus() == SessionStatus.CLOSED) {
            throw new IllegalStateException("No se puede agregar movimientos a una sesión cerrada");
        }

        CashMovement movement = CashMovement.builder()
                .sessionId(sessionId)
                .branchId(session.getBranchId())
                .type(MovementType.valueOf(request.getType()))
                .amount(request.getAmount())
                .description(request.getDescription())
                .reference(request.getReference())
                .createdAt(LocalDateTime.now())
                .build();

        movement = movementRepository.save(movement);
        return toMovementResponse(movement);
    }

    @Override
    public List<CashMovementResponse> getMovements(UUID sessionId) {
        return movementRepository.findAllBySessionIdOrderByCreatedAtAsc(sessionId)
                .stream()
                .map(this::toMovementResponse)
                .toList();
    }

    // ---- Mappers ----

    private CashSessionResponse toSessionResponse(CashSession session) {
        List<CashMovement> movements = movementRepository.findAllBySessionIdOrderByCreatedAtAsc(session.getId());

        double totalIncome = movements.stream()
                .filter(m -> m.getType() == MovementType.INCOME
                        || m.getType() == MovementType.SALE
                        || m.getType() == MovementType.CUSTOMER_PAYMENT)
                .mapToDouble(CashMovement::getAmount)
                .sum();

        double totalExpense = movements.stream()
                .filter(m -> m.getType() == MovementType.EXPENSE
                        || m.getType() == MovementType.SUPPLIER_PAYMENT)
                .mapToDouble(CashMovement::getAmount)
                .sum();

        double expectedBalance = session.getOpeningBalance() + totalIncome - totalExpense;

        return CashSessionResponse.builder()
                .id(session.getId())
                .branchId(session.getBranchId())
                .userId(session.getUserId())
                .sessionDate(session.getSessionDate())
                .openedAt(session.getOpenedAt())
                .closedAt(session.getClosedAt())
                .openingBalance(session.getOpeningBalance())
                .closingBalance(session.getClosingBalance())
                .status(session.getStatus())
                .notes(session.getNotes())
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .expectedBalance(expectedBalance)
                .build();
    }

    private CashMovementResponse toMovementResponse(CashMovement m) {
        return CashMovementResponse.builder()
                .id(m.getId())
                .sessionId(m.getSessionId())
                .type(m.getType())
                .amount(m.getAmount())
                .description(m.getDescription())
                .reference(m.getReference())
                .createdAt(m.getCreatedAt())
                .build();
    }
}
