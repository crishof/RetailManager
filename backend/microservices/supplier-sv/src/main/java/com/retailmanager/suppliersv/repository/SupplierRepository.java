package com.retailmanager.suppliersv.repository;

import com.retailmanager.suppliersv.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface SupplierRepository extends JpaRepository<Supplier, UUID> {

    @Query(value = """
            SELECT * FROM tbl_suppliers
            WHERE name = :name
            """, nativeQuery = true)
    Optional<Supplier> findByNameIncludingDeleted(@Param("name") String name);

    // Para restaurar, incluir registros deleted
    @Query(value = """
            SELECT * FROM tbl_suppliers
            WHERE id = :id
            """, nativeQuery = true)
    Optional<Supplier> findByIdIncludingDeleted(@Param("id") UUID id);

    // Validar si realmente está deleted
    @Query(value = """
            SELECT EXISTS (
                SELECT 1 FROM tbl_suppliers
                WHERE id = :id AND deleted = true
            )
            """, nativeQuery = true)
    boolean existsDeletedById(@Param("id") UUID id);

    // Restaurar soft delete
    @Modifying
    @Query(value = """
            UPDATE tbl_suppliers
            SET deleted = false,
                deleted_at = NULL
            WHERE id = :id
            """, nativeQuery = true)
    int restoreById(@Param("id") UUID id);
}
