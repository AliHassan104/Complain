package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.PollingOptionDto;
import com.company.ComplainProject.dto.PollingQuestionDto;
import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.repository.PollingOptionRepository;
import com.company.ComplainProject.repository.PollingQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PollingOptionService {
    @Autowired
    PollingOptionRepository pollingOptionRepository;

    public List<PollingOption> getAllPollingOption() {
        return pollingOptionRepository.findAll();
    }

    public Optional<PollingOption> getPollingOptionById(Long id) {
        return pollingOptionRepository.findById(id);
    }

    public void deletePollingOptionById(Long id) {
        pollingOptionRepository.deleteById(id);
    }

    public PollingOptionDto addPollingOption(PollingOptionDto pollingOptionDto) {
        return toDto(pollingOptionRepository.save(dto(pollingOptionDto)));
    }

    public Optional<PollingOptionDto> updatePollingOptionById(Long id, PollingOptionDto pollingOptionDto) {
        PollingOption updatePollingOption = getAllPollingOption().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updatePollingOption != null){
            updatePollingOption.setOption(pollingOptionDto.getOption());
            updatePollingOption.setPollingQuestion(pollingOptionDto.getPollingQuestion());
        }
        return Optional.of(toDto(pollingOptionRepository.save(updatePollingOption)));
    }

    public PollingOption dto(PollingOptionDto pollingOptionDto){
        return PollingOption.builder()
                .id(pollingOptionDto.getId())
                .option(pollingOptionDto.getOption())
                .pollingQuestion(pollingOptionDto.getPollingQuestion())
                .build();
    }

    public PollingOptionDto toDto(PollingOption pollingOption){
        return  PollingOptionDto.builder()
                .id(pollingOption.getId())
                .option(pollingOption.getOption())
                .pollingQuestion(pollingOption.getPollingQuestion())
                .build();
    }
}
