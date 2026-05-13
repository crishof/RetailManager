package com.crishof.brandsv.dto;

import java.util.UUID;

public record BrandMergeResponse(
        UUID sourceBrandId,
        UUID targetBrandId,
        long productsReassigned
) {
}
