package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ComplainTypeDto;
import com.company.ComplainProject.dto.PollingQuestionDto;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.ComplainType;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.service.ComplainTypeService;
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
public class PollingQuestionController {
    @Autowired
    PollingQuestionService pollingQuestionService;

    @GetMapping("/pollingquestion")
    public ResponseEntity<List<PollingQuestion>> getPollingQuestion(@RequestParam(value = "pageNumber" ,defaultValue = "0",required = false) Integer pageNumber,
                                                                    @RequestParam(value = "pageSize",defaultValue = "2",required = false) Integer pageSize){
        List<PollingQuestion> pollingQuestion = pollingQuestionService.getAllPollingQuestionWithPagination(pageNumber,pageSize);
        if(!pollingQuestion.isEmpty()){
            return ResponseEntity.ok(pollingQuestion);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/pollingquestion/{id}")
    public ResponseEntity<Optional<PollingQuestion>> getComplainTypeById(@PathVariable Long id){
        Optional<PollingQuestion> pollingQuestion = pollingQuestionService.getPollingQuestionById(id);
        if(pollingQuestion.isPresent()){
            return  ResponseEntity.ok(pollingQuestion);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/pollingquestion")
    public ResponseEntity<PollingQuestionDto> addComplainType(@RequestBody PollingQuestionDto pollingQuestionDto){

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
    public ResponseEntity<Optional<PollingQuestionDto>> updateComplainTypeById(@PathVariable Long id,@RequestBody PollingQuestionDto pollingQuestionDto){
        try{
            return ResponseEntity.ok(pollingQuestionService.updatePollingQuestionById(id,pollingQuestionDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/pollingquestionByArea/{area_id}")
    public ResponseEntity<List<PollingQuestion>> getPollingQuestionArea(@PathVariable("area_id") Long areaId){
        try{
            return ResponseEntity.ok(pollingQuestionService.getPollingQuestionByArea(areaId));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No Polling Question Having Area id "+areaId);
        }
    }

//                                                     Show this api in get all polling question by user
//                                                     Polling questions for customer

    @GetMapping("/pollingquestion/notansweredbyuser/{user_id}")
    public ResponseEntity<List<PollingQuestion>> getPollingQuestionsNotAnsweredByUser(@PathVariable("user_id") Long id){
        try{
            return ResponseEntity.ok(pollingQuestionService.getPollingQuestionsNotAnsweredByUserService(id));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No questions for user id "+id);
        }
    }



}
