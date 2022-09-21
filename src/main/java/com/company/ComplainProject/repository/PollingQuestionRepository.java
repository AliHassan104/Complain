package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.PollingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PollingQuestionRepository extends JpaRepository<PollingQuestion,Long> {

    @Query("SELECT p FROM PollingQuestion p WHERE p.area = :id ")
    List<PollingQuestion> findPollingQuestionByArea(@Param("id") Area area);
}
