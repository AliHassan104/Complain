package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.DocumentDto;
import com.company.ComplainProject.dto.WaterTimingDto;
import com.company.ComplainProject.model.Document;
import com.company.ComplainProject.model.WaterTiming;
import com.company.ComplainProject.service.DocumentService;
import com.company.ComplainProject.service.WaterTimingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class WaterTimingController {
    @Autowired
    WaterTimingService waterTimingService;

    @GetMapping("/watertiming")
    public ResponseEntity<List<WaterTiming>> getWaterTiming(){
        List<WaterTiming> waterTiming = waterTimingService.getAllWaterTiming();
        if(!waterTiming.isEmpty()){
            return ResponseEntity.ok(waterTiming);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/watertiming/{id}")
    public ResponseEntity<Optional<WaterTiming>> getWaterTimingById(@PathVariable Long id){
        Optional<WaterTiming> waterTiming = waterTimingService.getWaterTimingById(id);
        if(waterTiming.isPresent()){
            return  ResponseEntity.ok(waterTiming);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/watertiming")
    public ResponseEntity<WaterTimingDto> addWaterTiming(@RequestBody WaterTimingDto waterTimingDto){
        try{
            return ResponseEntity.ok(waterTimingService.addWaterTiming(waterTimingDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/watertiming/{id}")
    public ResponseEntity<Void> deleteWaterTimingById(@PathVariable Long id){
        try{
            waterTimingService.deleteWaterTimingById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/watertiming/{id}")
    public ResponseEntity<Optional<WaterTimingDto>> updateAchievementById(@PathVariable Long id,@RequestBody WaterTimingDto waterTimingDto){
        try{
            return ResponseEntity.ok(waterTimingService.updateWaterTimingById(id,waterTimingDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
