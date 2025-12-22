package com.retailmanager.suppliersv.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tbl_supplier",
        indexes = {
                @Index(name = "idx_supplier_tax_id", columnList = "taxId")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = false, length = 100)
    private String taxId;
    private String legalName;

    private UUID addressId;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @PreRemove
    protected void onSoftDelete() {
        this.deletedAt = Instant.now();
    }

    public void restore() {
        this.deletedAt = null;
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }
}
