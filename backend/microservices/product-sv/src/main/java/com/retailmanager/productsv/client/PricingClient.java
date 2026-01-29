// PricingClient (Feign interface)
package com.retailmanager.productsv.client;

import com.retailmanager.productsv.dto.CreateSnapshotPriceRequest;
import com.retailmanager.productsv.dto.PriceRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;

@FeignClient(name = "pricing-sv", url = "http://pricing-sv:8080", path = "/internal/pricing")
public interface PricingClient {

    @PostMapping("/snapshot")
    UUID createSnapshot(@RequestBody CreateSnapshotPriceRequest request);

    @PutMapping("/{priceId}")
    void update(@PathVariable UUID priceId, @RequestBody PriceRequest request);
}