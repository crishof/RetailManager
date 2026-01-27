package com.retailmanager.productsv.client;

import com.retailmanager.productsv.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Service
@Slf4j
public class BrandClient {

    private static final String BASE_URL = "http://brand-sv:8080/internal/brands";
    private final WebClient webClient;

    public BrandClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl(BASE_URL).build();
    }

    public UUID getIdOrCreate(String brandName) {
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/getByNameOrCreate")
                            .queryParam("brandName", brandName)
                            .build())
                    .retrieve()
                    .bodyToMono(UUID.class)
                    .block();

        } catch (Exception _) {
            log.error("Error calling brand-sv for brand {}", brandName);
            throw new BusinessException("Failed to obtain brand id");
        }
    }


}
