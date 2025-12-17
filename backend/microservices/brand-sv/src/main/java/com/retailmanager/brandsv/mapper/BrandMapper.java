package com.retailmanager.brandsv.mapper;

import com.retailmanager.brandsv.dto.BrandRequest;
import com.retailmanager.brandsv.dto.BrandResponse;
import com.retailmanager.brandsv.model.Brand;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface BrandMapper {

    // CREATE
    @Mapping(target = "id", ignore = true)
    Brand toEntity(BrandRequest request);

    // READ
    BrandResponse toDto(Brand brand);

    // UPDATE (PATCH / PUT partial)
    @Mapping(target = "id", ignore = true)
    void updateEntityFromRequest(
            BrandRequest request,
            @MappingTarget Brand brand
    );
}