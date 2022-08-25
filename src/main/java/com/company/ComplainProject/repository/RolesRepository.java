package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashSet;

@Repository
public interface RolesRepository extends JpaRepository<Roles,Long> {
    HashSet<Roles> findByName(String name);
}
