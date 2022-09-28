package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.PollingQuestionDto;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.repository.PollingAnswerRepository;
import com.company.ComplainProject.repository.PollingOptionRepository;
import com.company.ComplainProject.repository.PollingQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
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
    @Autowired
    AreaService areaService;
    @Autowired
    PollingAnswerRepository pollingAnswerRepository;
    @Autowired
    UserService userService;

    public List<PollingQuestion> getAllPollingQuestion(){
        return pollingQuestionRepository.findAll();
    }
    public List<PollingQuestion> getAllPollingQuestionWithPagination(Integer pageNumber,Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<PollingQuestion> pollingQuestionPage = pollingQuestionRepository.findAll(pageable);
        List<PollingQuestion> pollingQuestions = pollingQuestionPage.getContent();

        return pollingQuestions;
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
        Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(pollingQuestionDto.getArea().getId())).findAny().get();

        if(updatePollingQuestion != null){
//                                                                                           first we will delete the previous options
            pollingOptionRepository.deleteOptionByid(updatePollingQuestion.getId());

            updatePollingQuestion.setEnd_date(pollingQuestionDto.getEnd_date());
            updatePollingQuestion.setEnd_time(pollingQuestionDto.getEnd_time());
            updatePollingQuestion.setQuestion(pollingQuestionDto.getQuestion());
            updatePollingQuestion.setPollingOptions(pollingQuestionDto.getPollingOptions());
            updatePollingQuestion.setArea(area);
        }
        return Optional.of(toDto(pollingQuestionRepository.save(updatePollingQuestion)));
    }

    public PollingQuestion dto(PollingQuestionDto pollingQuestionDto){
        return PollingQuestion.builder().id(pollingQuestionDto.getId()).question(pollingQuestionDto.getQuestion()).area(pollingQuestionDto.getArea())
                .end_date(pollingQuestionDto.getEnd_date()).end_time(pollingQuestionDto.getEnd_time()).pollingOptions(pollingQuestionDto.getPollingOptions()).build();
    }

    public PollingQuestionDto toDto(PollingQuestion pollingQuestion){
        return  PollingQuestionDto.builder().id(pollingQuestion.getId()).question(pollingQuestion.getQuestion()).area(pollingQuestion.getArea())
                .end_date(pollingQuestion.getEnd_date()).end_time(pollingQuestion.getEnd_time()).pollingOptions(pollingQuestion.getPollingOptions()).build();
    }

    public List<PollingQuestion> getPollingQuestionByArea(Long areaId) {
        Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(areaId)).findAny().get();
        return pollingQuestionRepository.findPollingQuestionByArea(area);
    }

    public List<PollingQuestion> getPollingQuestionsNotAnsweredByUserService(Long user_id) {
        List<PollingQuestion> showPollingQuestions = new ArrayList<>();

        User user = userService.getAllUser().stream().filter(user1 -> user1.getId().equals(user_id)).findAny().get();
        List<PollingQuestion> attemptedQuestions = pollingAnswerRepository.getAttemptedPollingQuestionsByUser(user);

//                                                                      Attempted Polling Questions
        List<Long> attemptedPollingQuestionsId = new ArrayList<>();
        if(!attemptedQuestions.isEmpty()) {
            attemptedQuestions.stream().forEach(pollingAnswer -> attemptedPollingQuestionsId.add(pollingAnswer.getId()));
        }
//                                                                      All Polling Questions by area
        List<Long> getPollingQuestionId = new ArrayList<>();
        List<PollingQuestion> pollingQuestionsByArea = getPollingQuestionByArea(user.getArea().getId());

        if(!pollingQuestionsByArea.isEmpty()) {
            for (PollingQuestion pollingQuestion:pollingQuestionsByArea) {

                if(pollingQuestion.getEnd_date().isEqual(LocalDate.now())){
                    if(LocalTime.now().isBefore(pollingQuestion.getEnd_time())){
                        getPollingQuestionId.add(pollingQuestion.getId());
                    }
                }
                else{
                    if(LocalDate.now().isBefore(pollingQuestion.getEnd_date())){
                        getPollingQuestionId.add(pollingQuestion.getId());
                    }
                }

            }
//            pollingQuestionsByArea.stream().forEach(pollingQuestion -> getPollingQuestionId.add(pollingQuestion.getId()));
        }

        getPollingQuestionId.removeAll(attemptedPollingQuestionsId);

        if(!getPollingQuestionId.isEmpty()) {
            for (Long pollingQuestionId : getPollingQuestionId) {
                showPollingQuestions.add(pollingQuestionRepository.findPollingQuestionById(pollingQuestionId));
            }
        }

        return showPollingQuestions;
    }
}
