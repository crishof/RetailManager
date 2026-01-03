package com.retailmanager.brandsv.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Slf4j
@Service
public class ProductClient {

    private static final String BASE_URL = "http://product-sv:8080/api/v1/products";

    private final WebClient webClient;

    public ProductClient(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl(BASE_URL)
                .build();
    }

    public Boolean existsProductsByBrand(UUID id) {
        return true;
    }
}
