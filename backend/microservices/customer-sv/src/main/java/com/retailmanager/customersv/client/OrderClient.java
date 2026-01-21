package com.retailmanager.customersv.client;

import com.retailmanager.customersv.dto.ReassignCustomerResponse;
import com.retailmanager.customersv.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Slf4j
@Service
public class OrderClient {

    private static final String BASE_URL = "http://order-sv:8080/api/v1/products";

    private final WebClient webClient;

    public OrderClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl(BASE_URL).build();
    }

    public boolean hasOrdersForCustomer(UUID customerId) {
        try {
            return Boolean.TRUE.equals(webClient.get().uri("/customer/{customerId}/exists", customerId).retrieve().bodyToMono(Boolean.class).block());
        } catch (Exception e) {
            log.error("Error while calling orders-sv for customer id={}", customerId, e);
            throw new BusinessException("Failed to verify if customer has orders");
        }
    }

    public ReassignCustomerResponse replaceCustomer(UUID sourceCustomerId, UUID targetCustomerId) {

        try {
            log.info("Calling order-sv to replace customer {} with {}", sourceCustomerId, targetCustomerId);

            return webClient.patch().uri(uriBuilder -> uriBuilder.path("/customer").queryParam("customerId", sourceCustomerId).queryParam("targetCustomerId", targetCustomerId).build()).retrieve().bodyToMono(ReassignCustomerResponse.class).block();

        } catch (Exception e) {
            log.error("Failed to replace customer in order-sv", e);
            throw new BusinessException("Failed to reassign orders to target customer");
        }
    }
}
