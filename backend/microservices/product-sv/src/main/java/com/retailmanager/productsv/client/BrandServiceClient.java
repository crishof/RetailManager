package com.retailmanager.productsv.client;


import com.retailmanager.productsv.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class BrandServiceClient {

    private final BrandClient brandClient;

    public UUID getIdOrCreate(String brandName) {
        try {
            return brandClient.getIdOrCreate(brandName);
        } catch (Exception e) {
            log.error("Error calling brand-sv for brand={}", brandName, e);
            throw new BusinessException("Failed to obtain brand id");
        }
    }
}