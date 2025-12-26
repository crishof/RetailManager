package com.retailmanager.categorysv.repository;

import com.retailmanager.categorysv.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    // Find including deleted categories by name
    @Query(value = """
            SELECT * FROM tbl_categories
            WHERE name = :name
            """, nativeQuery = true)
    Optional<Category> findByNameIncludingDeleted(@Param("name") String name);

    // Find including deleted categories by id
    @Query(value = """
            SELECT * FROM tbl_categories
            WHERE id = :id
            """, nativeQuery = true)
    Optional<Category> findByIdIncludingDeleted(@Param("id") UUID id);

    // Validate if a deleted category exists by id
    @Query(value = """
            SELECT EXISTS (
                SELECT 1 FROM tbl_categories
                WHERE id = :id AND deleted = true
            )
            """, nativeQuery = true)
    boolean existsDeletedById(@Param("id") UUID id);

    // Restore a deleted category by id
    @Modifying
    @Query(value = """
            UPDATE tbl_categories
            SET deleted = false,
                deleted_at = NULL
            WHERE id = :id
            """, nativeQuery = true)
    int restoreById(@Param("id") UUID id);
}