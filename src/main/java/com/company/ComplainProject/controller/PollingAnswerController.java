package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.PollingAnswerDto;
import com.company.ComplainProject.dto.PollingOptionDto;
import com.company.ComplainProject.dto.PollingQuestionResult;
import com.company.ComplainProject.model.PollingAnswer;
import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.service.PollingAnswerService;
import com.company.ComplainProject.service.PollingOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class PollingAnswerController {
    @Autowired
    PollingAnswerService pollingAnswerService;

    @GetMapping("/pollinganswer")
    public ResponseEntity<List<PollingAnswer>> getPollingAnswer(){
        List<PollingAnswer> pollingAnswer = pollingAnswerService.getAllPollingAnswer();

        return ResponseEntity.ok(pollingAnswer);

    }

    @GetMapping("/pollinganswer/{id}")
    public ResponseEntity<Optional<PollingAnswer>> getPollingAnswerById(@PathVariable Long id){
        Optional<PollingAnswer> pollingAnswer = pollingAnswerService.getPollingAnswerById(id);
        if(pollingAnswer.isPresent()){
            return  ResponseEntity.ok(pollingAnswer);
        }
        throw new ContentNotFoundException("Polling answer not exist having id "+id);
    }

    @PostMapping("/pollinganswer")
    public ResponseEntity<PollingAnswerDto> addPollingAnswer(@RequestBody PollingAnswerDto pollingAnswerDto){
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

//     get polling option result (which will be given by user)
    
    @GetMapping("/pollinganswer/getpollingoptionresult/{id}")
    public ResponseEntity<PollingQuestionResult> getPollingOptionResult(@PathVariable("id") Long id){
        try{
            return ResponseEntity.ok(pollingAnswerService.getPollingOptionResult(id));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("Nu polling question");
        }
    }


}
