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
        if(!waterTiming.isEmpty()){
            return ResponseEntity.ok(waterTiming);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


    @GetMapping("/watertiming/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    public ResponseEntity<Optional<WaterTiming>> getWaterTimingById(@PathVariable Long id){
        Optional<WaterTiming> waterTiming = waterTimingService.getWaterTimingById(id);
        if(waterTiming.isPresent()){
            return  ResponseEntity.ok(waterTiming);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/watertiming")
    public ResponseEntity<WaterTimingDto> addWaterTiming(@RequestBody WaterTimingDto waterTimingDto){
        try{
            return ResponseEntity.ok(waterTimingService.addWaterTiming(waterTimingDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
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
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Optional<WaterTimingDto>> updateAchievementById(@PathVariable Long id,@RequestBody WaterTimingDto waterTimingDto){
        try{
            System.out.println("Water timing dto object "+waterTimingDto);
            return ResponseEntity.ok(waterTimingService.updateWaterTimingById(id,waterTimingDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//                                                  Get water timing by Area

    @GetMapping("watertimingByArea/{area}")
    public ResponseEntity<List<WaterTiming>> getWaterTimingByArea(@PathVariable("area") Long areaId){
        try{
            return ResponseEntity.ok(waterTimingService.getWaterTimingByArea(areaId));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("Water timing having area id "+areaId+" not exist");
        }
    }
//                                                          get water timing by block
    @GetMapping("watertimingByBlock/{block_id}")
    public ResponseEntity<List<WaterTiming>> getWaterTimingsByBlock(@PathVariable("block_id") Long blockId){
        try {
            return ResponseEntity.ok(waterTimingService.getWaterTimingByBlock(blockId));
        }
        catch (Exception e){
            System.out.println(e+" Exception in getting water timing by block");
            throw new ContentNotFoundException("Water timing having block id "+blockId+" not exist");
        }
    }

    @GetMapping("watertiming/allWatertimingByBlock")
    public ResponseEntity<List<WaterTimingByBlockDto>> getAllWaterTimingByBlock(){
        try{
            return ResponseEntity.ok(waterTimingService.getAllWaterTimingByBlock());
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No water timing available");
        }
    }

}
