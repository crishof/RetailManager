package com.crishof.productsv.mapper;

import com.crishof.productsv.dto.ProductRequest;
import com.crishof.productsv.dto.ProductResponse;
import com.crishof.productsv.model.Product;
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
