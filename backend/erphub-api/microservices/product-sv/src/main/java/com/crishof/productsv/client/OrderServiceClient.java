package com.crishof.productsv.client;

import com.crishof.productsv.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceClient {

    private final OrderClient orderClient;

    public boolean hasOrdersForProduct(UUID productId) {
        try {
            return orderClient.hasOrdersForProduct(productId);
        } catch (Exception e) {
            log.error("Error calling order-sv for product {}", productId, e);
            throw new BusinessException("Failed to verify orders for product");
        }
    }
}