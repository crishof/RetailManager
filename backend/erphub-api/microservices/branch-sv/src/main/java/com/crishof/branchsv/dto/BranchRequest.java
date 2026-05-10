package com.crishof.branchsv.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BranchRequest {

    @NotBlank
    @Size(max = 20)
    private String code;

    @NotBlank
    private String name;

    private String address;

    @Builder.Default
    private boolean active = true;
}
