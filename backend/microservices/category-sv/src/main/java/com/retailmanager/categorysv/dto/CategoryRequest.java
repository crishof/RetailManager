package com.retailmanager.categorysv.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CategoryRequest {
    private String name;
    private MultipartFile image;
}
