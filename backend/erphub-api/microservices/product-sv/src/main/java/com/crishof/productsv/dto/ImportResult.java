package com.crishof.productsv.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImportResult {

    private int total;
    private int imported;
    private int skipped;
    private int failed;

    private List<ImportItemError> errors;
}