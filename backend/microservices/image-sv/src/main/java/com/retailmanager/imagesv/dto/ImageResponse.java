package com.retailmanager.imagesv.dto;

public record ImageResponse(
        String filename,
        String entityName,
        String url
) {
}