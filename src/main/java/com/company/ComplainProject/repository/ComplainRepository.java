package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Complain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplainRepository extends JpaRepository<Complain,Long> {
}
