package com.retailmanager.productsv.service;

import com.retailmanager.productsv.dto.ProductRequest;
import com.retailmanager.productsv.dto.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface ProductService {

    Page<ProductResponse> findAll(UUID brandId, UUID categoryId, UUID supplierId, Boolean highlighted, Boolean published, String search, Pageable pageable);

    ProductResponse getById(UUID id);

    ProductResponse create(ProductRequest request);

    ProductResponse update(UUID id, ProductRequest request);

    void delete(UUID id);

    void restore(UUID id);

    long count(UUID brandId, UUID categoryId, UUID supplierId);

    boolean hasProductsForBrand(UUID brandId);

    void removeCategory(UUID categoryId);

    void replaceCategory(UUID from, UUID uuid);

    int replaceBrand(UUID brandId, UUID newBrandId);

    @Transactional
    int clearCategory(UUID categoryId);
}
