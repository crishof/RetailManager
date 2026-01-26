package com.retailmanager.categorysv.controller;

import com.retailmanager.categorysv.service.CategoryInternalService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/internal/categories")
@RequiredArgsConstructor
@Slf4j
@Hidden
public class CategoryInternalController {

    private final CategoryInternalService categoryInternalService;

    @GetMapping("/getId")
    public UUID getByNameOrCreate(@RequestParam String name) {
        log.info("Obtaining existing category or creating a new one");
        return categoryInternalService.getIdOrCreate(name);
    }

}
