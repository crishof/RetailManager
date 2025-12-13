package com.retailmanager.brandsv.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CategoryClient {

    private final WebClient webClient;

    public CategoryClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public String getCategoryStatus() {
        return webClient.get()
                .uri("http://category-sv:8080/api/categories/status")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
