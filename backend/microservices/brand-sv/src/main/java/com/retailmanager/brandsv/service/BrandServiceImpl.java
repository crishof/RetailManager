package com.retailmanager.brandsv.service;

import com.retailmanager.brandsv.client.ImageClient;
import com.retailmanager.brandsv.client.ProductClient;
import com.retailmanager.brandsv.dto.BrandResponse;
import com.retailmanager.brandsv.exception.BusinessException;
import com.retailmanager.brandsv.exception.ResourceNotFoundException;
import com.retailmanager.brandsv.mapper.BrandMapper;
import com.retailmanager.brandsv.model.Brand;
import com.retailmanager.brandsv.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandServiceImpl implements BrandService {

    private static final String BRAND_NOT_FOUND = "Brand with id %s not found";
    private static final String ENTITY_NAME = "brands";

    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;
    private final ImageClient imageClient;
    private final ProductClient productClient;

    @Override
    @Transactional
    public BrandResponse create(String name, MultipartFile logo) {

        log.info("Creating brand | name={} | hasLogo={}", name, logo != null);

        if (name == null || name.isEmpty()) {
            throw new BusinessException("Brand name cannot be empty");
        }
        String normalizedName = name.trim();
        Optional<Brand> existing = brandRepository.findByNameIncludingDeleted(normalizedName);


        if (existing.isPresent()) {
            Brand brand = existing.get();
            if (brandRepository.existsDeletedById(brand.getId())) {
                log.info("Restoring previously deleted brand | id={} | name={}", brand.getId(), name);
                brandRepository.restoreById(brand.getId());

                if (logo != null && brand.getLogoUrl() != null) {
                    brand.setLogoUrl(imageClient.replaceImage(logo, ENTITY_NAME, brand.getLogoUrl()));
                }
                return brandMapper.toDto(brandRepository.save(brand));
            }
            throw new BusinessException("Brand with name '" + name + "' already exists.");
        }

        Brand brand = new Brand();
        brand.setName(normalizedName);

        if (logo != null) {
            log.debug("Uploading logo for brand '{}'", name);
            String logoUrl = imageClient.uploadImage(logo, ENTITY_NAME);
            brand.setLogoUrl(logoUrl);
        }
        Brand saved = brandRepository.save(brand);

        log.info("Brand created successfully | id={} | name={}", saved.getId(), saved.getName());

        return brandMapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BrandResponse> getAll(Pageable pageable) {

        log.debug("Fetching brands | page={} size={}", pageable.getPageNumber(), pageable.getPageSize());

        return brandRepository.findAll(pageable)
                .map(brandMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public BrandResponse getById(UUID id) {
        return brandMapper.toDto(getBrandOrThrow(id));
    }

    @Override
    @Transactional
    public BrandResponse update(UUID id, String name, MultipartFile logo) {

        log.info("Updating brand | id={} | updateName={} | updateLogo={}",
                id,
                name != null,
                logo != null
        );

        Brand brand = getBrandOrThrow(id);

        if (logo != null) {

            String logoUrl;

            if (brand.getLogoUrl() == null) {
                log.debug("Uploading new logo for brand | id={}", id);
                logoUrl = imageClient.uploadImage(logo, ENTITY_NAME);
            } else {
                log.debug("Replacing logo for brand | id={}", id);
                logoUrl = imageClient.replaceImage(
                        logo,
                        ENTITY_NAME,
                        brand.getLogoUrl()
                );
            }

            brand.setLogoUrl(logoUrl);
        }

        if (name != null) {
            String normalizedName = name.trim();
            if (normalizedName.isBlank()) {
                throw new BusinessException("Brand name cannot be empty");
            }
            log.debug("Updating brand | id={} | to newName={}", id, name);
            brand.setName(normalizedName);
        }

        Brand updated = brandRepository.save(brand);

        log.info("Brand updated successfully | id={}", id);

        return brandMapper.toDto(updated);
    }

    @Override
    @Transactional
    public void delete(UUID id) {

        log.info("Deleting brand | id={}", id);

        Brand brand = getBrandOrThrow(id);

        if (productClient.existsProductsByBrand(id)) {
            throw new BusinessException("Cannot delete brand because it is used by products");
        }

        brandRepository.delete(brand);

        log.info("Brand deleted successfully | id={}", id);
    }

    @Override
    @Transactional
    public void deleteBrandLogo(UUID id) {

        Brand brand = getBrandOrThrow(id);
        log.info("Deleting logo for brand | name={}", brand.getName());

        if (brand.getLogoUrl() != null) {
            log.debug("Deleting brand logo ");
            imageClient.deleteImageByUrl(brand.getLogoUrl(), ENTITY_NAME);
        }
        brand.setLogoUrl(null);
        brandRepository.save(brand);

        log.info("Brand logo deleted successfully | id={}", id);
    }

    @Override
    @Transactional
    public BrandResponse restore(UUID id) {

        log.info("Restoring brand | id={}", id);

        brandRepository.findByIdIncludingDeleted(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                String.format(BRAND_NOT_FOUND, id)
                        )
                );

        if (!brandRepository.existsDeletedById(id)) {
            throw new BusinessException(
                    "Brand with id '" + id + "' is not deleted."
            );
        }

        int updated = brandRepository.restoreById(id);

        if (updated == 0) {
            throw new BusinessException(
                    "Failed to restore brand with id '" + id + "'"
            );
        }

        log.info("Brand restored successfully | id={}", id);

        Brand restored = brandRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalStateException("Brand restored but not found")
                );

        return brandMapper.toDto(restored);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getBrandCount() {
        return brandRepository.count();
    }

    // =========================
    // PRIVATE HELPERS
    // =========================
    private Brand getBrandOrThrow(UUID id) {
        return brandRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                String.format(BRAND_NOT_FOUND, id)
                        )
                );
    }
}