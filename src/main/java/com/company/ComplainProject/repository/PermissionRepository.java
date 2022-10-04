package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Permission;
import com.company.ComplainProject.model.PollingAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission,Long> {
}
