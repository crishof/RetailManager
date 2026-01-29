package com.retailmanager.inventorysv.dto;

import com.retailmanager.inventorysv.model.StockMovementReason;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockMovementRequest {

    private UUID productId;

    private UUID branchId;

    private UUID locationId;

    private int quantity; // + o -

    private StockMovementReason reason;

    private UUID referenceId; // invoiceId, orderId, transferId
}