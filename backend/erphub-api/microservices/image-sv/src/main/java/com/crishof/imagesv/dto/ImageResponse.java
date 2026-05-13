package com.crishof.imagesv.dto;

public record ImageResponse(
        String filename,
        String entityName,
        String url
) {
}