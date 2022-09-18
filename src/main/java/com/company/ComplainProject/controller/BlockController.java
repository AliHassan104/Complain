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
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/api")
public class BlockController {

    @Autowired
    BlockService blockService;

    @GetMapping("/block")
    public ResponseEntity<List<Block>> viewAllBlocks(@RequestParam(value = "pageNumber" ,defaultValue = "0",required = false) Integer pageNumber ,
                                                     @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){
        try{
            return ResponseEntity.ok(blockService.getAllBlocksWithPagination(pageNumber,pageSize));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
//                                                                      Get Blocks with Area
    @GetMapping("blockByArea/{area}")
    public ResponseEntity<List<Block>> getAllBlockByArea(@PathVariable("area") Long areaid){
        try {
            return ResponseEntity.ok(blockService.getBlockByArea(areaid));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("block/{id}")
    public ResponseEntity<Optional<Block>> getBlockById(@PathVariable("id") Long id){
        try {
            return ResponseEntity.ok(blockService.getBlockById(id));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("block/{id}")
    public ResponseEntity<BlockDto> updateBlockById(@PathVariable("id") Long id,@RequestBody BlockDto blockDto){
        try{
            return ResponseEntity.ok(blockService.updateBlockById(id,blockDto));
        }catch (Exception e){
            System.out.println(e+" Exception updating block");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("block/{id}")
    public ResponseEntity<Void> deleteBlockById(@PathVariable Long id){
        try{
            blockService.deleteBlockById(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            System.out.println(e+" Exception in deleting Block by id "+id );
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
