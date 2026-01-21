package com.retailmanager.brandsv.client;

import com.retailmanager.brandsv.dto.ReassignBrandResponse;
import com.retailmanager.brandsv.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Slf4j
@Service
public class ProductClient {

    //TODO connect to internal endpoints

    private static final String BASE_URL = "http://product-sv:8080/api/v1/products";

    private final WebClient webClient;

    public ProductClient(WebClient.Builder builder) {

        this.webClient = builder.baseUrl(BASE_URL).build();
    }

    public boolean hasProductsForBrand(UUID brandId) {
        try {
            return Boolean.TRUE.equals(webClient.get().uri("/brand/{brandId}/exists", brandId).retrieve().bodyToMono(Boolean.class).block());
        } catch (Exception e) {
            log.error("Error calling product-sv for brand {}", brandId, e);
            throw new BusinessException("Failed to verify if brand has products");
        }
    }

    public ReassignBrandResponse replaceBrand(UUID brandId, UUID newBrandId) {
        try {
            log.info("Calling product-sv to replace brand {} with {}", brandId, newBrandId);

            return webClient.patch().uri(uriBuilder -> uriBuilder.path("/brand").queryParam("brandId", brandId).queryParam("newBrandId", newBrandId).build()).retrieve().bodyToMono(ReassignBrandResponse.class).block();

        } catch (Exception e) {
            log.error("Failed to replace brand in product-sv", e);
            throw new BusinessException("Failed to reassign products to target brand");
        }
    }
}
