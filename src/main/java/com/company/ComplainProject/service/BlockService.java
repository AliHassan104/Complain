package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.BlockDto;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.repository.BlockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public List<Block> getAllBlocks(Integer pageNumber,Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Block> blockPage = blockRepository.findAll(pageable);
        List<Block> blockList = blockPage.getContent();
        return blockList;
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
