package com.company.ComplainProject.service;

//import com.company.ComplainProject.config.image.ComplainImageImplementation;
import com.company.ComplainProject.config.image.ComplainImageImplementation;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.specification.ComplainSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComplainService {
    @Autowired
    ComplainRepository complainRepository;
    @Autowired
    ComplainImageImplementation complainImageImplementation;

    private final String imageFolderPath = Paths.get("src/main/resources/static/complain/images").toAbsolutePath().toString();

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

    public ComplainDto updateComplainById(Long id, ComplainDto complainDto) {
        Complain updateComplain = getAllComplain().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateComplain != null){
            updateComplain.setDescription(complainDto.getDescription());
            updateComplain.setPicture(complainDto.getPicture());
            updateComplain.setTitle(complainDto.getTitle());
            updateComplain.setSuggestionForImprovement(complainDto.getSuggestionForImprovement());
            updateComplain.setArea(complainDto.getArea());
            updateComplain.setUser(complainDto.getUser());
            updateComplain.setComplainType(complainDto.getComplainType());
//            updateComplain.setDate(complainDto.getDate());
//            updateComplain.setTime(complainDto.getTime());
        }
        return toDto(complainRepository.save(updateComplain));
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

    public List<ComplainDto> getFilteredComplain(SearchCriteria searchCriteria) {
        ComplainSpecification complainSpecification = new ComplainSpecification(searchCriteria);
        List<Complain> complains = complainRepository.findAll(complainSpecification);
        return complains.stream().map(el->toDto(el)).collect(Collectors.toList());
    }

    public InputStream getImageByName(String filename) throws FileNotFoundException {
        try{
            String assetImagePath = imageFolderPath+ File.separator+filename;
            InputStream inputStream = new FileInputStream(assetImagePath);
            return inputStream;
        }
        catch (Exception e){
            System.out.println("Image not exist in Complain "+e);
            throw new FileNotFoundException("Image not exist in Complain");
        }

    }

}
