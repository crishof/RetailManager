package com.retailmanager.brandsv.service;

import com.retailmanager.brandsv.dto.BrandResponse;
import com.retailmanager.brandsv.exception.ResourceNotFoundException;
import com.retailmanager.brandsv.mapper.BrandMapper;
import com.retailmanager.brandsv.model.Brand;
import com.retailmanager.brandsv.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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


    @Override
    @Transactional
    public BrandResponse create(String name, MultipartFile logo) {

        Brand brand = new Brand();
        if (logo != null) {
            String logoUrl = imageClient.uploadImage(logo, ENTITY_NAME);
            brand.setLogoUrl(logoUrl);
        }
        brand.setName(name);
        Brand saved = brandRepository.save(brand);

        log.info("Brand created | id={} | name={}", saved.getId(), saved.getName());

        return brandMapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BrandResponse> findAll() {
        return brandRepository.findAll()
                .stream()
                .map(brandMapper::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public BrandResponse findById(UUID id) {
        Brand brand = getBrandOrThrow(id);
        return brandMapper.toDto(brand);
    }

    @Override
    @Transactional
    public BrandResponse update(UUID id, String name, MultipartFile logo) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                String.format(BRAND_NOT_FOUND, id)
                        )
                );

        if (logo != null) {
            String logoUrl = imageClient.replaceImage(logo, ENTITY_NAME, brand.getLogoUrl());
            brand.setLogoUrl(logoUrl);
        }
        if (name != null) {
            brand.setName(name);
        }

        Brand updated = brandRepository.save(brand);

        log.info("Brand updated | id={}", id);

        return brandMapper.toDto(updated);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        Brand brand = getBrandOrThrow(id);

        if (brand.getLogoUrl() != null) {
            imageClient.deleteImageByUrl(brand.getLogoUrl(), ENTITY_NAME);
        }
        brandRepository.delete(brand);

        log.info("Brand deleted | id={}", id);
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