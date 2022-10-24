package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Permission;
import com.company.ComplainProject.model.Roles;
import lombok.*;

import javax.persistence.ManyToOne;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PermissionRoleDto {

    private Long id;
    private Roles roles;
    private Permission permission;
    private Boolean canEdit;
    private Boolean canDelete;
    private Boolean assign;
    private String parent;
    private String label;

}
