package com.crishof.brandsv.mapper;

import com.crishof.brandsv.dto.BrandResponse;
import com.crishof.brandsv.model.Brand;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface BrandMapper {

    BrandResponse toDto(Brand brand);

}