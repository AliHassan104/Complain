package com.company.ComplainProject.dto;

import com.company.ComplainProject.config.customvalidation.UniqueContactNumber;
import com.company.ComplainProject.config.customvalidation.UniqueEmail;
import com.company.ComplainProject.dto.ProjectEnums.PropertyEnum;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.dto.ProjectEnums.UserType;
import com.company.ComplainProject.model.Address;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Roles;
import com.company.ComplainProject.model.Block;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class UserDto{
    private Long id;
    private String firstname;
    private String lastname;

    @UniqueEmail
    @NotBlank(message = "Email should not be blank")
    private String email;

    private String password;

    @UniqueContactNumber
    private Long phoneNumber;
    private String cnic;
    private Integer numberOfFamilyMembers;
    private Address address;
    @Lob
    private String deviceToken;
    private Area area;
    private Block block;
    @Enumerated(EnumType.STRING)
    private PropertyEnum property;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    private Set<Roles> roles = new HashSet<>();
//                                                          Enums for user Status
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.IN_REVIEW;
}
