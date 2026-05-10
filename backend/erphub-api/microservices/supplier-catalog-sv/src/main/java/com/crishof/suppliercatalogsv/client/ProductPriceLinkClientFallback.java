package com.crishof.suppliercatalogsv.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@Slf4j
public class ProductPriceLinkClientFallback implements ProductPriceLinkClient {

    @Override
    public void notifyPriceUpdate(PriceUpdateRequest request) {
        log.warn("product-sv unavailable — price update notification skipped | supplierProductId={}", request.supplierProductId());
    }
}
