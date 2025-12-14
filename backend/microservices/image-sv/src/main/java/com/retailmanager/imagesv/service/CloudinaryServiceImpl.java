package com.retailmanager.imagesv.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.retailmanager.imagesv.exception.FileDeletionException;
import com.retailmanager.imagesv.exception.FileUploadException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URI;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;
    private final Logger logger = LoggerFactory.getLogger(CloudinaryServiceImpl.class);

    @Override
    public String uploadImage(MultipartFile file, String entityName) {
        try {
            Map<String, Object> options = ObjectUtils.asMap(
                    "folder", entityName,
                    "resource_type", "image"
            );

            Map<?, ?> uploadResult = cloudinary.uploader()
                    .upload(file.getBytes(), options);

            String url = (String) uploadResult.get("secure_url");

            if (url == null || url.isBlank()) {
                throw new FileUploadException("Cloudinary did not return a valid image URL", null);
            }

            logger.info("Image uploaded successfully | entity={} | url={}", entityName, url);
            return url;

        } catch (IOException e) {
            logger.error("Error uploading image to Cloudinary | entity={}", entityName, e);
            throw new FileUploadException("Failed to upload image to Cloudinary", e);
        }
    }

    @Override
    public void deleteImageByUrl(String imageUrl, String entityName) {
        try {
            String publicId = extractPublicId(imageUrl);

            Map<?, ?> result = cloudinary.uploader()
                    .destroy(publicId, ObjectUtils.emptyMap());

            String status = (String) result.get("result");

            if (!"ok".equalsIgnoreCase(status)) {
                throw new FileDeletionException(
                        "Cloudinary deletion failed with status: " + status
                );
            }

            logger.info("Image deleted successfully | entity={} | publicId={}", entityName, publicId);

        } catch (FileNotFoundException e) {
            logger.error("Public ID extraction failed for URL: {}", imageUrl, e);
            throw new FileDeletionException("Failed to extract public ID from image URL" + e.getMessage());
        } catch (Exception e) {
            logger.error("Error deleting image from Cloudinary | url={}", imageUrl, e);
            throw new FileDeletionException("Failed to delete image from Cloudinary" + e.getMessage());
        }
    }

    // =============================================
    // EXTRAER PUBLIC ID DE FORMA SEGURA
    // =============================================
    @Override
    public String extractPublicId(String imageUrl) throws FileNotFoundException {
        try {
            URI uri = URI.create(imageUrl);
            String path = uri.getPath(); // /image/upload/v12345/folder/file.jpg

            // Eliminar extensión
            int lastDotIndex = path.lastIndexOf('.');
            if (lastDotIndex == -1) {
                throw new FileNotFoundException("Invalid Cloudinary image URL");
            }

            String withoutExtension = path.substring(0, lastDotIndex);

            // Eliminar prefijo /image/upload/
            int uploadIndex = withoutExtension.indexOf("/upload/");
            if (uploadIndex == -1) {
                throw new FileNotFoundException("Invalid Cloudinary upload URL format");
            }

            String publicId = withoutExtension.substring(uploadIndex + "/upload/".length());

            // Eliminar versión si existe (v123456)
            if (publicId.startsWith("v")) {
                publicId = publicId.substring(publicId.indexOf("/") + 1);
            }

            return publicId;

        } catch (Exception e) {
            logger.error("Failed to extract publicId from URL: {}", imageUrl, e);
            throw new FileNotFoundException("Could not extract publicId from image URL");
        }
    }
}
