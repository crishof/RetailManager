package com.crishof.productsv.client;

import com.crishof.productsv.dto.ImageResponse;
import com.crishof.productsv.exception.InvalidImageResponseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageServiceClient {

    private final ImageClient imageClient;

    public String uploadImage(MultipartFile file, String entityName) {
        ImageResponse response = imageClient.upload(file, entityName);
        validate(response);
        return response.url();
    }

    public String replaceImage(MultipartFile file, String entityName, String oldUrl) {
        ImageResponse response = imageClient.replace(file, entityName, oldUrl);
        validate(response);
        return response.url();
    }

    public void deleteImageByUrl(String url, String entityName) {
        imageClient.delete(url, entityName);
    }

    private void validate(ImageResponse response) {
        if (response == null || response.url() == null || response.url().isBlank()) {
            throw new InvalidImageResponseException("Image service returned empty response");
        }
    }
}