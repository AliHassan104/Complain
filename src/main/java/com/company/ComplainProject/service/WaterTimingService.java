package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.WaterTimingByBlockDto;
import com.company.ComplainProject.dto.WaterTimingDetails;
import com.company.ComplainProject.dto.WaterTimingDto;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.model.WaterTiming;
import com.company.ComplainProject.repository.BlockRepository;
import com.company.ComplainProject.repository.WaterTimingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class WaterTimingService {
    @Autowired
    WaterTimingRepository waterTimingRepository;
    @Autowired
    BlockService blockService;
    @Autowired
    FirebaseMessagingService notificationService;
    @Autowired
    BlockRepository blockRepository;

    public List<WaterTiming> getAllWaterTiming() {
        try {
            List<WaterTiming> waterTimings = waterTimingRepository.findAll();
            return waterTimings;
        }
        catch (Exception e){
            throw new RuntimeException("No water timing exist "+e);
        }
    }

    public Optional<WaterTiming> getWaterTimingById(Long id) {
        Optional<WaterTiming> waterTiming = waterTimingRepository.findById(id);
        if(waterTiming.isPresent()){
            return waterTiming;
        }
        throw new ContentNotFoundException("No water timing exist having id "+id);
    }

    public void deleteWaterTimingById(Long id) {
        try {
            waterTimingRepository.deleteById(id);
        }
        catch (Exception e){
            throw  new ContentNotFoundException("Cannot Delete No water timing exist having id "+id);
        }
    }

    public WaterTimingDto addWaterTiming(WaterTimingDto waterTimingDto) {

        try {
            Optional<Block> block = blockRepository.findById(waterTimingDto.getBlock().getId());
            waterTimingDto.setBlock(block.get());

            WaterTimingDto _waterTimingDto = toDto(waterTimingRepository.save(dto(waterTimingDto)));
            if (_waterTimingDto != null) {
                notificationService.sendNotificationOnWaterTiming(_waterTimingDto);
            }
            return waterTimingDto;
        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong on adding new water timing "+e);
        }
    }

    public WaterTimingDto updateWaterTimingById(Long id, WaterTimingDto waterTimingDto) {
        try {
            WaterTiming updateWaterTiming = getAllWaterTiming().stream().filter(el -> el.getId().equals(id)).findAny().get();
            Optional<Block> block = blockRepository.findById(waterTimingDto.getBlock().getId());

            if (updateWaterTiming != null) {
                updateWaterTiming.setStart_time(waterTimingDto.getStart_time());
                updateWaterTiming.setEnd_time(waterTimingDto.getEnd_time());
                updateWaterTiming.setDay(waterTimingDto.getDay());
                updateWaterTiming.setBlock(block.get());
                updateWaterTiming.setDate(waterTimingDto.getDate());
            }
            return toDto(waterTimingRepository.save(updateWaterTiming));
        }
        catch (Exception e){
            throw new RuntimeException("Cannot Update Water timing "+e);
        }
    }

    public WaterTiming dto(WaterTimingDto waterTimingDto){
        return WaterTiming.builder()
                .id(waterTimingDto.getId())
                .start_time(waterTimingDto.getStart_time())
                .end_time(waterTimingDto.getEnd_time())
                .day(waterTimingDto.getDay())
                .date(waterTimingDto.getDate())
                .block(waterTimingDto.getBlock())
                .build();
    }

    public WaterTimingDto toDto(WaterTiming waterTiming){
        return  WaterTimingDto.builder()
                .id(waterTiming.getId())
                .start_time(waterTiming.getStart_time())
                .end_time(waterTiming.getEnd_time())
                .day(waterTiming.getDay())
                .date(waterTiming.getDate())
                .block(waterTiming.getBlock())
                .build();
    }

    public List<WaterTiming> getWaterTimingByArea(Long areaId) {
        try {
            List<WaterTiming> waterTimings = getAllWaterTiming().stream().filter(waterTiming -> waterTiming.getBlock().getArea().getId().equals(areaId)).collect(Collectors.toList());
            return waterTimings;
        }
        catch (Exception e){
            throw new RuntimeException("Water timing by area id "+areaId+" Not Exist "+e );
        }
    }

    public List<WaterTiming> getWaterTimingByBlock(Long blockId) {
        try {
            List<WaterTiming> waterTimings = getAllWaterTiming().stream().filter(waterTiming -> waterTiming.getBlock().getId().equals(blockId)).collect(Collectors.toList());
            return waterTimings;
        }
        catch (Exception e){
            throw new RuntimeException("Water timing by block id "+blockId+" Not Exist "+e);
        }
    }


    public List<WaterTimingByBlockDto> getAllWaterTimingByBlock() {
        try {
            List<Block> blocks = blockService.getAllBlocks().stream().collect(Collectors.toList());
            List<WaterTimingByBlockDto> blockDtos = new ArrayList<>();
            List<WaterTiming> waterTimings;
            List<WaterTimingDetails> waterTimingDetails;

            for (Block block : blocks) {
                waterTimings = waterTimingRepository.getAllWaterTimingByBlock(block);
                waterTimingDetails = waterTimings.stream().map(waterTiming -> waterTimingToWaterTimingDetails(waterTiming)).collect(Collectors.toList());
                blockDtos.add(new WaterTimingByBlockDto(block.getArea().getId(), block.getArea().getName(), block.getId(), block.getBlock_name(), waterTimingDetails));
            }
            return blockDtos;
        }
        catch (Exception e){
            throw new RuntimeException("Cannot find water timing "+e);
        }
    }

    public WaterTimingDetails waterTimingToWaterTimingDetails(WaterTiming waterTiming){
        return WaterTimingDetails.builder().start_time(waterTiming.getStart_time()).end_time(waterTiming.getEnd_time()).day(waterTiming.getDay()).date(waterTiming.getDate()).build();
    }
}

