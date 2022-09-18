package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.ProjectEnums.PropertyEnum;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.model.Address;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Roles;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class UserDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Long phoneNumber;
    private String cnic;
    private Integer numberOfFamilyMembers;
    private Address address;
    private Area area;
    private PropertyEnum property;
    private Set<Roles> roles = new HashSet<>();
//                                                          Enums for user Status
    private UserStatus status;
}
