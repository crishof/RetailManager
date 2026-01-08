package com.retailmanager.categorysv.service;

import com.retailmanager.categorysv.client.ImageClient;
import com.retailmanager.categorysv.client.ProductClient;
import com.retailmanager.categorysv.dto.CategoryResponse;
import com.retailmanager.categorysv.exception.BusinessException;
import com.retailmanager.categorysv.exception.ResourceNotFoundException;
import com.retailmanager.categorysv.mapper.CategoryMapper;
import com.retailmanager.categorysv.model.Category;
import com.retailmanager.categorysv.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private static final String CATEGORY_NOT_FOUND = "Category with id %s not found";
    private static final String ENTITY_NAME = "Categories";

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final ImageClient imageClient;
    private final ProductClient productClient;

    @Transactional
    @Override
    public CategoryResponse create(String name, MultipartFile image) {

        log.info("Creating category | name={} | hasLogo={}", name, image != null);

        if (name == null || name.isEmpty()) {
            throw new BusinessException("Category name cannot be empty");
        }
        String normalizedName = name.trim();
        Optional<Category> existing = categoryRepository.findByName(normalizedName);

        if (existing.isPresent()) {
            throw new IllegalArgumentException("Category with name '" + name + "' already exists.");
        }

        Category category = new Category();
        category.setName(name);

        if (image != null) {
            log.debug("Uploading image for category '{}'", name);
            String imageUrl = imageClient.uploadImage(image, ENTITY_NAME);
            category.setImageUrl(imageUrl);
        }
        Category saved = categoryRepository.save(category);

        log.info("Category created successfully | id={} | name={}", saved.getId(), saved.getName());

        return categoryMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<CategoryResponse> getAll(Pageable pageable) {

        log.debug("Fetching categories | page={} size{}", pageable.getPageNumber(), pageable.getPageSize());

        return categoryRepository.findAll(pageable)
                .map(categoryMapper::toDto);
    }

    @Transactional(readOnly = true)
    @Override
    public CategoryResponse getById(UUID id) {
        return categoryMapper.toDto(getCategoryOrThrow(id));
    }

    @Transactional
    @Override
    public CategoryResponse update(UUID id, String name, MultipartFile image) {

        log.info("Updating category | id={} | updateName={} | updateLogo={}",
                id,
                name != null,
                image != null
        );

        Category category = getCategoryOrThrow(id);

        if (image != null) {

            String imageUrl;

            if (category.getImageUrl() == null) {
                log.debug("Uploading new image for category | id={}", id);
                imageUrl = imageClient.uploadImage(image, ENTITY_NAME);
            } else {
                log.debug("Replacing image for category | id={}", id);
                imageUrl = imageClient.replaceImage(
                        image,
                        ENTITY_NAME,
                        category.getImageUrl()
                );
            }

            category.setImageUrl(imageUrl);
        }

        if (name != null) {
            String normalizedName = name.trim();
            if (normalizedName.isBlank()) {
                throw new BusinessException("Category name cannot be empty");
            }
            log.debug("Updating category name | id={} | to newName={}", id, name);
            category.setName(name);
        }

        Category updated = categoryRepository.save(category);

        log.info("Category updated successfully | id={}", id);

        return categoryMapper.toDto(updated);
    }

    @Transactional
    @Override
    public void delete(UUID id) {

        log.info("Deleting category | id={}", id);

        Category category = getCategoryOrThrow(id);

        productClient.deleteProductsCategory(category.getId());
        // TODO validate if category has been successfully removed from products
        categoryRepository.delete(category);

        log.info("Category deleted successfully | id={}", id);
    }

    @Transactional
    @Override
    public void deleteCategoryImage(UUID id) {

        Category category = getCategoryOrThrow(id);
        log.info("Deleting image for category | name={}", category.getName());

        if (category.getImageUrl() != null) {
            log.debug("Deleting category image ");
            imageClient.deleteImageByUrl(category.getImageUrl(), ENTITY_NAME);
        }
        category.setImageUrl(null);
        categoryRepository.save(category);
        log.info("Category image deleted successfully | id={}", id);
    }

    @Override
    public Long getCategoryCount() {
        return categoryRepository.count();
    }

    // =========================
    // PRIVATE HELPERS
    // =========================
    private Category getCategoryOrThrow(UUID id) {
        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                String.format(CATEGORY_NOT_FOUND, id)
                        )
                );
    }
}
