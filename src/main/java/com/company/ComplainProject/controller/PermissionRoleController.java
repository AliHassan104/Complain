package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.PermissionDto;
import com.company.ComplainProject.dto.PermissionRoleDto;
import com.company.ComplainProject.model.PermissionRole;
import com.company.ComplainProject.service.PermissionRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PermissionRoleController {

    @Autowired
    PermissionRoleService permissionRoleService;

    @PostMapping("/permission/role")
    public ResponseEntity<PermissionRoleDto> assignPermissionToRole(@RequestBody PermissionRoleDto permissionRoleDto){
        if(permissionRoleDto!=null){
            return ResponseEntity.ok(permissionRoleService.assignPermissionToRole(permissionRoleDto));
        }
        else{
            throw new ContentNotFoundException("Permissions Not Found");
        }
    }

    @GetMapping("/permission/role")
    public ResponseEntity<List<PermissionRoleDto>> getAllAssignPermissionRoles(){
        return ResponseEntity.ok(permissionRoleService.getAllAssignPermissionRoles());
    }

    @GetMapping("/permission/role/{id}")
    public ResponseEntity<List<PermissionDto>> getAssignPermissionRolesById(@PathVariable Long id){
        return ResponseEntity.ok(permissionRoleService.getAssignPermissionRolesById(id));
    }
}
