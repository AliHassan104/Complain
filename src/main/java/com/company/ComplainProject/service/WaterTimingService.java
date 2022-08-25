package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.DocumentDto;
import com.company.ComplainProject.dto.WaterTimingDto;
import com.company.ComplainProject.model.Document;
import com.company.ComplainProject.model.WaterTiming;
import com.company.ComplainProject.repository.DocumentRepository;
import com.company.ComplainProject.repository.WaterTimingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WaterTimingService {
    @Autowired
    WaterTimingRepository waterTimingRepository;

    public List<WaterTiming> getAllWaterTiming() {
        return waterTimingRepository.findAll();
    }

    public Optional<WaterTiming> getWaterTimingById(Long id) {
        return waterTimingRepository.findById(id);
    }

    public void deleteWaterTimingById(Long id) {
        waterTimingRepository.deleteById(id);
    }

    public WaterTimingDto addWaterTiming(WaterTimingDto waterTimingDto) {
        return toDto(waterTimingRepository.save(dto(waterTimingDto)));
    }

    public Optional<WaterTimingDto> updateWaterTimingById(Long id, WaterTimingDto waterTimingDto) {
        WaterTiming updateWaterTiming = getAllWaterTiming().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateWaterTiming != null){
            updateWaterTiming.setTime(waterTimingDto.getTime());
            updateWaterTiming.setDate(waterTimingDto.getDate());
            updateWaterTiming.setDay(waterTimingDto.getDay());
            updateWaterTiming.setArea(waterTimingDto.getArea());
        }
        return Optional.of(toDto(waterTimingRepository.save(updateWaterTiming)));
    }

    public WaterTiming dto(WaterTimingDto waterTimingDto){
        return WaterTiming.builder()
                .id(waterTimingDto.getId())
                .time(waterTimingDto.getTime())
                .day(waterTimingDto.getDay())
                .date(waterTimingDto.getDate())
                .area(waterTimingDto.getArea())
                .build();
    }

    public WaterTimingDto toDto(WaterTiming waterTiming){
        return  WaterTimingDto.builder()
                .id(waterTiming.getId())
                .time(waterTiming.getTime())
                .date(waterTiming.getDate())
                .day(waterTiming.getDay())
                .area(waterTiming.getArea())
                .build();
    }
}
