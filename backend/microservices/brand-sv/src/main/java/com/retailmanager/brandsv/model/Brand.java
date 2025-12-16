package com.retailmanager.brandsv.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(
        name = "tbl_brands",
        indexes = {
                @Index(name = "idx_brand_name", columnList = "name")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(name = "logo_url")
    private String logoUrl;

    // =========================
    // SOFT DELETE
    // =========================
    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;

    public void restore() {
        this.deleted = false;
    }

    public void softDelete() {
        this.deleted = true;
    }
}