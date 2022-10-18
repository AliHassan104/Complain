package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.dto.AreaDto;
import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.repository.AreaRepository;
import com.google.cloud.PageImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AreaService {

    @Autowired
    AreaRepository areaRepository;


    public List<Area> getAllArea(){
        return areaRepository.findAll();
    }

    public List<AreaDto> getAllAreaDto() {
        try {
            List<Area> areaList = areaRepository.findAll();
            return areaList.stream().map(area1 -> toDto(area1)).collect(Collectors.toList());
        }
        catch (Exception e){
            throw new RuntimeException("No Area Exist "+e);
        }
    }

    public Page<Area> getAllAreaDtoWithPagination(Integer pageNumber,Integer pageSize){
        try {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<Area> areaPage = areaRepository.findAll(pageable);
            return areaPage;
        }catch (Exception e){
            throw new RuntimeException("No Area Exist "+e);
        }
    }


    public AreaDto getAreaById(Long id) {
       Optional<Area> area = areaRepository.findById(id);
       if(area.isPresent()){
           return toDto(area.get());
       }
       throw new ContentNotFoundException("No Area Exist Having id "+id);
    }

    public void deleteAreaById(Long id) {
        try{
            areaRepository.deleteById(id);
        }
        catch (Exception e){
            System.out.println(e);
           throw new ContentNotFoundException("Cannot Delete Area id "+id+" Not Exist ");
        }

    }

    public AreaDto addArea(AreaDto areaDto) {
        try {
            return toDto(areaRepository.save(dto(areaDto)));
        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong cannot save area "+e);
        }

    }

    public AreaDto updateAreaById(Long id, AreaDto areaDto) {
        try {
            Optional<Area> updateArea = areaRepository.findById(id);
            if (updateArea.isPresent()) {
                updateArea.get().setName(areaDto.getName());
                updateArea.get().setPostalCode(areaDto.getPostalCode());

                return toDto(areaRepository.save(updateArea.get()));
            }
            throw new ContentNotFoundException("Cannot Update no Area Exist Having id "+id);
        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong cannot update area "+e);
        }
    }

    public Area dto(AreaDto areaDto){
        return Area.builder().id(areaDto.getId()).name(areaDto.getName())
                .postalCode(areaDto.getPostalCode()).
                build();
    }

    public AreaDto toDto(Area area){
        return  AreaDto.builder().id(area.getId()).name(area.getName())
            .postalCode(area.getPostalCode()).build();
    }


}
