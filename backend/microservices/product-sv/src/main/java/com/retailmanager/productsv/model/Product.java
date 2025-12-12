package com.retailmanager.productsv.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tbl_products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String code;
    private UUID brandId;
    private String model;
    private String description;
    private UUID dimensionId;
    private UUID categoryId;
    private UUID supplierId;
    private UUID supplierProductId;
    private boolean active;
    private boolean published;
    private boolean highlighted;
    @ElementCollection
    private List<UUID> imageId;
    @ElementCollection
    private List<UUID> stockIds;
    private UUID priceId;

    /*

    private String color;
    private String condition;
    private String material;
    private String warranty;

    private String sku;
    private String ean;
    private String upc;
    private String mpn;
    private String gtin;
    private String isbn;
    private String asin;
    private String ean13;
    private String ean8;
    private String upc12;
    private String upc14;
    private String mfg;
    private String mfgDate;
    private String expDate;

    private String country;
    private String state;
    private String city;
    private String zip;
    private String address;
    private String phone;
    private String email;
    private String website;

    private String notes;
    private String status;
    private String createdBy;
    private String updatedBy;
*/

}
