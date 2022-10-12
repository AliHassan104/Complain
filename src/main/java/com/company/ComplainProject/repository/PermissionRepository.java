package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Permission;
import com.company.ComplainProject.model.PermissionRole;
import com.company.ComplainProject.model.PollingAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<Permission,Long> {
    @Query("SELECT p FROM Permission p WHERE p.id not in (:id)")
    List<Permission> notPresentById(@Param("id") List<Long> permission);
}
