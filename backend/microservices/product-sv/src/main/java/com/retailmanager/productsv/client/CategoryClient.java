package com.retailmanager.productsv.client;

import com.retailmanager.productsv.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Service
@Slf4j
public class CategoryClient {

    private static final String BASE_URL = "http://category-sv:8080/internal/categories";
    private final WebClient webClient;

    public CategoryClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl(BASE_URL).build();
    }

    public UUID getIdOrCreate(String categoryName) {
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                                    .path("/getByNameOrCreate")
                                    .queryParam("categoryName", categoryName)
                                    .build())
                    .retrieve().bodyToMono(UUID.class).block();

        } catch (Exception _) {
            log.error("Error calling category-sv for category {}", categoryName);
            throw new BusinessException("Failed to obtain category id");
        }
    }
}
