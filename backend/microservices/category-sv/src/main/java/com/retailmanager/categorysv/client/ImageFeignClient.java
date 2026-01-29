package com.retailmanager.categorysv.client;


import com.retailmanager.categorysv.dto.ImageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(
        name = "image-sv",
        url = "http://image-sv:8080"
)
public interface ImageFeignClient {

    @PostMapping(
            value = "/internal/images/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    ImageResponse uploadImage(
            @RequestPart("file") MultipartFile file,
            @RequestPart("entityName") String entityName
    );

    @PutMapping(
            value = "/internal/images/replace",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    ImageResponse replaceImage(
            @RequestPart("file") MultipartFile file,
            @RequestPart("entityName") String entityName,
            @RequestPart("oldUrl") String oldUrl
    );

    @DeleteMapping("/internal/images/delete")
    void deleteImage(
            @RequestParam("url") String url,
            @RequestParam("entityName") String entityName
    );
}