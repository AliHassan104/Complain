package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.ComplainTypeDto;
import com.company.ComplainProject.model.ComplainType;
import com.company.ComplainProject.service.ComplainTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ComplainTypeController {
    @Autowired
    ComplainTypeService complainTypeService;

    @GetMapping("/complaintype")
    public ResponseEntity<List<ComplainType>> getComplainType(){
        List<ComplainType> complainType = complainTypeService.getAllComplainType();
        return ResponseEntity.ok(complainType);

    }

    @GetMapping("/complaintype/{id}")
    public ResponseEntity<Optional<ComplainType>> getComplainById(@PathVariable Long id){
        Optional<ComplainType> complainType = complainTypeService.getComplainTypeById(id);
        return  ResponseEntity.ok(complainType);

    }

    @PostMapping("/complaintype")
    public ResponseEntity<ComplainTypeDto> addComplainType(@RequestBody ComplainTypeDto complainTypeDto){

        try{
            return ResponseEntity.ok(complainTypeService.addComplainType(complainTypeDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/complaintype/{id}")
    public ResponseEntity<Void> deleteComplainTypeById(@PathVariable Long id){
        System.out.println(id);
        try{
            complainTypeService.deleteComplainTypeById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/complaintype/{id}")
    public ResponseEntity<Optional<ComplainTypeDto>> updateComplainTypeById(@PathVariable Long id,@RequestBody ComplainTypeDto complainTypeDto){
        try{
            return ResponseEntity.ok(complainTypeService.updateComplainTypeById(id,complainTypeDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
