package com.crishof.customersv.dto;

import java.util.UUID;

public record CustomerMergeResponse(UUID sourceCustomerId, UUID targetCustomerId, long ordersReassigned) {
}
