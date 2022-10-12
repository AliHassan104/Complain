package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.*;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.service.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/achievement")
    public ResponseEntity<Page<Achievements>> getAchievements(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                              @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){

            Page<Achievements> achievements = adminService.getAllAchievements(pageNumber,pageSize);
            return ResponseEntity.ok(achievements);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/address")
    public ResponseEntity<List<AddressDto>> getAddress(){
        List<AddressDto> address = adminService.getAllAddress();

        return ResponseEntity.ok(address);

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/area")
    public ResponseEntity<Page<Area>> getArea(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                              @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){

            Page<Area> area = adminService.getAllArea(pageNumber,pageSize);
            return ResponseEntity.ok(area);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/complain")
    public ResponseEntity<Page<Complain>> getComplain(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                      @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){

            Page<Complain> complain = adminService.getAllComplain(pageNumber,pageSize);
            return ResponseEntity.ok(complain);

    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/complaintype")
    public ResponseEntity<Page<ComplainType>> getComplainType(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                              @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){

            Page<ComplainType> complainType = adminService.getAllComplainType(pageNumber,pageSize);
            return ResponseEntity.ok(complainType);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/document")
    public ResponseEntity<Page<Document>> getDocument(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                      @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){

            Page<Document> document = adminService.getAllDocument(pageNumber,pageSize);
            return ResponseEntity.ok(document);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/pollinganswer")
    public ResponseEntity<List<PollingAnswer>> getPollingAnswer(){
        List<PollingAnswer> pollingAnswer = adminService.getAllPollingAnswer();

        return ResponseEntity.ok(pollingAnswer);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/pollingoption")
    public ResponseEntity<List<PollingOption>> getPollingOption(){
        List<PollingOption> pollingOption = adminService.getAllPollingOption();
        return ResponseEntity.ok(pollingOption);

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/pollingquestion")
    public ResponseEntity<Page<PollingQuestion>> getPollingQuestion(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                                    @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){

            Page<PollingQuestion> pollingQuestion = adminService.getAllPollingQuestion(pageNumber,pageSize);
            return ResponseEntity.ok(pollingQuestion);

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/user")
    public ResponseEntity<Page<User>> getUser(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                              @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){

            Page<User> user = adminService.getAllUsers(pageNumber,pageSize);
            return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/watertiming")
    public ResponseEntity<Page<WaterTiming>> getWaterTiming(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                            @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){

            Page<WaterTiming> waterTiming = adminService.getAllWaterTiming(pageNumber,pageSize);
            return ResponseEntity.ok(waterTiming);

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/complain/{id}")
    public ResponseEntity<ComplainDto> updateComplainById(@PathVariable Long id, @RequestBody ComplainDto complainDto){

            return ResponseEntity.ok(adminService.updateComplainById(id,complainDto));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/userstatus/{id}")
    public ResponseEntity<UserDto> updateUserStatusById(@PathVariable("id") Long id,@RequestBody UserDto userDto){

            return ResponseEntity.ok(adminService.updateUserStatusById(id,userDto));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/event")
    public ResponseEntity<Page<Event>> getAllEvent(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                     @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize){

            return ResponseEntity.ok(adminService.getAllEvents(pageNumber,pageSize));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/block")
    public ResponseEntity<Page<Block>> getAllBlocks(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                    @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){
            return ResponseEntity.ok(adminService.getAllBlocks(pageNumber,pageSize));
    }


}
