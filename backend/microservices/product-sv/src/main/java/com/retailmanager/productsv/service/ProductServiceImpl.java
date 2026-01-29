package com.retailmanager.productsv.service;

import com.retailmanager.productsv.client.ImageServiceClient;
import com.retailmanager.productsv.client.InventoryServiceClient;
import com.retailmanager.productsv.client.InvoiceServiceClient;
import com.retailmanager.productsv.client.OrderServiceClient;
import com.retailmanager.productsv.dto.ProductRequest;
import com.retailmanager.productsv.dto.ProductResponse;
import com.retailmanager.productsv.exception.BusinessException;
import com.retailmanager.productsv.exception.ResourceNotFoundException;
import com.retailmanager.productsv.mapper.ProductMapper;
import com.retailmanager.productsv.model.Product;
import com.retailmanager.productsv.repository.ProductRepository;
import com.retailmanager.productsv.repository.ProductSpecifications;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private static final String PRODUCT_NOT_FOUND = "Product with id %s not found";
    private static final String ENTITY_NAME = "products";
    private static final String DELETING = "Deleting product | id={}";
    private static final String DELETED = "Product deleted successfully | id={}";

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ImageServiceClient imageClient;
    private final OrderServiceClient orderClient;
    private final InvoiceServiceClient invoiceClient;
    private final InventoryServiceClient inventoryClient;

    @Override
    public Page<ProductResponse> findAll(UUID brandId, UUID categoryId, UUID supplierId, Boolean highlighted, Boolean published, String search, Pageable pageable) {
        Specification<Product> spec = ProductSpecifications.filter(brandId, categoryId, supplierId, highlighted, published, search);

        return productRepository.findAll(spec, pageable).map(productMapper::toResponse);
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
    public void forceDelete(UUID id) {

        deleteLog(DELETING, id);

        Product product = getProductOrThrow(id);

        // Validate stock movements
        boolean hasStockMovements = inventoryClient.hasMovementsForProduct(id);
        if (hasStockMovements) {
            throw new BusinessException("Cannot delete product with stock movements");
        }

        // Commercial validations
        if (orderClient.hasOrdersForProduct(id) || invoiceClient.hasInvoicesForProduct(id)) {
            throw new BusinessException("Cannot delete product with orders or invoices");
        }

        // Delete associated images
        if (!product.getImageUrls().isEmpty()) {
            product.getImageUrls().forEach(this::deleteProductImage);
        }

        // Delete product
        int deleted = productRepository.forceDelete(id);

        if (deleted > 0) {
            deleteLog(DELETED, id);
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Override
    public void deleteProductImage(String imageUrl) {
        try {
            imageClient.deleteImageByUrl(imageUrl, ENTITY_NAME);
        } catch (Exception ex) {
            log.warn("Failed to delete image {}. Reason: {}", imageUrl, ex.getMessage());
        }
    }

    @Transactional
    @Override
    public ProductResponse restore(UUID id) {
        log.info("Restoring product id={}", id);
        productRepository.findByIdIncludingDeleted(id).orElseThrow(EntityNotFoundException::new);

        if (!productRepository.existsDeletedById(id)) {
            throw new BusinessException("Product with id " + id + " is not deleted");
        }
        int updated = productRepository.restoreById(id);

        if (updated == 0) {
            throw new BusinessException("Failed to restore product with id " + id);
        }
        log.info("Product restored successfully");

        Product restored = productRepository.findById(id).orElseThrow(() -> new IllegalStateException("Product restored by not found"));

        return productMapper.toResponse(restored);

    }

    @Override
    @Transactional(readOnly = true)
    public long count(UUID brandId, UUID categoryId, UUID supplierId) {
        return productRepository.count();
    }

    @Override
    public boolean hasProductsForBrand(UUID brandId) {
        List<Product> products = productRepository.findAllByBrandId(brandId);
        return !products.isEmpty();
    }


    private Product getProductOrThrow(UUID id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format(PRODUCT_NOT_FOUND, id)));
    }

    @Transactional
    public void removeCategory(UUID categoryId) {
        int updated = productRepository.clearCategory(categoryId);
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

    @Override
    public int replaceBrand(UUID brandId, UUID newBrandId) {
        int updated = productRepository.replaceBrand(brandId, newBrandId);

        if (updated == 0) {
            throw new EntityNotFoundException("No products found for brand " + brandId);
        }
        return updated;
    }

    @Transactional
    @Override
    public int clearCategory(UUID categoryId) {
        return productRepository.clearCategory(categoryId);
    }


    private void deleteLog(String status, UUID id) {

        if (DELETING.equals(status)) {
            log.info(DELETING, id);
        } else {
            log.info(DELETED, id);
        }
    }

    @Override
    public Boolean existBySupplier(@NotNull UUID id) {
        return productRepository.existsBySupplierIdIncludingDeleted(id);
    }

    @Override
    public boolean existsBySupplier(UUID supplierId, UUID productId) {
        return productRepository.existBySupplier(supplierId, productId);
    }

    @Transactional
    public void attachPrice(UUID productId, UUID priceId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setPriceId(priceId);
        productRepository.save(product);
    }

}

