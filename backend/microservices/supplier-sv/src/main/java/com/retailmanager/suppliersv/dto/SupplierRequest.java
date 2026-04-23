package com.retailmanager.suppliersv.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class SupplierRequest {

    private String name;
    private String taxId;
    private String legalName;
    private UUID addressId;
}
