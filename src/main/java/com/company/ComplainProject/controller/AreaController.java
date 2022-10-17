package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.AreaDto;
import com.company.ComplainProject.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class AreaController {

    @Autowired
    private AreaService areaService;


    @GetMapping("/area")
    public ResponseEntity<List<AreaDto>> getArea(){
        List<AreaDto> area = areaService.getAllAreaDto();
        return ResponseEntity.ok(area);
    }


    @GetMapping("/area/{id}")
    public ResponseEntity<AreaDto> getAreaById(@PathVariable Long id){
        AreaDto area = areaService.getAreaById(id);
        return  ResponseEntity.ok(area);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/area")
    public ResponseEntity<AreaDto> addArea(@RequestBody AreaDto areaDto){
            return ResponseEntity.ok(areaService.addArea(areaDto));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/area/{id}")
    public ResponseEntity<Void> deleteAreaById(@PathVariable Long id){

            areaService.deleteAreaById(id);
            return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/area/{id}")
    public ResponseEntity<AreaDto> updateAreaById(@PathVariable Long id,@RequestBody AreaDto areaDto){
        try{
            return ResponseEntity.ok(areaService.updateAreaById(id,areaDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
