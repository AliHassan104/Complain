package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.CannotDeleteImage;
import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.config.image.AchievementImageImplementation;
import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.service.AchievementService;
import com.company.ComplainProject.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AchievementController {

    @Autowired
    private AchievementService achievementService;
    @Autowired
    private AchievementImageImplementation achievementImageImplementation;

    @Autowired
    ImageService imageService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    @GetMapping("/achievement")
    public ResponseEntity<Page<Achievements>> getAchievements(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                              @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){
        Page<Achievements> achievements= achievementService.getAllAchievementWithPagination(pageNumber,pageSize);
        return ResponseEntity.ok(achievements);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    @GetMapping("/achievement/{id}")
    public ResponseEntity<AchievementsDto> getAchievementsById(@PathVariable Long id){
        AchievementsDto achievement = achievementService.getAchievementById(id);
        return  ResponseEntity.ok(achievement);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/achievement/{id}")
    public ResponseEntity<Void> deleteAchievementById(@PathVariable Long id){
        achievementService.deleteAchievementById(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/achievement/{id}")
    public ResponseEntity<AchievementsDto> updateAchievementById(@PathVariable Long id
                                                                    ,@RequestParam("pictureUrl") MultipartFile image,
                                                                     @RequestParam("data") String achievementdto){
        try{
            if(image.isEmpty()){
                return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

            ObjectMapper mapper = new ObjectMapper();
            AchievementsDto achievementsDto1 = mapper.readValue(achievementdto,AchievementsDto.class);

//                                                                                   first the image should be deleted
//            Boolean achievementImageDeleted = achievementImageImplementation.deleteImage(id);

                String pictureUrl = imageService.uploadImageAndGetApiPath(image);
                achievementsDto1.setPictureUrl(pictureUrl);
                return ResponseEntity.ok(achievementService.updateAchievementById(id,achievementsDto1));


        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("Cannot update No Achievement Exist having id "+id);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/achievement")
    public ResponseEntity<AchievementsDto> addAchievements(@RequestParam("pictureUrl") MultipartFile image,
                                                            @RequestParam("data") String userdata) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            AchievementsDto achievementsDto = mapper.readValue(userdata,AchievementsDto.class);
//                                                                                              Save Image in Database
            String fileName = imageService.uploadImageAndGetApiPath(image);
            achievementsDto.setPictureUrl(fileName);

            return ResponseEntity.ok(achievementService.addAchievement(achievementsDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
