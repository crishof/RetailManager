package com.retailmanager.categorysv.service;

import com.retailmanager.categorysv.dto.CategoryResponse;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    @Transactional
    CategoryResponse create(String name, MultipartFile image);

    @Transactional(readOnly = true)
    List<CategoryResponse> findAll();

    @Transactional(readOnly = true)
    CategoryResponse findById(UUID id);

    @Transactional
    CategoryResponse update(UUID id, String name, MultipartFile image);

    @Transactional
    void delete(UUID id);

    @Transactional
    void deleteCategoryImage(UUID id);

    @Transactional
    CategoryResponse restore(UUID id);

    Long getCategoryCount();
}
