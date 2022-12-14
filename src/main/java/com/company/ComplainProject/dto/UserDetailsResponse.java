package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.ProjectEnums.PropertyEnum;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.dto.ProjectEnums.UserType;
import com.company.ComplainProject.model.Address;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.model.Roles;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

/**
 *  send Response using UserDetailResponse (it will not return password)
 */
public class UserDetailsResponse {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phoneNumber;
    private String cnic;
    private Integer numberOfFamilyMembers;
    private Address address;
    @Lob
    private String deviceToken;
    private Area area;
    private Block block;
    private PropertyEnum property;
    private UserType userType;
    private Set<Roles> roles = new HashSet<>();
    //                                                          Enums for user Status
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.IN_REVIEW;

}
