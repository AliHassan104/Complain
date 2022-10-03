package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
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
import java.util.Optional;

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

    public List<Block> getAllBlocks(){
        List<Block> block = blockRepository.findAll();
        if(!block.isEmpty()){
            return block;
        }
        throw new ContentNotFoundException("No Block Exist");
    }

    public List<Block> getAllBlocksWithPagination(Integer pageNumber,Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Block> blockPage = blockRepository.findAll(pageable);
        List<Block> blockList = blockPage.getContent();
        return blockList;
    }

    public Optional<Block> getBlockById(Long id){
        Optional<Block> block = blockRepository.findById(id);
        if(block.isPresent()){
            return block;
        }
        throw new ContentNotFoundException("No Block Exist Having id "+id);
    }

    public BlockDto updateBlockById(Long id,BlockDto blockDto){
        Block block = getAllBlocks().stream().filter(block1 -> block1.getId().equals(id)).findAny().get();
        Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(blockDto.getArea().getId())).findAny().get();

        if(block != null){
            block.setBlock_name(blockDto.getBlock_name());
            block.setArea(area);
        }
        return todto(blockRepository.save(block));
    }

    public void deleteBlockById(Long id){
        blockRepository.deleteById(id);
    }

    /**
     * Get Blocks By Area
     * @param areaid
     * @return
     */
    public List<Block> getBlockByArea(Long areaid) {
        Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(areaid)).findAny().get();
        List<Block> getBlockByArea = blockRepository.getAllBlockByArea(area);
        return getBlockByArea;
    }


    public Block dto(BlockDto blockDto){
        return Block.builder().id(blockDto.getId()).block_name(blockDto.getBlock_name()).area(blockDto.getArea()).build();
    }

    public BlockDto todto(Block block){
        return BlockDto.builder().id(block.getId()).block_name(block.getBlock_name()).area(block.getArea()).build();
    }
}
