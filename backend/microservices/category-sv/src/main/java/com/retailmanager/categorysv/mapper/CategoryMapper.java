package com.retailmanager.categorysv.mapper;

import com.retailmanager.categorysv.dto.CategoryRequest;
import com.retailmanager.categorysv.dto.CategoryResponse;
import com.retailmanager.categorysv.model.Category;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface CategoryMapper {

    @Mapping(target = "id", ignore = true)
    Category toEntity(CategoryRequest request);

    CategoryResponse toDto(Category category);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromRequest(
            CategoryRequest request,
            @MappingTarget Category category
    );

}
