package com.retailmanager.productsv.service;

import com.retailmanager.productsv.dto.ProductRequest;
import com.retailmanager.productsv.dto.ProductResponse;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    List<ProductResponse> findAll(UUID brandId, UUID categoryId, UUID supplierId, Boolean highlighted, Boolean published, String search);

    ProductResponse getById(UUID id);

    ProductResponse create(ProductRequest request);

    ProductResponse update(UUID id, ProductRequest request);

    void delete(UUID id);

    void restore(UUID id);

    long count(UUID brandId, UUID categoryId, UUID supplierId);

    boolean existsByBrand(UUID brandId);

    void removeCategory(UUID categoryId);

    void replaceCategory(UUID from, UUID uuid);
}
