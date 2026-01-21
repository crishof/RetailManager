package com.retailmanager.customersv.dto;

import java.util.UUID;

public record CustomerMergeResponse(
        UUID sourceCustomerId,
        UUID targetCustomerId,
        long ordersReassigned) {
}
