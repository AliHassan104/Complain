package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.PermissionDto;
import com.company.ComplainProject.model.Permission;
import com.company.ComplainProject.model.PermissionRole;
import com.company.ComplainProject.repository.PermissionRepository;
import com.company.ComplainProject.repository.PermissionRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PermissionByRoleIdService {

    @Autowired
    PermissionRepository permissionRepository;
    @Autowired
    PermissionRoleRepository permissionRoleRepository;
    public List<PermissionDto> getAssignPermissionRolesById(Long id) {
        List<PermissionRole> permissionRole = permissionRoleRepository.findByRoleId(id);
        List<Permission> permissionList = permissionRole.stream()
                .map(permissionRole1 -> permissionRepository.findById(permissionRole1.getPermission().getId()).get()).collect(Collectors.toList());
        return permissionList.stream().map(permission -> toDto(permission)).collect(Collectors.toList());
    }
    public PermissionDto toDto(Permission permission){
        return new PermissionDto().builder()
                .id(permission.getId())
                .url(permission.getUrl())
                .build();
    }
}
