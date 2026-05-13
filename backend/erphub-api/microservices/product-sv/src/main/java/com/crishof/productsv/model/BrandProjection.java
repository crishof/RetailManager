package com.crishof.productsv.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "brand_projection")
public class BrandProjection {

    @Id
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;

    private Instant updatedAt;
}
