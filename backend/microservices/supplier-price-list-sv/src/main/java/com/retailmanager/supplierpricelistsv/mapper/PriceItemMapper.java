package com.retailmanager.supplierpricelistsv.mapper;

import com.retailmanager.supplierpricelistsv.dto.PriceItemResponse;
import com.retailmanager.supplierpricelistsv.model.SupplierPriceItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PriceItemMapper {

    @Mapping(target = "stockAvailable", source = "stockRaw")
    PriceItemResponse toDto(SupplierPriceItem supplierPriceItem);

}
