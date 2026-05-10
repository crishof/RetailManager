package com.crishof.brandsv.service;

import com.crishof.brandsv.client.ImageServiceClient;
import com.crishof.brandsv.client.ProductServiceClient;
import com.crishof.brandsv.exception.BusinessException;
import com.crishof.brandsv.exception.ResourceNotFoundException;
import com.crishof.brandsv.model.Brand;
import com.crishof.brandsv.repository.BrandRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandDeletionService {

    private static final String ENTITY_NAME = "brands";
    private final BrandRepository brandRepository;
    private final ImageServiceClient imageClient;
    private final ProductServiceClient productClient;

    @Transactional
    public void forceDelete(UUID id) {

        log.info("Force deleting brand | id={}", id);

        Brand brand = brandRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Brand with id %s not found".formatted(id)));

        boolean hasProducts = productClient.hasProductsForBrand(id);
        if (hasProducts) {
            throw new BusinessException("Cannot delete brand because it is used by products");
        }

        if (brand.getLogoUrl() != null) {
            imageClient.deleteImageByUrl(brand.getLogoUrl(), ENTITY_NAME);
        }

        brandRepository.forceDelete(id);

        log.info("Brand force deleted | id={}", id);
    }
}
