package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.DashboardDto;
import com.company.ComplainProject.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;


//    @GetMapping("/user/dashboard")
//    public ResponseEntity<List<DashboardDto>> getUser(){
//        List<DashboardDto> user = dashboardService.();
//        if(!user.isEmpty()){
//            return ResponseEntity.ok(user);
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//    }
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String,Integer>> dashboard(){
        System.out.println(dashboardService.getDashboard());
        return ResponseEntity.ok(dashboardService.getDashboard());
    }

}
