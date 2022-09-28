package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.DashboardData.ComplainByComplainType;
import com.company.ComplainProject.dto.DashboardData.ComplainByStatus;
import com.company.ComplainProject.dto.DashboardDto;
import com.company.ComplainProject.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/complainbycomplaintype")
    public ResponseEntity<ArrayList<ComplainByComplainType> > getComplainByComplainType(){
        try{
            return ResponseEntity.ok(dashboardService.getComplainByComplainType());
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No complain Found");
        }
    }

    @GetMapping("complainbystatus")
    public ResponseEntity<ArrayList<ComplainByStatus>> getComplainByStatus(){
        try{
            return ResponseEntity.ok(dashboardService.getComplainByStatus());
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No complain Found");
        }
    }

    @GetMapping("complainbymonth")
    public ResponseEntity<?> getComplainByMonth(){
        try{
            return ResponseEntity.ok(dashboardService.getComplainByMonth());
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No complain Found");
        }
    }
}
