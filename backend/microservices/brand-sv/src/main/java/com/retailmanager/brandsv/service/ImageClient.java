package com.retailmanager.brandsv.service;

import com.retailmanager.brandsv.dto.ImageResponse;
import com.retailmanager.brandsv.exception.InvalidImageResponseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
public class ImageClient {

    private static final String FOLDER = "entityName";
    private static final String BASE_URL = "http://image-sv:8080/api/v1/images";
    private final WebClient webClient;

    public ImageClient(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl(BASE_URL)
                .build();
    }

    public String uploadImage(MultipartFile file, String entityName) {

        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file", file.getResource());
        builder.part(FOLDER, entityName);

        ImageResponse response = webClient.post()
                .uri("/upload")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .bodyToMono(ImageResponse.class)
                .block();

        validate(response);

        return response.url();
    }

    public String replaceImage(MultipartFile file, String entityName, String oldUrl) {

        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
        bodyBuilder.part("file", file.getResource());
        bodyBuilder.part(FOLDER, entityName);
        bodyBuilder.part("oldUrl", oldUrl);

        ImageResponse response = webClient.put()
                .uri("/replace")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
                .retrieve()
                .bodyToMono(ImageResponse.class)
                .block();

        validate(response);

        return response.url();
    }

    public void deleteImageByUrl(String url, String entityName) {
        webClient.delete()
                .uri(uriBuilder -> uriBuilder
                        .path("/delete")
                        .queryParam("url", url)
                        .queryParam(FOLDER, entityName)
                        .build())
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    }

    private void validate(ImageResponse response) {
        if (response == null || response.url().isBlank()) {
            throw new InvalidImageResponseException("Image service returned empty response");
        }
    }
}
