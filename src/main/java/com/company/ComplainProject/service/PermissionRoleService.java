package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.PermissionDto;
import com.company.ComplainProject.dto.PermissionRoleDto;
import com.company.ComplainProject.model.Permission;
import com.company.ComplainProject.model.PermissionRole;
import com.company.ComplainProject.repository.PermissionRepository;
import com.company.ComplainProject.repository.PermissionRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PermissionRoleService {

    @Autowired
    PermissionRoleRepository permissionRoleRepository;
    @Autowired
    PermissionRepository permissionRepository;
    @Autowired
    PermissionService permissionService;
    PermissionRoleDto permissionRoleDto1;
    PermissionRoleDto permissionRoleDto2;

    public PermissionRoleDto assignPermissionToRole(PermissionRoleDto permissionRoleDto) {
        try {


             permissionRoleDto2 = toDto(permissionRoleRepository.findByPermissionId(permissionRoleDto.getPermission().getId()));
            if(permissionRoleDto2!=null){
                if(permissionRoleDto.getAssign()!=false){
                    permissionRoleDto.setId(permissionRoleDto2.getId());
                    permissionRoleDto1 = toDto(permissionRoleRepository.save(toDo(permissionRoleDto)));
                }
                else{
                    permissionRoleDto.setId(permissionRoleDto2.getId());
                    permissionRoleRepository.delete(toDo(permissionRoleDto));
                }
            }
            return permissionRoleDto;
        }catch (Exception e){
//            throw new ContentNotFoundException("Cannot Assign Permission");
            permissionRoleDto1 = toDto(permissionRoleRepository.save(toDo(permissionRoleDto)));
            return permissionRoleDto1;
        }
    }

    public List<PermissionRoleDto> getAllAssignPermissionRoles() {
        try {
            return permissionRoleRepository.findAll().stream()
                    .map(permissionRole -> toDto(permissionRole))
                    .collect(Collectors.toList());
        }catch (Exception e){
            throw new ContentNotFoundException("Roles Permission Not Found");
        }
    }
    //
//    public List<PermissionDto> getAssignPermissionRolesById(Long id) {
//        List<PermissionRole> permissionRole = permissionRoleRepository.findByRoleId(id);
//        List<Permission> permissionList = permissionRole.stream()
//                                         .map(permissionRole1 -> permissionRepository.findById(permissionRole1.getPermission().getId()).get()).collect(Collectors.toList());
//        return permissionList.stream().map(permission -> toDto(permission)).collect(Collectors.toList());
//    }
    public PermissionDto toDto(Permission permission){
        return new PermissionDto().builder()
                .id(permission.getId())
                .url(permission.getUrl())
                .build();
    }

    private PermissionRoleDto toDto(PermissionRole permissionRole){
        return new PermissionRoleDto().builder()
                .id(permissionRole.getId())
                .roles(permissionRole.getRoles())
                .permission(permissionRole.getPermission())
                .canEdit(permissionRole.getCanEdit())
                .canDelete(permissionRole.getCanDelete())
                .build();
    }


    private PermissionRole toDo(PermissionRoleDto permissionRoleDto){
        return new PermissionRole().builder()
                .id(permissionRoleDto.getId())
                .roles(permissionRoleDto.getRoles())
                .permission(permissionRoleDto.getPermission())
                .canEdit(permissionRoleDto.getCanEdit())
                .canDelete(permissionRoleDto.getCanDelete())
                .build();
    }





}
