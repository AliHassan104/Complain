package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.BlockDto;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.service.BlockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BlockController {

    @Autowired
    BlockService blockService;

    @GetMapping("/block")
    public ResponseEntity<List<Block>> viewAllBlocks(){
        try{
            return ResponseEntity.ok(blockService.getAllBlocks());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
//                                                                      Get Blocks with Area
    @GetMapping("block/{area}")
    public ResponseEntity<List<Block>> getAllBlockByArea(@PathVariable("area") Long areaid){
        try {
            return ResponseEntity.ok(blockService.getBlockByArea(areaid));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/block")
    public ResponseEntity<BlockDto> addBlock(@RequestBody BlockDto blockDto){
        try{
            return  ResponseEntity.ok(blockService.addBlockInRecord(blockDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
