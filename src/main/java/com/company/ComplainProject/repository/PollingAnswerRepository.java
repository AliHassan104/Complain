package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.PollingAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollingAnswerRepository extends JpaRepository<PollingAnswer,Long> {
}
