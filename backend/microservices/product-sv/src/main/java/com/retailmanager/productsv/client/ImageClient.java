package com.retailmanager.productsv.client;

import com.retailmanager.productsv.dto.ImageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "image-sv", url = "http://image-sv:8080", path = "/api/v1/images")
public interface ImageClient {

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ImageResponse upload(@RequestPart("file") MultipartFile file, @RequestPart("entityName") String entityName);

    @PutMapping(value = "/replace", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ImageResponse replace(@RequestPart("file") MultipartFile file, @RequestPart("entityName") String entityName, @RequestPart("oldUrl") String oldUrl);

    @DeleteMapping("/delete")
    void delete(@RequestParam String url, @RequestParam("entityName") String entityName);
}