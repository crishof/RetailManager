package com.retailmanager.categorysv.client;

import com.retailmanager.categorysv.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.UUID;

@Slf4j
@Service
public class ProductClient {

    private static final String BASE_URL = "http://product-sv:8080/internal/products";
    private final WebClient webClient;

    public ProductClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl(BASE_URL).build();
    }

    public int clearCategory(UUID categoryId) {
        log.info("Clearing category {} from products", categoryId);

        try {
            Integer affected = webClient.patch()
                    .uri(uriBuilder -> uriBuilder.path("/category/{categoryId}/clear")
                            .build(categoryId))
                    .retrieve()
                    .onStatus(status -> status.is4xxClientError() || status.is5xxServerError()
                            , response -> response.bodyToMono(String.class)
                                    .map(body -> new BusinessException("Product service error while clearing category " + categoryId + ": " + body)))
                    .bodyToMono(Integer.class)
                    .block();

            if (affected == null) {
                throw new BusinessException("Product service returned null when clearing category " + categoryId);
            }

            log.info("Cleared category {} from {} products", categoryId, affected);
            return affected;

        } catch (WebClientResponseException e) {
            log.error("HTTP error from product-sv while clearing category {}: status={} body={}", categoryId, e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new BusinessException("Product service responded with error " + e.getStatusCode());

        } catch (Exception e) {
            log.error("Unexpected error while clearing category {} in product-sv", categoryId, e);
            throw new BusinessException("Unexpected error while clearing category " + categoryId);
        }
    }
}