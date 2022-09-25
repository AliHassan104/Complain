package com.company.ComplainProject.model;

import com.company.ComplainProject.dto.ProjectEnums.PropertyEnum;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.dto.ProjectEnums.UserType;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Long phoneNumber;
    private String cnic;
    private Integer numberOfFamilyMembers;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.IN_REVIEW;
//                                                      owner/tenant
    @Enumerated(EnumType.STRING)
    private PropertyEnum property;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "area_id", referencedColumnName = "id")
    private Area area;

    @OneToOne
    @JoinColumn(name = "block_id",referencedColumnName = "id")
    private Block block;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @ManyToMany
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id") ,
            inverseJoinColumns = @JoinColumn(name = "role_id"))

    private Set<Roles> roles = new HashSet<>();



}
