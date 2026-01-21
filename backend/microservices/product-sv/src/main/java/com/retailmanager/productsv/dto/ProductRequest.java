package com.retailmanager.productsv.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ProductRequest {

    private String code;
    private UUID brandId;
    private String model;
    private String description;
    private UUID categoryId;
    private UUID dimensionId;
    private UUID supplierId;
    private UUID supplierProductId;
    private boolean active;
    private boolean published;
    private boolean highlighted;


    private List<UUID> imageIds = new ArrayList<>();
    private UUID priceId;
    private Instant createdAt;
    private Instant updatedAt;

    // ----------- Commercial codes -----------

    private String sku;
    private String ean13;
    private String upc;
    private String mpn;
    private String gtin;
}
