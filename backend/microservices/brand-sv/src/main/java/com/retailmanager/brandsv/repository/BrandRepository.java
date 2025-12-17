package com.retailmanager.brandsv.repository;

import com.retailmanager.brandsv.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BrandRepository extends JpaRepository<Brand, UUID> {

    @Query(value = """
        SELECT * FROM tbl_brands
        WHERE name = :name
        """, nativeQuery = true)
    Optional<Brand> findByNameIncludingDeleted(@Param("name") String name);
    // Para restaurar, incluir registros deleted
    @Query(value = """
        SELECT * FROM tbl_brands
        WHERE id = :id
        """, nativeQuery = true)
    Optional<Brand> findByIdIncludingDeleted(@Param("id") UUID id);

    // Validar si realmente está deleted
    @Query(value = """
        SELECT EXISTS (
            SELECT 1 FROM tbl_brands
            WHERE id = :id AND deleted = true
        )
        """, nativeQuery = true)
    boolean existsDeletedById(@Param("id") UUID id);

    // Restaurar soft delete
    @Modifying
    @Query(value = """
        UPDATE tbl_brands
        SET deleted = false,
            deleted_at = NULL
        WHERE id = :id
        """, nativeQuery = true)
    int restoreById(@Param("id") UUID id);
}