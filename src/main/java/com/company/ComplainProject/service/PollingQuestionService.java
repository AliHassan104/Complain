package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.PollingQuestionDto;
import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.repository.PollingOptionRepository;
import com.company.ComplainProject.repository.PollingQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;

@Service
public class PollingQuestionService {
    @Autowired
    PollingQuestionRepository pollingQuestionRepository;
    @Autowired
    PollingOptionRepository pollingOptionRepository;

    public List<PollingQuestion> getAllPollingQuestion() {
        return pollingQuestionRepository.findAll();
    }

    public Optional<PollingQuestion> getPollingQuestionById(Long id) {
        return pollingQuestionRepository.findById(id);
    }

    public void deletePollingQuestionById(Long id) {
        pollingQuestionRepository.deleteById(id);
    }

    public PollingQuestionDto addPollingQuestion(PollingQuestionDto pollingQuestionDto) {
        return toDto(pollingQuestionRepository.save(dto(pollingQuestionDto)));
    }

    public Optional<PollingQuestionDto> updatePollingQuestionById(Long id, PollingQuestionDto pollingQuestionDto) {
        PollingQuestion updatePollingQuestion = getAllPollingQuestion().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updatePollingQuestion != null){
//                                                                                           first we will delete the previous options
                pollingOptionRepository.deleteOptionByid(updatePollingQuestion.getId());

            updatePollingQuestion.setQuestion(pollingQuestionDto.getQuestion());
            updatePollingQuestion.setPollingOptions(pollingQuestionDto.getPollingOptions());
        }
        return Optional.of(toDto(pollingQuestionRepository.save(updatePollingQuestion)));
    }

    public PollingQuestion dto(PollingQuestionDto pollingQuestionDto){
        return PollingQuestion.builder().id(pollingQuestionDto.getId()).question(pollingQuestionDto.getQuestion())
                .pollingOptions(pollingQuestionDto.getPollingOptions()).build();
    }

    public PollingQuestionDto toDto(PollingQuestion pollingQuestion){
        return  PollingQuestionDto.builder().id(pollingQuestion.getId()).question(pollingQuestion.getQuestion())
                .pollingOptions(pollingQuestion.getPollingOptions()).build();
    }
}
