package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.PollingQuestionDto;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.service.PollingQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api")
public class PollingQuestionController {

    @Autowired
    PollingQuestionService pollingQuestionService;

    @GetMapping("/pollingquestion")
    public ResponseEntity<List<PollingQuestion>> getPollingQuestion(@RequestParam(value = "pageNumber" ,defaultValue = "0",required = false) Integer pageNumber,
                                                                    @RequestParam(value = "pageSize",defaultValue = "2",required = false) Integer pageSize){
        List<PollingQuestion> pollingQuestion = pollingQuestionService.getAllPollingQuestionWithPagination(pageNumber,pageSize);
        return ResponseEntity.ok(pollingQuestion);

    }

    @GetMapping("/pollingquestion/{id}")
    public ResponseEntity<Optional<PollingQuestion>> getPollingQuestionById(@PathVariable Long id){
        Optional<PollingQuestion> pollingQuestion = pollingQuestionService.getPollingQuestionById(id);
        return  ResponseEntity.ok(pollingQuestion);
    }

    @PostMapping("/pollingquestion")
    public ResponseEntity<PollingQuestionDto> addPollingQuestion(@RequestBody PollingQuestionDto pollingQuestionDto){

        try{
            return ResponseEntity.ok(pollingQuestionService.addPollingQuestion(pollingQuestionDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/pollingquestion/{id}")
    public ResponseEntity<Void> deletePollingQuestionById(@PathVariable Long id){
        try{
            pollingQuestionService.deletePollingQuestionById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/pollingquestion/{id}")
    public ResponseEntity<Optional<PollingQuestionDto>> updatePollingQuestionById(@PathVariable Long id,@RequestBody PollingQuestionDto pollingQuestionDto){

            return ResponseEntity.ok(pollingQuestionService.updatePollingQuestionById(id,pollingQuestionDto));

    }

    @GetMapping("/pollingquestionbyarea/{area_id}")
    public ResponseEntity<List<PollingQuestion>> getPollingQuestionArea(@PathVariable("area_id") Long areaId){
        try{
            return ResponseEntity.ok(pollingQuestionService.getPollingQuestionByArea(areaId));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No Polling Question Having Area id "+areaId);
        }
    }

//                      get the polling questions for customers

    @GetMapping("/pollingquestion/get-all-pollingquestion-for-user")
    public ResponseEntity<List<PollingQuestion>> getAllPollingQuestionsByUser(){
        return ResponseEntity.ok(pollingQuestionService.getAllPollingQuestionByUser());
    }




}
