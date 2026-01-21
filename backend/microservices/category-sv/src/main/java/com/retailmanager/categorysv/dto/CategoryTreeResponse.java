package com.retailmanager.categorysv.dto;

import java.util.List;
import java.util.UUID;

public record CategoryTreeResponse(
        UUID id,
        String name,
        String logoUrl,
        List<CategoryTreeResponse> children
) {
}