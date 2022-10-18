package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.PollingAnswer;
import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PollingAnswerRepository extends JpaRepository<PollingAnswer,Long> {

        @Query("SELECT COUNT(p) FROM PollingAnswer p WHERE p.pollingOption=:id")
        Long countUsersFromPollingOption(@Param("id") PollingOption pollingOption);

        @Query("SELECT p.pollingQuestion FROM PollingAnswer p WHERE p.user = :user")
        List<PollingQuestion> getAttemptedPollingQuestionsByUser(@Param("user") User user);

        @Query("SELECT COUNT(p) FROM PollingAnswer p WHERE p.pollingQuestion.id =:question_id")
        Long countAnsweredPollingQuestion(@Param("question_id") Long question_id);

}
