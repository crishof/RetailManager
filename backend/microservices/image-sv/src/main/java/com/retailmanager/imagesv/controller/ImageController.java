package com.retailmanager.imagesv.controller;

import com.retailmanager.imagesv.dto.ImageResponse;
import com.retailmanager.imagesv.exception.InvalidRequestException;
import com.retailmanager.imagesv.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
@Slf4j
public class ImageController {

    private final CloudinaryService cloudinaryService;

    @GetMapping("/status")
    public ResponseEntity<String> root() {
        return ResponseEntity.ok("Image service is running");
    }

    @PostMapping("/upload")
    public ResponseEntity<ImageResponse> uploadImage(
            @RequestParam MultipartFile file,
            @RequestParam String entityName
    ) {
        validateFile(file);
        validateEntity(entityName);

        String url = cloudinaryService.uploadImage(file, entityName);

        log.info("Image uploaded successfully for entity '{}'", entityName);

        ImageResponse response = new ImageResponse(
                file.getOriginalFilename(),
                entityName,
                url
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/replace")
    public ImageResponse replaceImage(
            @RequestParam MultipartFile file,
            @RequestParam String entityName,
            @RequestParam String oldUrl
    ) {
        validateFile(file);
        validateEntity(entityName);

        if (oldUrl == null || oldUrl.isBlank()) {
            throw new InvalidRequestException("oldUrl is required");
        }

        // 1️⃣ Subir primero la nueva imagen
        String newUrl = cloudinaryService.uploadImage(file, entityName);

        // 2️⃣ Borrar la anterior SOLO si el upload fue exitoso
        cloudinaryService.deleteImageByUrl(oldUrl, entityName);

        log.info("Image replaced successfully for entity '{}'", entityName);

        return new ImageResponse(
                file.getOriginalFilename(),
                entityName,
                newUrl
        );
    }

    @DeleteMapping("/delete")
    public void deleteImage(
            @RequestParam("url") String url,
            @RequestParam("entityName") String entityName
    ) {
        if (url == null || url.isBlank()) {
            throw new InvalidRequestException("URL is required");
        }
        if (entityName == null || entityName.isBlank()) {
            throw new InvalidRequestException("entityName is required");
        }
        cloudinaryService.deleteImageByUrl(url, entityName);
    }

    // -----------------------
    // Validations
    // -----------------------

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidRequestException("File is missing or empty");
        }
    }

    private void validateEntity(String entityName) {
        if (entityName == null || entityName.isBlank()) {
            throw new InvalidRequestException("entityName is required");
        }
    }
}