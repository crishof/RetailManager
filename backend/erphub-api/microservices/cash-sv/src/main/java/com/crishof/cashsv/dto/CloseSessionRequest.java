package com.crishof.cashsv.dto;

import lombok.Data;

@Data
public class CloseSessionRequest {
    private double closingBalance;
    private String notes;
}
