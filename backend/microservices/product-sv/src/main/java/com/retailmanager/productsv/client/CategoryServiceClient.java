package com.retailmanager.productsv.client;

import com.retailmanager.productsv.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryServiceClient {

    private final CategoryClient categoryClient;

    public UUID getIdOrCreate(String categoryName) {
        try {
            return categoryClient.getIdOrCreate(categoryName);
        } catch (Exception e) {
            log.error("Error calling category-sv for category={}", categoryName, e);
            throw new BusinessException("Failed to obtain category id");
        }
    }
}