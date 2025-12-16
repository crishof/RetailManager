package com.retailmanager.brandsv.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class BrandRequest {
    private String name;
    private MultipartFile logo;
}
