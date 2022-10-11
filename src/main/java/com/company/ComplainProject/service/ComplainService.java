package com.company.ComplainProject.service;

//import com.company.ComplainProject.config.image.ComplainImageImplementation;
import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ComplainDetailsResponse;
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
    @Autowired
    SessionService service;

    public List<ComplainDto> getAllComplain() {
        List<Complain> complains = complainRepository.findAll();
        return complains.stream().map(complain -> toDto(complain)).collect(Collectors.toList());
    }

    public Page<Complain> getAllComplainsWithPagination(Integer pageNumber,Integer pageSize){
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<Complain> complainPage = complainRepository.findAll(pageable);
            return complainPage;
        }
        catch (Exception e){
            throw new RuntimeException("No Complain Exist"+e);
        }

    }

    public ComplainDetailsResponse getComplainById(Long id) {
        Optional<Complain> complain = complainRepository.findById(id);
        if(complain.isPresent()){
            return complainToComplainDetailsResponse(complain.get());
        }
        throw new ContentNotFoundException("No complain Found Having id "+id);

    }

    public void deleteComplainById(Long id) {
        try{
            complainRepository.deleteById(id);
        }
        catch (Exception e){
            throw new RuntimeException("No Complain Exist having id "+id+"   "+e);
        }

    }

    public ComplainDetailsResponse addComplain(ComplainDto complainDto) {
        try {
            User user = service.getLoggedInUser();
            complainDto.setUser(user);
            return complainToComplainDetailsResponse(complainRepository.save(dto(complainDto)));
        }
        catch (Exception e ){
            throw new RuntimeException("Cannot Save Complain  "+e);
        }
    }

    public ComplainDetailsResponse updateComplainById(Long id, ComplainDto complainDto) {
        try {
            Complain updateComplain = dto(getAllComplain().stream().filter(complain -> complain.getId().equals(id)).findAny().get());
            User user = service.getLoggedInUser();
            Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(complainDto.getArea().getId())).findAny().get();
            ComplainType complainType = complainTypeService.getAllComplainType().stream().filter(complainType1 -> complainType1.getId().equals(complainDto.getComplainType().getId())).findAny().get();

            if (updateComplain != null) {
                updateComplain.setDescription(complainDto.getDescription());
                updateComplain.setPicture(complainDto.getPicture());
                updateComplain.setArea(area);
                updateComplain.setUser(user);
                updateComplain.setComplainType(complainType);
                updateComplain.setDate(complainDto.getDate());
                updateComplain.setTime(complainDto.getTime());
            }
            return complainToComplainDetailsResponse(complainRepository.save(updateComplain));
        }
        catch (Exception e){
            throw new RuntimeException("Cannot Update Complain  "+e);
        }
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
                .complainLog(complain.getComplainLogs())
                .build();
    }

    public List<ComplainDetailsResponse> getFilteredComplain(SearchCriteria searchCriteria) {
        try {
            ComplainSpecification complainSpecification = new ComplainSpecification(searchCriteria);
            List<Complain> complains = complainRepository.findAll(complainSpecification);
            return complainListToComplainDetailsResponseList(complains);
        }
        catch (Exception e){
            throw new RuntimeException("No Complain Exist "+e);
        }
    }
//                                                                                              filter complain by status
    public List<ComplainDetailsResponse> getFilteredComplainByStatus(SearchCriteria searchCriteria) {

        try{
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

            ComplainSpecification complainSpecification = new ComplainSpecification(searchCriteria);
            List<Complain> complains = complainRepository.findAll(complainSpecification);
            return complainListToComplainDetailsResponseList(complains);

        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No data Exist having "+searchCriteria.getKey()+" = "+searchCriteria.getValue());
        }

    }

//    public InputStream getImageByName(String filename) throws IOException {
//        InputStream inputStream = null;
//        try{
//            String assetImagePath = imageFolderPath+ File.separator+filename;
//            inputStream = new FileInputStream(assetImagePath);
//            return inputStream;
//        }
//        catch (Exception e){
//            System.out.println("Image not exist in Complain "+e);
//            throw new FileNotFoundException("Image not exist in Complain");
//        }
//    }

    public List<ComplainDetailsResponse> getComplainByUser() {
        User user = service.getLoggedInUser();
        try {
            List<Complain> complains = complainRepository.getComplainByUser(user);
            return complainListToComplainDetailsResponseList(complains);
        }
        catch (Exception e){
            throw new ContentNotFoundException("No Complain Exist with user email "+user.getEmail()+"  "+e);
        }
    }

//                                                                                      complain user by status
    public List<ComplainDetailsResponse> getComplainByUserAndStatus(String status){
        try {
            User user = service.getLoggedInUser();
            List<Complain> complains;

            if (status.equalsIgnoreCase("IN_REVIEW")) {
                complains = complainRepository.getComplainByUserAndStatus(user, Status.IN_REVIEW);
            } else if (status.equalsIgnoreCase("COMPLETED")) {
                complains = complainRepository.getComplainByUserAndStatus(user, Status.COMPLETED);
            } else if (status.equalsIgnoreCase("REJECTED")) {
                complains = complainRepository.getComplainByUserAndStatus(user, Status.REJECTED);
            } else if (status.equalsIgnoreCase("IN_PROGRESS")) {
                complains = complainRepository.getComplainByUserAndStatus(user, Status.IN_PROGRESS);
            } else {
                throw new ContentNotFoundException("No Complain found of user having status " + status);
            }
            return complainListToComplainDetailsResponseList(complains);
        }
        catch (Exception e){
            throw new RuntimeException("No Complain Exist "+e);
        }
    }

    public Long countAllComplains_Service() {
        return complainRepository.count();
    }

    public ComplainDetailsResponse complainToComplainDetailsResponse(Complain complain){
        return ComplainDetailsResponse.builder()
                .id(complain.getId())
                .complainLog(complain.getComplainLogs())
                .complainType(complain.getComplainType())
                .area(complain.getArea())
                .date(complain.getDate())
                .description(complain.getDescription())
                .picture(complain.getPicture())
                .block(complain.getBlock())
                .time(complain.getTime())
                .status(complain.getStatus())
                .user(userService.userToUserDetailsResponse(complain.getUser())).build();
    }

    public List<ComplainDetailsResponse> complainListToComplainDetailsResponseList(List<Complain> complain){
        return complain.stream().map(complain1 -> complainToComplainDetailsResponse(complain1)).collect(Collectors.toList());
    }

    public Page<Complain> getallComplainByArea(Long area_id,Integer pageNumber, Integer pageSize) {
        try {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<Complain> complainbyarea = complainRepository.getAllComplainByArea(area_id, pageable);
            complainbyarea.stream().forEach(complain -> complain.getUser().setPassword(null));

            return complainbyarea;
        }catch (Exception e){
            throw new RuntimeException("Some thing went wrong cannot get complains by area "+e);
        }
    }

    public Page<Complain> getallComplainByComplainType(Long c_type_id,Integer pageNumber, Integer pageSize) {
        try {

            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<Complain> complainPage = complainRepository.getAllComplainByComplainType(c_type_id, pageable);
            complainPage.stream().forEach(complain -> complain.getUser().setPassword(null));
            return complainPage;

        }catch (Exception e){
            throw new RuntimeException("Some thing went wrong cannot get complains by complain type "+e);
        }
    }
}
