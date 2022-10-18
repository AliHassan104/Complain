package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
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

    public PollingQuestionResult getPollingOptionResult(Long id) {
        Optional<PollingQuestion> pollingQuestion = pollingQuestionRepository.findById(id);

        List<Map<String,Long>> optionResult = new ArrayList<>();

        for (PollingOption pollingOption:pollingQuestion.get().getPollingOptions()) {
            Map<String,Long> pollingResult = new HashMap<>();
            pollingResult.put(pollingOption.getOption(),pollingAnswerRepository.countUsersFromPollingOption(pollingOption));

            optionResult.add(pollingResult);
        }
//                                                                                              Sort the HashMap with largest value (Descending Order)
         Collections.sort(optionResult,new filterPollingOptionResults());

        return new PollingQuestionResult(pollingQuestion.get().getId(),pollingQuestion.get().getQuestion(),optionResult);
    }
}



