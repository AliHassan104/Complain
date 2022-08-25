package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.PollingAnswerDto;
import com.company.ComplainProject.dto.PollingOptionDto;
import com.company.ComplainProject.model.PollingAnswer;
import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.service.PollingAnswerService;
import com.company.ComplainProject.service.PollingOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class PollingAnswerController {
    @Autowired
    PollingAnswerService pollingAnswerService;

    @GetMapping("/pollinganswer")
    public ResponseEntity<List<PollingAnswer>> getPollingAnswer(){
        List<PollingAnswer> pollingAnswer = pollingAnswerService.getAllPollingAnswer();
        if(!pollingAnswer.isEmpty()){
            return ResponseEntity.ok(pollingAnswer);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/pollinganswer/{id}")
    public ResponseEntity<Optional<PollingAnswer>> getPollingAnswerById(@PathVariable Long id){
        Optional<PollingAnswer> pollingAnswer = pollingAnswerService.getPollingAnswerById(id);
        if(pollingAnswer.isPresent()){
            return  ResponseEntity.ok(pollingAnswer);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/pollinganswer")
    public ResponseEntity<PollingAnswerDto> addPollingAnswer(@RequestBody PollingAnswerDto pollingAnswerDto){
        System.out.println(pollingAnswerDto);
        try{
            return ResponseEntity.ok(pollingAnswerService.addPollingAnswer(pollingAnswerDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/pollinganswer/{id}")
    public ResponseEntity<Void> deletePollingAnswerById(@PathVariable Long id){
        try{
            pollingAnswerService.deletePollingAnswerById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/pollinganswer/{id}")
    public ResponseEntity<Optional<PollingAnswerDto>> updatePollingAnswerDtoById(@PathVariable Long id,@RequestBody PollingAnswerDto pollingAnswerDto){
        try{
            return ResponseEntity.ok(pollingAnswerService.updatePollingOptionById(id,pollingAnswerDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
