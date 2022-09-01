package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.BlockDto;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.repository.BlockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public class BlockService {

    @Autowired
    BlockRepository blockRepository;
    @Autowired
    AreaService areaService;

    public BlockDto addBlockInRecord(BlockDto blockDto) {
        Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(blockDto.getArea().getId())).findAny().get();
        blockDto.setArea(area);
        return todto(blockRepository.save(dto(blockDto)));
    }

    public Block dto(BlockDto blockDto){
        return Block.builder().id(blockDto.getId()).block_name(blockDto.getBlock_name()).area(blockDto.getArea()).build();
    }

    public BlockDto todto(Block block){
        return BlockDto.builder().id(block.getId()).block_name(block.getBlock_name()).area(block.getArea()).build();
    }

    public List<Block> getAllBlocks() {
        return blockRepository.findAll();
    }

    public List<Block> getBlockByArea(Long areaid) {
        Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(areaid)).findAny().get();
        List<Block> getBlockByArea = blockRepository.getAllBlockByArea(area);
        if(getBlockByArea.isEmpty()){
//            return exception no block exist with this id
            return null;
        }
        return getBlockByArea;
    }
}
