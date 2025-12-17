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

    @Query(value = """
            SELECT * FROM tbl_categories
            WHERE name = :name
            """, nativeQuery = true)
    Optional<Category> findByNameIncludingDeleted(@Param("name") String name);

    // Para restaurar, incluir registros deleted
    @Query(value = """
            SELECT * FROM tbl_categories
            WHERE id = :id
            """, nativeQuery = true)
    Optional<Category> findByIdIncludingDeleted(@Param("id") UUID id);

    // Validar si realmente está deleted
    @Query(value = """
            SELECT EXISTS (
                SELECT 1 FROM tbl_categories
                WHERE id = :id AND deleted = true
            )
            """, nativeQuery = true)
    boolean existsDeletedById(@Param("id") UUID id);

    // Restaurar soft delete
    @Modifying
    @Query(value = """
            UPDATE tbl_categories
            SET deleted = false,
                deleted_at = NULL
            WHERE id = :id
            """, nativeQuery = true)
    int restoreById(@Param("id") UUID id);
}