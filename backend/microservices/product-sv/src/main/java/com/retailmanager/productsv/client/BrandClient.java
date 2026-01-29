package com.retailmanager.productsv.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@FeignClient(
        name = "brand-sv",
        url = "http://brand-sv:8080",
        path = "/internal/brands"
)
public interface BrandClient {

    @GetMapping("/getByNameOrCreate")
    UUID getIdOrCreate(@RequestParam String brandName);
}