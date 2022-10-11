package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.WaterTimingByBlockDto;
import com.company.ComplainProject.dto.WaterTimingDto;
import com.company.ComplainProject.model.WaterTiming;
import com.company.ComplainProject.service.WaterTimingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class WaterTimingController {

    @Autowired
    WaterTimingService waterTimingService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    @GetMapping("/watertiming")
    public ResponseEntity<List<WaterTiming>> getWaterTiming(){
        List<WaterTiming> waterTiming = waterTimingService.getAllWaterTiming();
        return ResponseEntity.ok(waterTiming);

    }


    @GetMapping("/watertiming/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    public ResponseEntity<Optional<WaterTiming>> getWaterTimingById(@PathVariable Long id){
        Optional<WaterTiming> waterTiming = waterTimingService.getWaterTimingById(id);
        return  ResponseEntity.ok(waterTiming);
    }


//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/watertiming")
    public ResponseEntity<WaterTimingDto> addWaterTiming(@RequestBody WaterTimingDto waterTimingDto){

            return ResponseEntity.ok(waterTimingService.addWaterTiming(waterTimingDto));
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/watertiming/{id}")
    public ResponseEntity<Void> deleteWaterTimingById(@PathVariable Long id){
            waterTimingService.deleteWaterTimingById(id);
            return ResponseEntity.ok().build();
    }

    @PutMapping("/watertiming/{id}")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<WaterTimingDto> updateAchievementById(@PathVariable Long id,@RequestBody WaterTimingDto waterTimingDto){

            return ResponseEntity.ok(waterTimingService.updateWaterTimingById(id,waterTimingDto));
    }

//                                                  Get water timing by Area

    @GetMapping("watertimingByArea/{area}")
    public ResponseEntity<List<WaterTiming>> getWaterTimingByArea(@PathVariable("area") Long areaId){

            return ResponseEntity.ok(waterTimingService.getWaterTimingByArea(areaId));
    }
//                                                          get water timing by block
    @GetMapping("watertimingByBlock/{block_id}")
    public ResponseEntity<List<WaterTiming>> getWaterTimingsByBlock(@PathVariable("block_id") Long blockId){

            return ResponseEntity.ok(waterTimingService.getWaterTimingByBlock(blockId));
    }

    @GetMapping("watertiming/allWatertimingByBlock")
    public ResponseEntity<List<WaterTimingByBlockDto>> getAllWaterTimingByBlock(){

            return ResponseEntity.ok(waterTimingService.getAllWaterTimingByBlock());
    }

}
