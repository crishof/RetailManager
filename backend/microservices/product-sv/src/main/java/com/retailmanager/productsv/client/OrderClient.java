// OrderClient (Feign interface)
package com.retailmanager.productsv.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "order-sv", url = "http://order-sv:8080", path = "/internal/orders")
public interface OrderClient {

    @GetMapping("/product/{productId}/exists")
    boolean hasOrdersForProduct(@PathVariable UUID productId);
}