package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.DocumentDto;
import com.company.ComplainProject.dto.WaterTimingDto;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.model.Document;
import com.company.ComplainProject.model.WaterTiming;
import com.company.ComplainProject.repository.DocumentRepository;
import com.company.ComplainProject.repository.WaterTimingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WaterTimingService {
    @Autowired
    WaterTimingRepository waterTimingRepository;
    @Autowired
    BlockService blockService;

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
        Block block = blockService.getAllBlocks().stream().filter(block1 -> block1.getId().equals(waterTimingDto.getBlock().getId())).findAny().get();
        waterTimingDto.setArea(block.getArea());
        waterTimingDto.setBlock(block);

        return toDto(waterTimingRepository.save(dto(waterTimingDto)));
    }

    public Optional<WaterTimingDto> updateWaterTimingById(Long id, WaterTimingDto waterTimingDto) {
        WaterTiming updateWaterTiming = getAllWaterTiming().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateWaterTiming != null){
            updateWaterTiming.setTime(waterTimingDto.getTime());
            updateWaterTiming.setDay(waterTimingDto.getDay());
            updateWaterTiming.setArea(waterTimingDto.getArea());
            updateWaterTiming.setBlock(waterTimingDto.getBlock());
            updateWaterTiming.setDate(waterTimingDto.getDate());
        }
        return Optional.of(toDto(waterTimingRepository.save(updateWaterTiming)));
    }

    public WaterTiming dto(WaterTimingDto waterTimingDto){
        return WaterTiming.builder()
                .id(waterTimingDto.getId())
                .time(waterTimingDto.getTime())
                .day(waterTimingDto.getDay())
                .area(waterTimingDto.getArea())
                .date(waterTimingDto.getDate())
                .block(waterTimingDto.getBlock())
                .build();
    }

    public WaterTimingDto toDto(WaterTiming waterTiming){
        return  WaterTimingDto.builder()
                .id(waterTiming.getId())
                .time(waterTiming.getTime())
                .day(waterTiming.getDay())
                .area(waterTiming.getArea())
                .date(waterTiming.getDate())
                .block(waterTiming.getBlock())
                .build();
    }

    public List<WaterTiming> getWaterTimingByArea(Long areaId) {
        List<WaterTiming> waterTimings = getAllWaterTiming().stream().filter(waterTiming -> waterTiming.getArea().getId().equals(areaId)).collect(Collectors.toList());
        return  waterTimings;
    }

    public List<WaterTiming> getWaterTimingByBlock(Long blockId) {
        List<WaterTiming> waterTimings = getAllWaterTiming().stream().filter(waterTiming -> waterTiming.getBlock().getId().equals(blockId)).collect(Collectors.toList());
        return waterTimings;
    }
}
