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
    public ResponseEntity<List<Achievements>> getAchievements(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                              @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<Achievements> assetBooking = adminService.getAllAchievements(pageNumber,pageSize);
        if(!assetBooking.isEmpty()){
            return ResponseEntity.ok(assetBooking);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/address")
    public ResponseEntity<List<Address>> getAddress(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                    @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<Address> address = adminService.getAllAddress(pageNumber,pageSize);
        if(!address.isEmpty()){
            return ResponseEntity.ok(address);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/area")
    public ResponseEntity<List<Area>> getArea(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                              @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<Area> assetBooking = adminService.getAllArea(pageNumber,pageSize);
        if(!assetBooking.isEmpty()){
            return ResponseEntity.ok(assetBooking);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/complain")
    public ResponseEntity<List<Complain>> getComplain(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                      @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<Complain> complain = adminService.getAllComplain(pageNumber,pageSize);
        if(!complain.isEmpty()){
            return ResponseEntity.ok(complain);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/complaintype")
    public ResponseEntity<List<ComplainType>> getComplainType(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                              @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<ComplainType> complainType = adminService.getAllComplainType(pageNumber,pageSize);
        if(!complainType.isEmpty()){
            return ResponseEntity.ok(complainType);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/document")
    public ResponseEntity<List<Document>> getDocument(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                      @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<Document> document = adminService.getAllDocument(pageNumber,pageSize);
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
    public ResponseEntity<List<PollingQuestion>> getPollingQuestion(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                                    @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<PollingQuestion> pollingQuestion = adminService.getAllPollingQuestion(pageNumber,pageSize);
        if(!pollingQuestion.isEmpty()){
            return ResponseEntity.ok(pollingQuestion);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getUser(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                              @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<User> user = adminService.getAllUsers(pageNumber,pageSize);
        if(!user.isEmpty()){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/watertiming")
    public ResponseEntity<List<WaterTiming>> getWaterTiming(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                            @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){
        List<WaterTiming> waterTiming = adminService.getAllWaterTiming(pageNumber,pageSize);
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
