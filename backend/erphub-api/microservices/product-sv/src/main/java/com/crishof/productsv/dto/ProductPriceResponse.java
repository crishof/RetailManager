package com.crishof.productsv.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductPriceResponse {

    private double purchasePrice;
    private double sellingPrice;
    private double taxRate;
    private double discount;
}
