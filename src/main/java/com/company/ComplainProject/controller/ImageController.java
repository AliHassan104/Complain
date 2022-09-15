package com.company.ComplainProject.controller;

import com.company.ComplainProject.service.AchievementService;
import com.company.ComplainProject.service.ComplainService;
import com.company.ComplainProject.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ImageController {
    @Autowired
    AchievementService achievementService;
    @Autowired
    ComplainService complainService;
    @Autowired
    EventService eventService;

    @GetMapping("/achievement/images/{fileName}") //achievementimage
    public void getUserImage(@PathVariable("fileName") String fileName, HttpServletResponse response) throws IOException {
        InputStream inputStream = achievementService.getImageByName(fileName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(inputStream,response.getOutputStream());
    }

    //                                                                  Api to get Asset Image
    @GetMapping("/complain/images/{fileName}") //complainimage
    public void getAssetImage(@PathVariable("fileName") String fileName,HttpServletResponse response) throws IOException {
        InputStream inputStream = complainService.getImageByName(fileName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(inputStream,response.getOutputStream());
    }

    @GetMapping("/event/images/{fileName}")
    public void getEventImage(@PathVariable("fileName") String fileName,HttpServletResponse response) throws IOException {
        InputStream inputStream = eventService.getImageByName(fileName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(inputStream,response.getOutputStream());
    }
}
