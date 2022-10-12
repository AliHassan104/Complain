package com.company.ComplainProject.controller;

import com.company.ComplainProject.service.AchievementService;
import com.company.ComplainProject.service.ComplainService;
import com.company.ComplainProject.service.EventService;
import com.company.ComplainProject.service.ImageService;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;


@RestController
@RequestMapping("/api")
public class ImageController {

    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    ImageService imageService;

    @GetMapping("/view/image/{filename:.+}")
    public ResponseEntity<InputStreamResource> getImageApiUrl(@PathVariable String filename) {
       return imageService.getImage(filename);
    }


}
