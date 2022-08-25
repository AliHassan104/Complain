package com.company.ComplainProject.service;

//import com.company.ComplainProject.config.image.FileServiceImplementation;
import com.company.ComplainProject.config.image.FileServiceImplementation;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.ComplainTypeDto;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.ComplainType;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.ComplainTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ComplainService {
    @Autowired
    ComplainRepository complainRepository;
    @Autowired
    FileServiceImplementation fileServiceImplementation;

    public List<Complain> getAllComplain() {
        return complainRepository.findAll();
    }

    public Optional<Complain> getComplainTypeById(Long id) {
        return complainRepository.findById(id);
    }

    public void deleteComplainById(Long id) {
        complainRepository.deleteById(id);
    }

    public ComplainDto addComplain(ComplainDto complainDto) {
        return toDto(complainRepository.save(dto(complainDto)));
    }

    public Optional<ComplainDto> updateComplainById(Long id, ComplainDto complainDto) {
        Complain updateComplain = getAllComplain().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateComplain != null){
            updateComplain.setDescription(complainDto.getDescription());
            updateComplain.setPicture(complainDto.getPicture());
            updateComplain.setTitle(complainDto.getTitle());
            updateComplain.setSuggestionForImprovement(complainDto.getSuggestionForImprovement());
            updateComplain.setArea(complainDto.getArea());
            updateComplain.setUser(complainDto.getUser());
            updateComplain.setComplainType(complainDto.getComplainType());
            updateComplain.setDate(complainDto.getDate());
            updateComplain.setTime(complainDto.getTime());
        }
        return Optional.of(toDto(complainRepository.save(updateComplain)));
    }

    public Complain dto(ComplainDto complainDto){
        return Complain.builder()
                .id(complainDto.getId())
                .area(complainDto.getArea())
                .description(complainDto.getDescription())
                .picture(complainDto.getPicture())
                .title(complainDto.getTitle()).status(complainDto.getStatus())
                .suggestionForImprovement(complainDto.getSuggestionForImprovement())
                .complainType(complainDto.getComplainType())
                .user(complainDto.getUser())
                .date(complainDto.getDate())
                .time(complainDto.getTime())
                .build();
    }

    public ComplainDto toDto(Complain complain){
        return  ComplainDto.builder()
                .id(complain.getId())
                .area(complain.getArea())
                .description(complain.getDescription())
                .picture(complain.getPicture())
                .title(complain.getTitle())
                .suggestionForImprovement(complain.getSuggestionForImprovement())
                .complainType(complain.getComplainType())
                .user(complain.getUser())
                .date(complain.getDate())
                .time(complain.getTime())
                .build();
    }

    private final String imageFolderPath = Paths.get("C:\\Users\\Ali Hassan\\Desktop\\Complain\\complain\\images").toString();
//    @Override
    public InputStream getImageByName(String filename) throws FileNotFoundException {
        String assetImagePath = imageFolderPath+ File.separator+filename;
        InputStream inputStream = new FileInputStream(assetImagePath);
        return inputStream;
    }
}
