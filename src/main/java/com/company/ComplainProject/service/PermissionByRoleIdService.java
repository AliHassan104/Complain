package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.PermissionDto;
import com.company.ComplainProject.dto.PermissionRoleDto;
import com.company.ComplainProject.model.Permission;
import com.company.ComplainProject.model.PermissionRole;
import com.company.ComplainProject.repository.PermissionRepository;
import com.company.ComplainProject.repository.PermissionRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PermissionByRoleIdService {



    @Autowired
    PermissionRepository permissionRepository;
    @Autowired
    PermissionRoleRepository permissionRoleRepository;
    public List<PermissionRoleDto> getAssignPermissionRolesById(Long id) {

        List<PermissionRole> permissionRole = permissionRoleRepository.findByRoleId(id);

        List<Permission> permissionList = permissionRepository.findAll();
        List<PermissionRoleDto> permissionRoleDtos = new ArrayList<>();

        for(Permission permission: permissionList){
            Boolean flag = false;
            for(PermissionRole permissionRole1: permissionRole){
                if(permission.getId()==permissionRole1.getPermission().getId()){
                    flag = true;
                  PermissionRoleDto permissionRoleDto =  new PermissionRoleDto().builder()
                                                        .permission(permissionRole1.getPermission())
                                                        .roles(permissionRole1.getRoles())
                                                        .canEdit(permissionRole1.getCanEdit())
                                                        .canDelete(permissionRole1.getCanDelete())
                                                        .build();
                    permissionRoleDtos.add(permissionRoleDto);
                }
            }
            if(!flag){
                PermissionRoleDto permissionRoleDto =  new PermissionRoleDto().builder()
                        .permission(permission)
                        .build();
                permissionRoleDtos.add(permissionRoleDto);
            }
        }
//        return permissionList.stream().map(permission -> toDto(permission)).collect(Collectors.toList());
        return permissionRoleDtos;
    }

    public PermissionDto toDto(Permission permission){
        return new PermissionDto().builder()
                .id(permission.getId())
                .url(permission.getUrl())
                .build();
    }
}
