package com.retailmanager.productsv.dto;

import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierProductRequest {
    private UUID id;
    private UUID supplierId;
    private String brand;
    private String code;
    private String model;
    private String description;
    private String category;
    private Instant lastUpdate;
    private double price;
    private double suggestedPrice;
    private double suggestedWebPrice;
    private String stockAvailable;
    private String barcode;
    private String currency;
    private double taxRate;
}
