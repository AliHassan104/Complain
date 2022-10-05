package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.dto.AreaDto;
import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.repository.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        List<Area> areaList = areaRepository.findAll();
        if(!areaList.isEmpty()){
            return areaList.stream().map(area1->toDto(area1)).collect(Collectors.toList());
        }
        throw new ContentNotFoundException("No Area Exist");
    }

    public AreaDto getAreaById(Long id) {
       Optional<Area> area = areaRepository.findById(id);
       if(area.isPresent()){
           return toDto(area.get());
       }
       throw new ContentNotFoundException("No Area Exist Having id "+id);
    }

    public void deleteAreaById(Long id) {
        areaRepository.deleteById(id);
    }

    public AreaDto addArea(AreaDto areaDto) {
        return toDto(areaRepository.save(dto(areaDto)));
    }

    public AreaDto updateAchievementById(Long id, AreaDto areaDto) {
        Optional<Area> updateArea = areaRepository.findById(id);
        if(updateArea.isPresent()){
            updateArea.get().setName(areaDto.getName());
            updateArea.get().setPostalCode(areaDto.getPostalCode());
        }
        return toDto(areaRepository.save(updateArea.get()));
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
