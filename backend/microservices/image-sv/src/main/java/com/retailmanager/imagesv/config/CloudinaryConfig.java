package com.retailmanager.imagesv.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class CloudinaryConfig {

    @Autowired
    Environment environment;

    @Bean
    public Cloudinary cloudinaryBean() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", environment.getProperty("CLOUDINARY_CLOUD_NAME"),
                "api_secret", environment.getProperty("CLOUDINARY_API_SECRET"),
                "api_key", environment.getProperty("CLOUDINARY_API_KEY")));
    }
}
