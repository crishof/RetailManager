package com.crishof.productsv.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImportItemError {

    private UUID supplierProductId;
    private String code;
    private String reason;
}