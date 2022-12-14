package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.*;
import com.company.ComplainProject.model.PollingAnswer;
import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.PollingAnswerRepository;
import com.company.ComplainProject.repository.PollingQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PollingAnswerService {
    @Autowired
    private PollingAnswerRepository pollingAnswerRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private PollingQuestionService pollingQuestionService;
    @Autowired
    private PollingOptionService pollingOptionService;
    @Autowired
    private SessionService service;
    @Autowired
    private PollingQuestionRepository pollingQuestionRepository;

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
        User user = service.getLoggedInUser();
        PollingQuestion pollingQuestion = pollingQuestionService.getAllPollingQuestion().stream().filter(pollingQuestion1 -> pollingQuestion1.getId().equals(pollingAnswerDto.getPollingQuestion().getId())).findAny().get();
        PollingOption pollingOption = pollingOptionService.getAllPollingOption().stream().filter(pollingOption1 -> pollingOption1.getId().equals(pollingAnswerDto.getPollingOption().getId())).findAny().get();

        pollingAnswerDto.setUser(userService.userToUserDetailsResponse(user));
        pollingAnswerDto.setPollingQuestion(pollingQuestion);
        pollingAnswerDto.setPollingOption(pollingOption);

        return toDto(pollingAnswerRepository.save(dto(pollingAnswerDto)));
    }

    public Optional<PollingAnswerDto> updatePollingOptionById(Long id, PollingAnswerDto pollingAnswerDto) {
        PollingAnswer updatePollingAnswer = getAllPollingAnswer().stream().filter(el->el.getId().equals(id)).findAny().get();
        PollingOption pollingOption = pollingOptionService.getAllPollingOption().stream().filter(pollingOption1 -> pollingOption1.getId().equals(pollingAnswerDto.getPollingOption().getId())).findAny().get();

        if(updatePollingAnswer != null){
            updatePollingAnswer.setPollingOption(pollingAnswerDto.getPollingOption());
        }
        return Optional.of(toDto(pollingAnswerRepository.save(updatePollingAnswer)));
    }

    public PollingAnswer dto(PollingAnswerDto pollingAnswerDto){
        return PollingAnswer.builder()
                .id(pollingAnswerDto.getId())
                .user(userService.userDetailResponseToUser(pollingAnswerDto.getUser()))
                .pollingOption(pollingAnswerDto.getPollingOption())
                .pollingQuestion(pollingAnswerDto.getPollingQuestion())
                .build();
    }

    public PollingAnswerDto toDto(PollingAnswer pollingAnswer){
        return  PollingAnswerDto.builder()
                .id(pollingAnswer.getId())
                .user(userService.userToUserDetailsResponse(pollingAnswer.getUser()))
                .pollingOption(pollingAnswer.getPollingOption())
                .pollingQuestion(pollingAnswer.getPollingQuestion())
                .build();
    }

    public PollingQuestionResult getPollingOptionResult(Long polling_question) {
        Optional<PollingQuestion> pollingQuestion = pollingQuestionRepository.findById(polling_question);

        try {
            List<PollingOptionResponseDto> pollingOptionCountDtos = pollingAnswerRepository.getPollingOptionResult(polling_question);
            return new PollingQuestionResult(pollingQuestion.get().getId(),pollingQuestion.get().getQuestion(),pollingOptionCountDtos);
        }
        catch (Exception e){
            throw new ContentNotFoundException("Exception "+e);
        }
    }



}



