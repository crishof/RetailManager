// InvoiceClient (Feign interface)
package com.retailmanager.productsv.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "invoice-sv", url = "http://invoice-sv:8080", path = "/internal/invoices")
public interface InvoiceClient {

    @GetMapping("/product/{productId}/exists")
    boolean hasInvoicesForProduct(@PathVariable UUID productId);
}