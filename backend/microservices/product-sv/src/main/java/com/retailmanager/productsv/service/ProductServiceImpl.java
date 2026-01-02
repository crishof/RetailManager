package com.retailmanager.productsv.service;

import com.retailmanager.productsv.client.ImageClient;
import com.retailmanager.productsv.dto.ProductRequest;
import com.retailmanager.productsv.dto.ProductResponse;
import com.retailmanager.productsv.exception.ResourceNotFoundException;
import com.retailmanager.productsv.mapper.ProductMapper;
import com.retailmanager.productsv.model.Product;
import com.retailmanager.productsv.repository.ProductRepository;
import com.retailmanager.productsv.repository.ProductSpecifications;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private static final String PRODUCT_NOT_FOUND = "Product with id %s not found";
    private static final String ENTITY_NAME = "products";

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ImageClient imageClient;

    @Override
    public List<ProductResponse> findAll(
            UUID brandId,
            UUID categoryId,
            UUID supplierId,
            Boolean highlighted,
            Boolean published,
            String search
    ) {
        Specification<Product> spec = ProductSpecifications.filter(
                brandId, categoryId, supplierId, highlighted, published, search
        );

        return productRepository.findAll(spec)
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getById(UUID id) {
        return productMapper.toResponse(getProductOrThrow(id));
    }

    @Override
    @Transactional
    public ProductResponse create(ProductRequest productRequest) {
        Product product = productMapper.toEntity(productRequest);
        //TODO get brand id
        //TODO get category id
        //TODO get supplier id
        Product savedProduct = productRepository.save(product);
        return productMapper.toResponse(savedProduct);
    }

    @Override
    @Transactional
    public ProductResponse update(UUID id, ProductRequest productRequest) {
        Product existingProduct = getProductOrThrow(id);
        productMapper.updateEntityFromRequest(productRequest, existingProduct);
        Product updatedProduct = productRepository.save(existingProduct);
        return productMapper.toResponse(updatedProduct);
    }

    @Transactional
    @Override
    public void delete(UUID id) {
        Product existingProduct = getProductOrThrow(id);
        productRepository.delete(existingProduct);
    }

    @Transactional
    @Override
    public void restore(UUID id) {
        //TODO implement method
    }

    @Override
    @Transactional(readOnly = true)
    public long count(UUID brandId, UUID categoryId, UUID supplierId) {
        return productRepository.count();
    }

    @Override
    public boolean existsByBrand(UUID brandId) {
        List<Product> products = productRepository.findAllByBrandId(brandId);
        return !products.isEmpty();
    }


    private Product getProductOrThrow(UUID id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                                String.format(PRODUCT_NOT_FOUND, id)
                        )
                );
    }

    @Transactional
    public void removeCategory(UUID categoryId) {
        int updated = productRepository.clearCategoryFromProducts(categoryId);
        if (updated == 0) {
            throw new EntityNotFoundException("No products found for category " + categoryId);
        }
    }

    @Transactional
    public void replaceCategory(UUID from, UUID to) {
        int updated = productRepository.replaceCategory(from, to);

        if (updated == 0) {
            throw new EntityNotFoundException("No products found for category " + from);
        }
    }
}

