package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @GetMapping("/achievement")
    public ResponseEntity<List<Achievements>> getAchievements(){
        List<Achievements> assetBooking = adminService.getAllAchievements();
        if(!assetBooking.isEmpty()){
            return ResponseEntity.ok(assetBooking);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/address")
    public ResponseEntity<List<Address>> getAddress(){
        List<Address> address = adminService.getAllAddress();
        if(!address.isEmpty()){
            return ResponseEntity.ok(address);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/area")
    public ResponseEntity<List<Area>> getArea(){
        List<Area> assetBooking = adminService.getAllArea();
        if(!assetBooking.isEmpty()){
            return ResponseEntity.ok(assetBooking);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/complain")
    public ResponseEntity<List<Complain>> getComplain(){
        List<Complain> complain = adminService.getAllComplain();
        if(!complain.isEmpty()){
            return ResponseEntity.ok(complain);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/complaintype")
    public ResponseEntity<List<ComplainType>> getComplainType(){
        List<ComplainType> complainType = adminService.getAllComplainType();
        if(!complainType.isEmpty()){
            return ResponseEntity.ok(complainType);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/document")
    public ResponseEntity<List<Document>> getDocument(){
        List<Document> document = adminService.getAllDocument();
        if(!document.isEmpty()){
            return ResponseEntity.ok(document);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/pollinganswer")
    public ResponseEntity<List<PollingAnswer>> getPollingAnswer(){
        List<PollingAnswer> pollingAnswer = adminService.getAllPollingAnswer();
        if(!pollingAnswer.isEmpty()){
            return ResponseEntity.ok(pollingAnswer);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/pollingoption")
    public ResponseEntity<List<PollingOption>> getPollingOption(){
        List<PollingOption> pollingOption = adminService.getAllPollingOption();
        if(!pollingOption.isEmpty()){
            return ResponseEntity.ok(pollingOption);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/pollingquestion")
    public ResponseEntity<List<PollingQuestion>> getPollingQuestion(){
        List<PollingQuestion> pollingQuestion = adminService.getAllPollingQuestion();
        if(!pollingQuestion.isEmpty()){
            return ResponseEntity.ok(pollingQuestion);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getUser(){
        List<User> user = adminService.getAllUsers();
        if(!user.isEmpty()){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/watertiming")
    public ResponseEntity<List<WaterTiming>> getWaterTiming(){
        List<WaterTiming> waterTiming = adminService.getAllWaterTiming();
        if(!waterTiming.isEmpty()){
            return ResponseEntity.ok(waterTiming);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

//    @PutMapping("/complain/{id}")
    @PatchMapping("/complain/{id}")
    public ResponseEntity<ComplainDto> updateComplainTypeById(@PathVariable Long id, @RequestBody ComplainDto complainDto){
        try{
            return ResponseEntity.ok(adminService.updateComplainById(id,complainDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
