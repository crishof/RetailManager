package com.retailmanager.productsv.service;

import com.retailmanager.productsv.client.InventoryServiceClient;
import com.retailmanager.productsv.client.PricingServiceClient;
import com.retailmanager.productsv.dto.*;
import com.retailmanager.productsv.exception.ResourceNotFoundException;
import com.retailmanager.productsv.model.Product;
import com.retailmanager.productsv.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductStockServiceImpl implements ProductStockService {

    private static final String PRODUCT_NOT_FOUND = "Product with id %s not found";

    private final ProductRepository productRepository;
    private final InventoryServiceClient inventoryClient;
    private final PricingServiceClient pricingClient;

    @Override
    @Transactional
    public void updateFromInvoice(InvoiceUpdateRequest request) {

        for (SupplierInvoiceItem item : request.getInvoiceItems()) {

            Product product = getProductOrThrow(item.getProductId());

            // Stock IN
            inventoryClient.registerMovement(StockMovementRequest.builder().productId(product.getId()).branchId(request.getBranchId()).locationId(request.getLocationId()).quantity(item.getQuantity()).type(StockMovementType.IN).reference("SUPPLIER_INVOICE").build());

            // Update purchase price
            pricingClient.update(product.getPriceId(), new PriceRequest(item.getPrice(), item.getTaxRate(), item.getDiscountRate(), product.getId()));
        }
    }

    @Transactional
    @Override
    public void updateFromOrder(OrderUpdateRequest request) {

        for (SupplierInvoiceItem item : request.getInvoiceItems()) {

            Product product = getProductOrThrow(item.getProductId());

            inventoryClient.registerMovement(StockMovementRequest.builder().productId(product.getId()).branchId(request.getBranchId()).locationId(request.getLocationId()).quantity(item.getQuantity()).type(StockMovementType.OUT).reference("ORDER").build());
        }
    }

    private Product getProductOrThrow(UUID id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format(PRODUCT_NOT_FOUND, id)));
    }
}