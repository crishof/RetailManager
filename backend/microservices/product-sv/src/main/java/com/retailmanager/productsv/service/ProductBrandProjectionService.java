package com.retailmanager.productsv.service;

import com.retailmanager.productsv.messagging.event.BrandUpdatedEvent;
import com.retailmanager.productsv.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductBrandProjectionService {

    private final ProductRepository productRepository;

    @Transactional
    public void handleBrandUpdated(BrandUpdatedEvent event) {
        log.info("Received BrandUpdatedEvent: {}", event);
        if (event.deleted()) {
            productRepository.clearBrandFromProducts(event.brandId());
        } else {
            productRepository.updateBrandName(event.brandId(), event.name());
        }
    }
}