package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.RolesDto;
import com.company.ComplainProject.model.Roles;
import com.company.ComplainProject.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RolesService {
    @Autowired
    RolesRepository rolesRepository;

    public List<RolesDto> getAllRoles() {
        try {
            return rolesRepository.findAll().stream()
                    .map(roles -> toDto(roles))
                    .collect(Collectors.toList());
        }catch (Exception e){
            throw new ContentNotFoundException("Roles Not Found");
        }
    }

    RolesDto toDto(Roles roles){
        return new RolesDto().builder().id(roles.getId())
                                       .name(roles.getName())
                                       .build();
    }
//
//    Roles toDto(Roles roles){
//        return new RolesDto().builder().id(roles.getId())
//                .name(roles.getName())
//                .build();
//    }
}
