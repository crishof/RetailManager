package com.retailmanager.productsv.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@FeignClient(name = "category-sv", url = "http://category-sv:8080", path = "/internal/categories")
public interface CategoryClient {

    @GetMapping("/getByNameOrCreate")
    UUID getIdOrCreate(@RequestParam String categoryName);
}