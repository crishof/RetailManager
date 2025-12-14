package com.retailmanager.imagesv.controller;

import com.retailmanager.imagesv.dto.ImageResponse;
import com.retailmanager.imagesv.exception.FileDeletionException;
import com.retailmanager.imagesv.exception.FileUploadException;
import com.retailmanager.imagesv.exception.InvalidRequestException;
import com.retailmanager.imagesv.service.CloudinaryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImageController {

    private final CloudinaryServiceImpl cloudinaryService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping("/upload")
    public ImageResponse uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("entityName") String entityName
    ) {
        if (file == null || file.isEmpty()) {
            throw new InvalidRequestException("File is missing or empty");
        }
        if (entityName == null || entityName.isBlank()) {
            throw new InvalidRequestException("entityName is required");
        }

        try {
            String url = cloudinaryService.uploadImage(file, entityName);
            logger.info("Uploaded image '{}' for entity '{}'", file.getOriginalFilename(), entityName);
            return new ImageResponse(file.getOriginalFilename(), entityName, url);
        } catch (FileUploadException e) {
            logger.error("Failed to upload image '{}' for entity '{}': {}", file.getOriginalFilename(), entityName, e.getMessage(), e);
            throw e;
        }
    }

    @PutMapping("/replace")
    public ImageResponse replaceImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("entityName") String entityName,
            @RequestParam("oldUrl") String oldUrl
    ) {
        if (file == null || file.isEmpty()) {
            throw new InvalidRequestException("File is missing or empty");
        }
        if (entityName == null || entityName.isBlank() || oldUrl == null || oldUrl.isBlank()) {
            throw new InvalidRequestException("entityName and oldUrl are required");
        }

        try {
            // Primero borrar la imagen anterior
            cloudinaryService.deleteImageByUrl(oldUrl, entityName);
            logger.info("Deleted previous image '{}' for entity '{}'", oldUrl, entityName);

            // Subir la nueva imagen
            String newUrl = cloudinaryService.uploadImage(file, entityName);
            logger.info("Uploaded replacement image '{}' for entity '{}'", file.getOriginalFilename(), entityName);

            return new ImageResponse(file.getOriginalFilename(), entityName, newUrl);
        } catch (Exception e) {
            logger.error("Failed to replace image '{}' for entity '{}': {}", oldUrl, entityName, e.getMessage(), e);
            throw new FileUploadException("Failed to replace image", e);
        }
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

        try {
            cloudinaryService.deleteImageByUrl(url, entityName);
            logger.info("Deleted image '{}' for entity '{}'", url, entityName);
        } catch (FileDeletionException e) {
            logger.error("Failed to delete image '{}' for entity '{}': {}", url, entityName, e.getMessage(), e);
            throw e;
        }
    }
}