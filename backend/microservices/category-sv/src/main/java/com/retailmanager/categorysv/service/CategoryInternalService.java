package com.retailmanager.categorysv.service;

import com.retailmanager.categorysv.model.Category;
import com.retailmanager.categorysv.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryInternalService {

    private final CategoryRepository categoryRepository;

    public UUID getIdOrCreate(String categoryName) {

        Optional<Category> optionalCategory = categoryRepository.findByName(categoryName);

        if (optionalCategory.isPresent()) {
            return optionalCategory.get().getId();
        }

        Category category = new Category();
        category.setName(categoryName);
        return categoryRepository.save(category).getId();
    }
}
