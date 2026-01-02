package com.retailmanager.productsv.dto;

public record ImageResponse(
        String filename,
        String entityName,
        String url
) {
}
