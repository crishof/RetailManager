package com.crishof.categorysv.repository;

import com.crishof.categorysv.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    boolean existsByNameAndParent(String name, Category parent);

    boolean existsByParent(Category parent);

    List<Category> findByParentIsNull();

    boolean existsBySlug(String slug);

    Optional<Category> findByName(String name);
}