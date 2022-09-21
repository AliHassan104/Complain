package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.WaterTimingDto;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.model.WaterTiming;
import com.company.ComplainProject.repository.WaterTimingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
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
        List<WaterTiming> waterTimings = waterTimingRepository.findAll();
        if(waterTimings.isEmpty()){
            throw new ContentNotFoundException("No water Timing Exist");
        }
        return waterTimings;
    }

    public Optional<WaterTiming> getWaterTimingById(Long id) {
        Optional<WaterTiming> waterTiming = waterTimingRepository.findById(id);
        if(waterTiming.isPresent()){
            return waterTiming;
        }
        throw new ContentNotFoundException("No water timing exist having id "+id);
    }

    public void deleteWaterTimingById(Long id) {
        waterTimingRepository.deleteById(id);
    }

    public WaterTimingDto addWaterTiming(WaterTimingDto waterTimingDto) {

        Block block = blockService.getAllBlocks().stream().filter(block1 -> block1.getId().equals(waterTimingDto.getBlock().getId())).findAny().get();
        waterTimingDto.setBlock(block);

        return toDto(waterTimingRepository.save(dto(waterTimingDto)));
    }

    public Optional<WaterTimingDto> updateWaterTimingById(Long id, WaterTimingDto waterTimingDto) {
        WaterTiming updateWaterTiming = getAllWaterTiming().stream().filter(el->el.getId().equals(id)).findAny().get();
//                                    get all data of block from waterTimingDto
        Block block = blockService.getAllBlocks().stream().filter(block1 -> block1.getId().equals(waterTimingDto.getBlock().getId())).findAny().get();

        if(updateWaterTiming != null){
            updateWaterTiming.setTime(waterTimingDto.getTime());
            updateWaterTiming.setDay(waterTimingDto.getDay());
            updateWaterTiming.setBlock(block);
            updateWaterTiming.setDate(waterTimingDto.getDate());
        }
        System.out.println("After update "+updateWaterTiming);
        return Optional.of(toDto(waterTimingRepository.save(updateWaterTiming)));
    }

    public WaterTiming dto(WaterTimingDto waterTimingDto){
        return WaterTiming.builder()
                .id(waterTimingDto.getId())
                .time(waterTimingDto.getTime())
                .day(waterTimingDto.getDay())
                .date(waterTimingDto.getDate())
                .block(waterTimingDto.getBlock())
                .build();
    }

    public WaterTimingDto toDto(WaterTiming waterTiming){
        return  WaterTimingDto.builder()
                .id(waterTiming.getId())
                .time(waterTiming.getTime())
                .day(waterTiming.getDay())
                .date(waterTiming.getDate())
                .block(waterTiming.getBlock())
                .build();
    }

    public List<WaterTiming> getWaterTimingByArea(Long areaId) {
        List<WaterTiming> waterTimings = getAllWaterTiming().stream().filter(waterTiming -> waterTiming.getBlock().getArea().getId().equals(areaId)).collect(Collectors.toList());
        if(waterTimings.isEmpty()){
            throw new ContentNotFoundException("Water timing having area id "+areaId+" not exist");
        }
        return  waterTimings;
    }

    public List<WaterTiming> getWaterTimingByBlock(Long blockId) {
        List<WaterTiming> waterTimings = getAllWaterTiming().stream().filter(waterTiming -> waterTiming.getBlock().getId().equals(blockId)).collect(Collectors.toList());
        if(waterTimings.isEmpty()){
            throw new ContentNotFoundException("Water timing having block id "+blockId+" not exist");
        }
        return waterTimings;
    }
}
