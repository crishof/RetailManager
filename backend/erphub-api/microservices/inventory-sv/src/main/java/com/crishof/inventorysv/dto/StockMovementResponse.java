package com.crishof.inventorysv.dto;

import com.crishof.inventorysv.model.StockMovementReason;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockMovementResponse {

    private UUID id;
    private UUID productId;
    private UUID branchId;
    private UUID locationId;
    private int quantity;
    private StockMovementReason reason;
    private UUID referenceId;
    private Instant createdAt;
}
