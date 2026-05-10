package com.crishof.cashsv.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CashMovementRequest {
    private UUID sessionId;
    private UUID branchId;
    private String type;
    private double amount;
    private String description;
    private String reference;
}
