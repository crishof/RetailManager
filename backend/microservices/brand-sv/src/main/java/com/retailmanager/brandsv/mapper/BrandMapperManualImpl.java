package com.retailmanager.brandsv.mapper;

import com.retailmanager.brandsv.dto.BrandResponse;
import com.retailmanager.brandsv.model.Brand;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class BrandMapperManualImpl implements BrandMapper {

    @Override
    public BrandResponse toDto(Brand brand) {
        if (brand == null) {
            return null;
        }

        BrandResponse dto = new BrandResponse();
        if (brand.getId() != null) {
            dto.setId(brand.getId().toString());
        }
        dto.setName(brand.getName());
        dto.setLogoUrl(brand.getLogoUrl());
        return dto;
    }
}
