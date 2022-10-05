package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.PermissionDto;
import com.company.ComplainProject.model.Permission;
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

    public PermissionDto addPermissions(PermissionDto permissionDto) {
        return toDto(permissionRepository.save(toDo(permissionDto)));
    }



    public List<PermissionDto> getAllPermissions() {
        try {
            List<PermissionDto> permissionDtos = permissionRepository.findAll()
                    .stream()
                    .map(permission -> toDto(permission))
                    .collect(Collectors.toList());
            return permissionDtos;
        }catch (Exception e){
            throw new ContentNotFoundException("Permissions Not Found");
        }
    }

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


}
