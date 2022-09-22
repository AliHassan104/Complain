package com.company.ComplainProject.service;

//import com.company.ComplainProject.config.image.ComplainImageImplementation;
import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.config.image.ComplainImageImplementation;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.ComplainType;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.specification.ComplainSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComplainService {
    @Autowired
    ComplainRepository complainRepository;

    @Autowired
    UserService userService;
    @Autowired
    AreaService areaService;
    @Autowired
    ComplainTypeService complainTypeService;


    private final String imageFolderPath = Paths.get("src/main/resources/static/complain/images").toAbsolutePath().toString();

    public List<Complain> getAllComplain() {
        return complainRepository.findAll();
    }
    public List<Complain> getAllComplainsWithPagination(Integer pageNumber,Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Complain> complainPage = complainRepository.findAll(pageable);
        List<Complain> complains = complainPage.getContent();

        return  complains;
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
        Complain updateComplain = getAllComplain().stream().filter(complain -> complain.getId().equals(id)).findAny().get();
        User user = userService.getAllUser().stream().filter(user1 -> user1.getId().equals(complainDto.getUser().getId())).findAny().get();
        Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(complainDto.getArea().getId())).findAny().get();
        ComplainType complainType = complainTypeService.getAllComplainType().stream().filter(complainType1 -> complainType1.getId().equals(complainDto.getComplainType().getId())).findAny().get();
        if(updateComplain != null){
            updateComplain.setDescription(complainDto.getDescription());
            updateComplain.setPicture(complainDto.getPicture());
            updateComplain.setArea(area);
            updateComplain.setUser(user);
            updateComplain.setComplainType(complainType);
            updateComplain.setDate(complainDto.getDate());
            updateComplain.setTime(complainDto.getTime());
        }
        return toDto(complainRepository.save(updateComplain));
    }

    public Complain dto(ComplainDto complainDto){
        return Complain.builder()
                .id(complainDto.getId())
                .area(complainDto.getArea())
                .description(complainDto.getDescription())
                .picture(complainDto.getPicture())
                .status(complainDto.getStatus())
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
                .complainType(complain.getComplainType())
                .user(complain.getUser())
                .date(complain.getDate())
                .time(complain.getTime())
                .status(complain.getStatus())

                .build();
    }

    public List<ComplainDto> getFilteredComplain(SearchCriteria searchCriteria) {
        ComplainSpecification complainSpecification = new ComplainSpecification(searchCriteria);
        List<Complain> complains = complainRepository.findAll(complainSpecification);
        return complains.stream().map(el->toDto(el)).collect(Collectors.toList());
    }

    public List<ComplainDto> getFilteredComplainByStatus(SearchCriteria searchCriteria) {

        if(searchCriteria.getValue().toString().equalsIgnoreCase("IN_REVIEW")){
            searchCriteria.setValue(Status.IN_REVIEW);
        }
        else if(searchCriteria.getValue().toString().equalsIgnoreCase("COMPLETED")){
            searchCriteria.setValue(Status.COMPLETED);
        }
        else if(searchCriteria.getValue().toString().equalsIgnoreCase("IN_PROGRESS")){
            searchCriteria.setValue(Status.IN_PROGRESS);
        }
        else if(searchCriteria.getValue().toString().equalsIgnoreCase("REJECTED")){
            searchCriteria.setValue(Status.REJECTED);
        }
        try{
            ComplainSpecification complainSpecification = new ComplainSpecification(searchCriteria);
            List<Complain> complains = complainRepository.findAll(complainSpecification);
            return complains.stream().map(el->toDto(el)).collect(Collectors.toList());
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No data Exist having "+searchCriteria.getKey()+" = "+searchCriteria.getValue());
        }

    }

    public InputStream getImageByName(String filename) throws IOException {
        InputStream inputStream = null;
        try{
            String assetImagePath = imageFolderPath+ File.separator+filename;
            inputStream = new FileInputStream(assetImagePath);
            return inputStream;
        }
        catch (Exception e){
            System.out.println("Image not exist in Complain "+e);
            throw new FileNotFoundException("Image not exist in Complain");
        }
    }

}
