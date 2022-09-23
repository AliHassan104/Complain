package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.PollingAnswerDto;
import com.company.ComplainProject.dto.PollingOptionDto;
import com.company.ComplainProject.dto.PollingQuestionResult;
import com.company.ComplainProject.dto.filterPollingOptionResults;
import com.company.ComplainProject.model.PollingAnswer;
import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.PollingAnswerRepository;
import com.company.ComplainProject.repository.PollingOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PollingAnswerService {
    @Autowired
    PollingAnswerRepository pollingAnswerRepository;
    @Autowired
    UserService userService;
    @Autowired
    PollingQuestionService pollingQuestionService;

    public List<PollingAnswer> getAllPollingAnswer() {
        return pollingAnswerRepository.findAll();
    }

    public Optional<PollingAnswer> getPollingAnswerById(Long id) {
        return pollingAnswerRepository.findById(id);
    }

    public void deletePollingAnswerById(Long id) {
        pollingAnswerRepository.deleteById(id);
    }

    public PollingAnswerDto addPollingAnswer(PollingAnswerDto pollingAnswerDto) {
        return toDto(pollingAnswerRepository.save(dto(pollingAnswerDto)));
    }

    public Optional<PollingAnswerDto> updatePollingOptionById(Long id, PollingAnswerDto pollingAnswerDto) {
        PollingAnswer updatePollingAnswer = getAllPollingAnswer().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updatePollingAnswer != null){
//            updatePollingAnswer.setUser(pollingAnswerDto.getUser());
//            updatePollingAnswer.setPollingQuestion(pollingAnswerDto.getPollingQuestion());
            updatePollingAnswer.setPollingOption(pollingAnswerDto.getPollingOption());
        }
        return Optional.of(toDto(pollingAnswerRepository.save(updatePollingAnswer)));
    }

    public PollingAnswer dto(PollingAnswerDto pollingAnswerDto){
        return PollingAnswer.builder()
                .id(pollingAnswerDto.getId())
                .user(pollingAnswerDto.getUser())
                .pollingOption(pollingAnswerDto.getPollingOption())
                .pollingQuestion(pollingAnswerDto.getPollingQuestion())
                .build();
    }

    public PollingAnswerDto toDto(PollingAnswer pollingAnswer){
        return  PollingAnswerDto.builder()
                .id(pollingAnswer.getId())
                .user(pollingAnswer.getUser())
                .pollingOption(pollingAnswer.getPollingOption())
                .pollingQuestion(pollingAnswer.getPollingQuestion())
                .build();
    }

    public List<PollingQuestionResult> getPollingOptionPercent(Long id) {
        PollingQuestion pollingQuestion = pollingQuestionService.getAllPollingQuestion().stream().filter(pollingQuestion1 -> pollingQuestion1.getId().equals(id)).findAny().get();
        List<PollingQuestionResult> pollingQuestionResults = new ArrayList<>();

        for (PollingOption pollingOption:pollingQuestion.getPollingOptions()) {
            Map<String,Long> pollingResult = new HashMap<>();
            pollingResult.put(pollingOption.getOption(),pollingAnswerRepository.countUsersFromPollingOption(pollingOption));
            pollingQuestionResults.add(new PollingQuestionResult(pollingResult));

        }
//                                                  Sort the HashMap with largest value (Descending Order)
         Collections.sort(pollingQuestionResults,new filterPollingOptionResults());

        return pollingQuestionResults;
    }
}



