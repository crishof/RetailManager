package com.retailmanager.productsv.repository;

import com.retailmanager.productsv.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends
        JpaRepository<Product, UUID>,
        JpaSpecificationExecutor<Product> {

    // TODO Find including deleted products by id
    @Query(value = "SELECT * FROM tbl_products WHERE id = :id", nativeQuery = true)
    Optional<Product> findByIdIncludingDeleted(@Param("id") UUID id);

    // TODO Validate if a deleted product exists by id
    @Query(value = "SELECT EXISTS (SELECT 1 FROM tbl_products WHERE id = :id AND deleted = true)", nativeQuery = true)
    boolean existsDeletedById(@Param("id") UUID id);

    // TODO Restore a deleted product by id
    @Query(value = "UPDATE tbl_products SET deleted = false WHERE id = :id", nativeQuery = true)
    int restoreById(@Param("id") UUID id);

    @Modifying
    @Query("update Product p set p.categoryId = null where p.categoryId = :categoryId")
    int clearCategoryFromProducts(@Param("categoryId") UUID categoryId);

    @Modifying
    @Query("update Product p set p.categoryId = :to where p.categoryId = :from")
    int replaceCategory(@Param("from") UUID from, @Param("to") UUID to);

    List<Product> findAllByBrandId(UUID brandId);
}
