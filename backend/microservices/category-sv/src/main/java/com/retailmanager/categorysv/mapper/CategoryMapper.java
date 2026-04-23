package com.retailmanager.categorysv.mapper;

import com.retailmanager.categorysv.dto.CategoryResponse;
import com.retailmanager.categorysv.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CategoryMapper {

    CategoryResponse toDto(Category category);

}
