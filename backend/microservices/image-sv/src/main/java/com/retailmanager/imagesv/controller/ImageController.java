package com.retailmanager.imagesv.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    @GetMapping("/status")
    public String getStatus() {
        return "Image Service is up and running!";
    }
}
