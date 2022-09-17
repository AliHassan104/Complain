package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.CannotDeleteImage;
import com.company.ComplainProject.config.image.AchievementImageImplementation;
import com.company.ComplainProject.config.image.FileService;
import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.service.AchievementService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class AchievementController {
    @Autowired
    AchievementService achievementService;
    @Autowired
    AchievementImageImplementation achievementImageImplementation;
    @Value("${achievement.image}")
    private String path;


    @GetMapping("/achievement")
    public ResponseEntity<List<Achievements>> getAchievements(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                              @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<Achievements> assetBooking = achievementService.getAllAchievementWithPagination(pageNumber,pageSize);
        if(!assetBooking.isEmpty()){
            return ResponseEntity.ok(assetBooking);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/achievement/{id}")
    public ResponseEntity<Optional<Achievements>> getAchievementsById(@PathVariable Long id){
        Optional<Achievements> asset = achievementService.getAchievementById(id);
        if(asset.isPresent()){
            return  ResponseEntity.ok(asset);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/achievement/{id}")
    public ResponseEntity<Void> deleteAchievementById(@PathVariable Long id){
        try{
//                                                  First we will delete the image
            Boolean achievementImageDeleted = achievementImageImplementation.deleteImage(id);
            if(achievementImageDeleted){
                achievementService.deleteAchievementById(id);
                return ResponseEntity.ok().build();
            }
            else{
                throw new CannotDeleteImage("Cannot delete Achievement Image having id "+id);
            }

        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/achievement/{id}")
    public ResponseEntity<Optional<AchievementsDto>> updateAchievementById(@PathVariable Long id
                                                                    ,@RequestParam("pictureUrl") MultipartFile image,
                                                                           @RequestParam("data") String achievementdto){
        try{
            if(image.isEmpty()){
                return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

            ObjectMapper mapper = new ObjectMapper();
            AchievementsDto achievementsDto1 = mapper.readValue(achievementdto,AchievementsDto.class);

//                                                                                   first the image should be deleted
            Boolean achievementImageDeleted = achievementImageImplementation.deleteImage(id);

            if(achievementImageDeleted){
                String fileName = achievementImageImplementation.uploadImage(image);
                achievementsDto1.setPictureUrl("http://localhost:8081/api/"+path+fileName);
                return ResponseEntity.ok(achievementService.updateAchievementById(id,achievementsDto1));
            }
            else{
                throw new CannotDeleteImage("Achievement Image having id "+id+" cannot be deleted");
            }


        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/achievement")
    public ResponseEntity<AchievementsDto> addAchievements(
                                                            @RequestParam("pictureUrl") MultipartFile image,
                                                            @RequestParam("data") String userdata) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            AchievementsDto achievementsDto = mapper.readValue(userdata,AchievementsDto.class);
//                                                                                              Save Image in Database
            String fileName = achievementImageImplementation.uploadImage(image);

            achievementsDto.setPictureUrl("http://localhost:8081/api/"+path+fileName);

            return ResponseEntity.ok(achievementService.addAchievement(achievementsDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
