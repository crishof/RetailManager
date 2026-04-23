package com.retailmanager.suppliercatalogsv.mapper;

import com.retailmanager.suppliercatalogsv.dto.PriceItemResponse;
import com.retailmanager.suppliercatalogsv.model.SupplierPriceItem;
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
