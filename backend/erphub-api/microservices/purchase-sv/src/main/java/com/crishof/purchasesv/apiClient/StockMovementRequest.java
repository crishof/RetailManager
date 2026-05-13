package com.crishof.purchasesv.apiClient;

import com.crishof.purchasesv.model.StockMovementReason;
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
    private int quantity;
    private StockMovementReason reason;
    private UUID referenceId;
}
