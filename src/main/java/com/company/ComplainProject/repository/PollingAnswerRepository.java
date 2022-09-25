package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.PollingAnswer;
import com.company.ComplainProject.model.PollingOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PollingAnswerRepository extends JpaRepository<PollingAnswer,Long> {

        @Query("SELECT COUNT(p) FROM PollingAnswer p WHERE p.pollingOption=:id")
        Long countUsersFromPollingOption(@Param("id") PollingOption pollingOption);

}
