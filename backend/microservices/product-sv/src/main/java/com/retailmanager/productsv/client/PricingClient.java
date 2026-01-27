package com.retailmanager.productsv.client;

import com.retailmanager.productsv.dto.CreateSnapshotPriceRequest;
import com.retailmanager.productsv.dto.PriceRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@Slf4j
public class PricingClient {

    private static final String BASE_URL = "http://pricing-sv:8080/internal/pricing";
    private final WebClient webClient;

    public PricingClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl(BASE_URL).build();
    }

    public UUID createSnapshot(UUID productId, double price, double suggestedPrice, double suggestedWebPrice, double taxRate) {
        return webClient.post()
                .uri("/snapshot")
                .bodyValue(CreateSnapshotPriceRequest.builder()
                        .productId(productId)
                        .purchasePrice(BigDecimal.valueOf(price))
                        .suggestedPrice(BigDecimal.valueOf(suggestedPrice))
                        .suggestedWebPrice(BigDecimal.valueOf(suggestedWebPrice))
                        .taxRate(BigDecimal.valueOf(taxRate))
                        .build())
                .retrieve()
                .bodyToMono(UUID.class)
                .block();
    }

    public void update(UUID priceId, PriceRequest request) {
        //TODO Implement method
    }
}