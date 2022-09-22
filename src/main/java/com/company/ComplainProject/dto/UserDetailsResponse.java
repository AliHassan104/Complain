package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.ProjectEnums.PropertyEnum;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.dto.ProjectEnums.UserTypeEnum;
import com.company.ComplainProject.model.Address;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.model.Roles;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserDetailsResponse {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private Long phoneNumber;
    private String cnic;
    private Integer numberOfFamilyMembers;
    private Address address;
    private Area area;
    private Block block;
    private PropertyEnum property;
    private UserTypeEnum userTypeEnum;
    private Set<Roles> roles = new HashSet<>();
    //                                                          Enums for user Status
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.IN_REVIEW;

}
