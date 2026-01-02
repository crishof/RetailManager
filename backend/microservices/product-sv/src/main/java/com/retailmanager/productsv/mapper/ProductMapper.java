package com.retailmanager.productsv.mapper;

import com.retailmanager.productsv.dto.ProductRequest;
import com.retailmanager.productsv.dto.ProductResponse;
import com.retailmanager.productsv.model.Product;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ProductMapper {

    @Mapping(target = "id", ignore = true)
    Product toEntity(ProductRequest request);

    ProductResponse toResponse(Product entity);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromRequest(
            ProductRequest request,
            @MappingTarget Product entity);
}
