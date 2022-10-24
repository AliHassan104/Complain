package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Permission;
import com.company.ComplainProject.model.PermissionRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRoleRepository extends JpaRepository<PermissionRole, Long> {

    @Query("SELECT pr FROM PermissionRole pr WHERE pr.roles.id = :id")
    List<PermissionRole> findByRoleId(@Param("id") Long id);

    @Query("SELECT pr FROM PermissionRole pr WHERE pr.permission.id = :id and pr.roles.id = :id1")
    PermissionRole findByPermissionId(@Param("id") Long id,@Param("id1") Long id1);

    @Query("SELECT p FROM PermissionRole p WHERE p.roles.id in :userRoles")
    List<PermissionRole> getPermissionRoleByRoleId(@Param("userRoles") List<Long> userRolesId);

//    @Query("DELETE pr FROM PermissionRole pr WHERE pr.id= :id")
//    void deleteByPermissionId(@Param("id") Long id);
}
