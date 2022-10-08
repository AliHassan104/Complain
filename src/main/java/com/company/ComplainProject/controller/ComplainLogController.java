package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ComplainLogDto;
import com.company.ComplainProject.service.ComplainLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ComplainLogController {

    @Autowired
    ComplainLogService complainLogService;

    @GetMapping("/complainlog")
    public ResponseEntity<List<ComplainLogDto>> getAllComplainLog(){
        try{
            return ResponseEntity.ok(complainLogService.getAllComplainLog());
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No Complain Log Exist");
        }
    }

    @GetMapping("/complainlog/{id}")
    public ResponseEntity<ComplainLogDto> getComplainLogById(@PathVariable Long id){
        try{
            return ResponseEntity.ok(complainLogService.getComplainLogById(id));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No Complain Log Exist with id "+id);
        }
    }

    @GetMapping("/complainlogbycomplain/{c_id}")
    public ResponseEntity<List<ComplainLogDto>> getComplainLogByComplain(@PathVariable("c_id") Long id){
        try{
            return ResponseEntity.ok(complainLogService.getComplainLogsByComplain(id));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No Complain Log Exist with complain id "+id);
        }
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/complainlog/{c_id}")
    public ResponseEntity<ComplainLogDto> addComplainLogByComplain(@PathVariable("c_id") Long id,@RequestBody ComplainLogDto complainLogDto){
        try{
            return ResponseEntity.ok(complainLogService.addComplainLogByComplainService(id,complainLogDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/complainlogdelete/{complain_id}")
    public ResponseEntity<Void> deleteComplianLogByComplainId(@PathVariable("complain_id") Long id){
        try{
            complainLogService.deleteComplainLogByComplain(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
