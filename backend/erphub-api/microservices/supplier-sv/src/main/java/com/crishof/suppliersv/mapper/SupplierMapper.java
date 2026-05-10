package com.crishof.suppliersv.mapper;

import com.crishof.suppliersv.dto.SupplierRequest;
import com.crishof.suppliersv.dto.SupplierResponse;
import com.crishof.suppliersv.model.Supplier;
import org.mapstruct.*;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
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
