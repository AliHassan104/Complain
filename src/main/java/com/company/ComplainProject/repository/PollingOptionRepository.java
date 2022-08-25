package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.PollingOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollingOptionRepository extends JpaRepository<PollingOption,Long> {
}
