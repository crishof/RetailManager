package com.crishof.productsv.dto;

import java.util.UUID;

public record CategoryReplaceRequest(
        UUID from,
        UUID to
) {
}
