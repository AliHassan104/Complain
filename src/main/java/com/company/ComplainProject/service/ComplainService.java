package com.company.ComplainProject.service;

//import com.company.ComplainProject.config.image.ComplainImageImplementation;
import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.config.image.ComplainImageImplementation;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
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

    public List<ComplainDto> getAllComplain() {
        List<Complain> complains = complainRepository.findAll();
        return complains.stream().map(complain -> toDto(complain)).collect(Collectors.toList());
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
        Complain updateComplain = dto(getAllComplain().stream().filter(complain -> complain.getId().equals(id)).findAny().get());
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
                .block(complainDto.getBlock())
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
                .block(complain.getBlock())
                .build();
    }

    public List<ComplainDto> getFilteredComplain(SearchCriteria searchCriteria) {
        ComplainSpecification complainSpecification = new ComplainSpecification(searchCriteria);
        List<Complain> complains = complainRepository.findAll(complainSpecification);
        return complains.stream().map(el->toDto(el)).collect(Collectors.toList());
    }
//                                                                                              filter complain by status
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

    public List<ComplainDto> getComplainByUserEmail(String email) {
        User user = userService.getAllUser().stream().filter(user1 -> user1.getEmail().equalsIgnoreCase(email)).findAny().get();
        List<Complain> complains = complainRepository.getComplainByUser(user);
        return complains.stream().map(complain -> toDto(complain)).collect(Collectors.toList());
    }

//                                                                                      complain user by status
    public List<ComplainDto> getComplainByUserAndStatus(String email,String status){
        User user = userService.getAllUser().stream().filter(user1 -> user1.getEmail().equalsIgnoreCase(email)).findAny().get();
        List<Complain> complains;

        if(status.equalsIgnoreCase("IN_REVIEW")){
            complains = complainRepository.getComplainByUserAndStatus(user,Status.IN_REVIEW);
        }
        else if(status.equalsIgnoreCase("COMPLETED")){
            complains = complainRepository.getComplainByUserAndStatus(user,Status.COMPLETED);
        }
        else if(status.equalsIgnoreCase("REJECTED")){
            complains =  complainRepository.getComplainByUserAndStatus(user,Status.REJECTED);
        }
        else if(status.equalsIgnoreCase("IN_PROGRESS")){
            complains = complainRepository.getComplainByUserAndStatus(user,Status.IN_PROGRESS);
        }
        else{
            throw new ContentNotFoundException("No Complain found of user having status "+status);
        }
        return complains.stream().map(complain -> toDto(complain)).collect(Collectors.toList());
    }
}
