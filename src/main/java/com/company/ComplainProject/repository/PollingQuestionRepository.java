package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.PollingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollingQuestionRepository extends JpaRepository<PollingQuestion,Long> {
}
