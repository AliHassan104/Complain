package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.PermissionDto;
import com.company.ComplainProject.dto.PermissionRoleDto;
import com.company.ComplainProject.model.Permission;
import com.company.ComplainProject.model.PermissionRole;
import com.company.ComplainProject.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PermissionService {

    @Autowired
    PermissionRepository permissionRepository;
    @Autowired
    PermissionByRoleIdService permissionByRoleIdService;

    public PermissionDto addPermissions(PermissionDto permissionDto) {
        return toDto(permissionRepository.save(toDo(permissionDto)));
    }



//    public List<PermissionDto> getAllPermissionsById(Long id) {
//        boolean flag = true;
//        try {
//            List<PermissionDto> permissionDtos = permissionByRoleIdService.getAssignPermissionRolesById(id);
//            return permissionDtos;
//        }catch (Exception e){
//            throw new ContentNotFoundException("Permissions Not Found");
//        }
//    }

//    public List<PermissionDto> getPermissionsByRoleId(Long id) {
//        try {
//            List<PermissionDto> permissionDtos = permissionRepository.findAll()
//                    .stream()
//                    .map(permission -> toDto(permission))
//                    .collect(Collectors.toList());
//            return permissionDtos;
//        }catch (Exception e){
//            throw new ContentNotFoundException("Permissions Not Found On Worker ");
//        }
//    }

    public PermissionDto toDto(Permission permission){
        return new PermissionDto().builder()
                .id(permission.getId())
                .url(permission.getUrl())
                .build();
    }

    public Permission toDo(PermissionDto permissionDto){
        return new Permission().builder()
                .id(permissionDto.getId())
                .url(permissionDto.getUrl())
                .build();
    }


    public List<PermissionDto> getAllPermission() {
        List<Permission> permissionList = permissionRepository.findAll();
        List<PermissionDto> permissionDtos = new ArrayList<>();
        permissionList.stream().map(complain -> permissionDtos.add(toDto(complain))).collect(Collectors.toList());
        return permissionDtos;
    }
}