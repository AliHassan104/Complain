package com.company.ComplainProject.service;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    @Value("${image.api.url}")
    private String imageApiUrl;

    @Value("${image.bucket.path}")
    private String imageBucketPath;


    public ResponseEntity<InputStreamResource> getImage(String filename) {
        try {
            final Path file = Paths.get(imageBucketPath).resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            InputStream in = resource.getInputStream();
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.valueOf(Files.probeContentType(file)))
                        .body(new InputStreamResource(in));

            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public String uploadImageAndGetApiPath(MultipartFile image){
        final Path filePAth = Paths.get(imageBucketPath);
        Path imagePath = filePAth.resolve(image.getOriginalFilename());
        try {
            Files.copy(image.getInputStream(),imagePath);
            return imageApiUrl+image.getOriginalFilename();
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }

    }

}
