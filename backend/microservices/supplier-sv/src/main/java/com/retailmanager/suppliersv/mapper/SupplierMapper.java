package com.retailmanager.suppliersv.mapper;

import com.retailmanager.suppliersv.dto.SupplierRequest;
import com.retailmanager.suppliersv.dto.SupplierResponse;
import com.retailmanager.suppliersv.model.Supplier;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE
)
public interface SupplierMapper {

    // CREATE
    @Mapping(target = "id", ignore = true)
    Supplier toEntity(SupplierRequest request);

    // READ
    SupplierResponse toDto(Supplier supplier);

    // UPDATE (PATCH / PUT partial)

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy =
            NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(
            SupplierRequest request,
            @MappingTarget Supplier supplier
    );
}
