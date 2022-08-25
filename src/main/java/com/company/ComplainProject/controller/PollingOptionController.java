package com.company.ComplainProject.controller;


import com.company.ComplainProject.dto.PollingOptionDto;
import com.company.ComplainProject.dto.PollingQuestionDto;
import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.service.PollingOptionService;
import com.company.ComplainProject.service.PollingQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class PollingOptionController {
    @Autowired
    PollingOptionService pollingOptionService;

    @GetMapping("/pollingoption")
    public ResponseEntity<List<PollingOption>> getPollingOption(){
        List<PollingOption> pollingOption = pollingOptionService.getAllPollingOption();
        if(!pollingOption.isEmpty()){
            return ResponseEntity.ok(pollingOption);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/pollingoption/{id}")
    public ResponseEntity<Optional<PollingOption>> getPollingOptionById(@PathVariable Long id){
        Optional<PollingOption> pollingOption = pollingOptionService.getPollingOptionById(id);
        if(pollingOption.isPresent()){
            return  ResponseEntity.ok(pollingOption);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/pollingoption")
    public ResponseEntity<PollingOptionDto> addPollingOption(@RequestBody PollingOptionDto pollingOptionDto){
        System.out.println(pollingOptionDto);
        try{
            return ResponseEntity.ok(pollingOptionService.addPollingOption(pollingOptionDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/pollingoption/{id}")
    public ResponseEntity<Void> deletePollingOptionById(@PathVariable Long id){
        try{
            pollingOptionService.deletePollingOptionById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/pollingoption/{id}")
    public ResponseEntity<Optional<PollingOptionDto>> updatePollingOptionDtoById(@PathVariable Long id,@RequestBody PollingOptionDto pollingOptionDto){
        try{
            return ResponseEntity.ok(pollingOptionService.updatePollingOptionById(id,pollingOptionDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
