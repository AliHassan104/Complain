package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.dto.AreaDto;
import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class AreaController {

    @Autowired
    AreaService areaService;

    @GetMapping("/area")
    public ResponseEntity<List<Area>> getArea(){
        List<Area> assetBooking = areaService.getAllArea();
        if(!assetBooking.isEmpty()){
            return ResponseEntity.ok(assetBooking);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/area/{id}")
    public ResponseEntity<Optional<Area>> getAreaById(@PathVariable Long id){
        Optional<Area> asset = areaService.getAreaById(id);
        if(asset.isPresent()){
            return  ResponseEntity.ok(asset);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/area")
    public ResponseEntity<AreaDto> addAchievements(@RequestBody AreaDto areaDto){
        System.out.println(areaDto);
        try{
            return ResponseEntity.ok(areaService.addArea(areaDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/area/{id}")
    public ResponseEntity<Void> deleteAchievementById(@PathVariable Long id){
        try{
            areaService.deleteAreaById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/area/{id}")
    public ResponseEntity<Optional<AreaDto>> updateAchievementById(@PathVariable Long id,@RequestBody AreaDto areaDto){
        try{
            return ResponseEntity.ok(areaService.updateAchievementById(id,areaDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
