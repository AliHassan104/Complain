package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.dto.AreaDto;
import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.repository.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AreaService {

    @Autowired
    AreaRepository areaRepository;

    public List<Area> getAllArea() {
        return areaRepository.findAll();
    }

    public Optional<Area> getAreaById(Long id) {
        return areaRepository.findById(id);
    }

    public void deleteAreaById(Long id) {
        areaRepository.deleteById(id);
    }

    public AreaDto addArea(AreaDto areaDto) {
        return toDto(areaRepository.save(dto(areaDto)));
    }

    public Optional<AreaDto> updateAchievementById(Long id, AreaDto areaDto) {
        Area updateAchievement = getAllArea().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateAchievement != null){
            updateAchievement.setName(areaDto.getName());
            updateAchievement.setBlock(areaDto.getBlock());
            updateAchievement.setPostalCode(areaDto.getPostalCode());
        }
        return Optional.of(toDto(areaRepository.save(updateAchievement)));
    }

    public Area dto(AreaDto areaDto){
        return Area.builder().id(areaDto.getId()).name(areaDto.getName())
                .block(areaDto.getBlock()).postalCode(areaDto.getPostalCode()).
                build();
    }

    public AreaDto toDto(Area area){
        return  AreaDto.builder().id(area.getId()).name(area.getName())
                .block(area.getBlock()).postalCode(area.getPostalCode())
                .build();
    }
}
