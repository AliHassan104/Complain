package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.AreaDto;
import com.company.ComplainProject.dto.ComplainTypeDto;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.ComplainType;
import com.company.ComplainProject.repository.AreaRepository;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.ComplainTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplainTypeService {
    @Autowired
    ComplainTypeRepository complainTypeRepository;

    public List<ComplainType> getAllComplainType() {
        return complainTypeRepository.findAll();
    }

    public Optional<ComplainType> getComplainTypeById(Long id) {
        return complainTypeRepository.findById(id);
    }

    public void deleteComplainTypeById(Long id) {
        complainTypeRepository.deleteById(id);
    }

    public ComplainTypeDto addComplainType(ComplainTypeDto complainTypeDto) {
        return toDto(complainTypeRepository.save(dto(complainTypeDto)));
    }

    public Optional<ComplainTypeDto> updateComplainTypeById(Long id, ComplainTypeDto complainTypeDto) {
        ComplainType updateComplainType = getAllComplainType().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateComplainType != null){
            updateComplainType.setName(complainTypeDto.getName());
        }
        return Optional.of(toDto(complainTypeRepository.save(updateComplainType)));
    }

    public ComplainType dto(ComplainTypeDto complainTypeDto){
        return ComplainType.builder().id(complainTypeDto.getId()).name(complainTypeDto.getName())
                .build();
    }

    public ComplainTypeDto toDto(ComplainType complainType){
        return  ComplainTypeDto.builder().id(complainType.getId()).name(complainType.getName())
                .build();
    }
}
