package com.company.ComplainProject.model;


import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
public class PermissionRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Roles roles;
    @ManyToOne
    private Permission permission;
    private Boolean canActive;
    private Boolean canDelete;
}
