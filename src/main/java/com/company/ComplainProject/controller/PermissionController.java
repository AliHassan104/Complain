package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.PermissionDto;
import com.company.ComplainProject.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PermissionController {

    @Autowired
    PermissionService permissionService;

    @PostMapping("/permission")
    public ResponseEntity<PermissionDto> addPermissions(@RequestBody PermissionDto permissionDto){
        if(permissionDto.getUrl()!=null){
            return ResponseEntity.ok(permissionService.addPermissions(permissionDto));
        }
        else{
            throw new ContentNotFoundException("Permissions Not Found");
        }
    }

//    @GetMapping("/permission/{id}")
//    public ResponseEntity<List<PermissionDto>> getAllPermisssionsById(@PathVariable Long id){
//        return ResponseEntity.ok(permissionService.getAllPermissionsById(id));
//    }

    @GetMapping("/permission")
    public ResponseEntity<List<PermissionDto>> getAllPermission(){
        return ResponseEntity.ok(permissionService.getAllPermission());
    }
}