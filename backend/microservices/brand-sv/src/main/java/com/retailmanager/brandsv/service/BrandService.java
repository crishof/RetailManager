package com.retailmanager.brandsv.service;

import com.retailmanager.brandsv.dto.BrandResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface BrandService {

    BrandResponse create(String name, MultipartFile logo);

    List<BrandResponse> findAll();

    BrandResponse findById(UUID id);

    BrandResponse update(UUID id, String name, MultipartFile logo);

    void delete(UUID id);

    Long getBrandCount();

    void deleteBrandLogo(UUID id);

    BrandResponse restore(UUID id);
}
