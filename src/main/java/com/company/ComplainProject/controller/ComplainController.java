package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.image.ComplainImageImplementation;
import com.company.ComplainProject.config.image.FileService;
import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.ComplainTypeDto;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.service.ComplainService;
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
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ComplainController {
    @Autowired
    ComplainService complainService;
    @Autowired
    ComplainImageImplementation complainImageImplementation;
    @Value("${complain.image}")
    private String path;

    @GetMapping("/complain")
    public ResponseEntity<List<Complain>> getComplain(){
        List<Complain> complain = complainService.getAllComplain();

        if(!complain.isEmpty()){
            return ResponseEntity.ok(complain);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/complain/{id}")
    public ResponseEntity<Optional<Complain>> getComplainById(@PathVariable Long id){
        Optional<Complain> complain = complainService.getComplainTypeById(id);
        if(complain.isPresent()){
            return  ResponseEntity.ok(complain);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

@PostMapping("/complain")
public ResponseEntity<ComplainDto> addComplain(@RequestParam("pictureUrl") MultipartFile image,
                                               @RequestParam("data") String userdata) {
    try{
        ObjectMapper mapper = new ObjectMapper();
        ComplainDto complainDto = mapper.readValue(userdata,ComplainDto.class);

        String  fileName = complainImageImplementation.uploadImage(image);


        complainDto.setPicture("http://localhost:8081/api/"+path+fileName);

        return ResponseEntity.ok(complainService.addComplain(complainDto));

    }catch (Exception e){
        System.out.println(e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

    @DeleteMapping("/complain/{id}")
    public ResponseEntity<Void> deleteComplainById(@PathVariable Long id){
        try{
            complainService.deleteComplainById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/complain/{id}")
    public ResponseEntity<ComplainDto> updateComplainTypeById(@PathVariable Long id,@RequestBody ComplainDto complainDto){
        try{
            return ResponseEntity.ok(complainService.updateComplainById(id,complainDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/complain/search")
    public ResponseEntity<List<ComplainDto>>  filteredAssetBooking(@RequestBody SearchCriteria searchCriteria){
        List<ComplainDto> complain = complainService.getFilteredComplain(searchCriteria);
        if(!complain.isEmpty()){
            return ResponseEntity.ok(complain);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
