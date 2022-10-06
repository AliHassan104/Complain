package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.RolesDto;
import com.company.ComplainProject.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class RolesController {
    @Autowired
    RolesService rolesService;

    @GetMapping("/roles")
    ResponseEntity<List<RolesDto>> getAllRoles(){
       return ResponseEntity.ok(rolesService.getAllRoles());
    }
}
