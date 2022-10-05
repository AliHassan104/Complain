package com.company.ComplainProject.repository;

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

}
