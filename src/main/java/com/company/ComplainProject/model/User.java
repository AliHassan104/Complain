package com.company.ComplainProject.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Long phoneNumber;
    private String cnic;
    private Integer numberOfFamilyMembers;
//    private String address;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "area_id", referencedColumnName = "id")
    private Area area;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

//    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @ManyToMany
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id") ,
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Roles> roles = new HashSet<>();


//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "complain_id", referencedColumnName = "id")
//    private Complain complain;

//    @OneToMany
//    @JoinColumn(name = "user_id")
//    private List<PollingAnswer> pollingAnswers;
}
