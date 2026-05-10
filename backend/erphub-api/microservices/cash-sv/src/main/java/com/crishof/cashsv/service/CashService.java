package com.crishof.cashsv.service;

import com.crishof.cashsv.dto.*;

import java.util.List;
import java.util.UUID;

public interface CashService {

    CashSessionResponse openSession(OpenSessionRequest request);

    CashSessionResponse closeSession(UUID sessionId, CloseSessionRequest request);

    CashSessionResponse getCurrentSession(UUID branchId);

    List<CashSessionResponse> getAllSessions(UUID branchId);

    CashSessionResponse getSessionById(UUID sessionId);

    CashMovementResponse addMovement(UUID sessionId, CashMovementRequest request);

    List<CashMovementResponse> getMovements(UUID sessionId);
}
