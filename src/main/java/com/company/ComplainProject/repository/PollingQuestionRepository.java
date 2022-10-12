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

    @Query("SELECT p FROM PollingQuestion p WHERE p.id = :id")
    PollingQuestion findPollingQuestionById(@Param("id") Long id);


    @Query(value = "SELECT * FROM polling_question as p  WHERE p.area_id = :area_id  AND Timestamp(p.end_date,p.end_time) > CURRENT_TIMESTAMP()\n" +
            "AND p.id not in (SELECT ans.question_id FROM polling_answer as ans WHERE ans.user_id = :user_id );",nativeQuery = true)
    List<PollingQuestion> getAllPollingQuestionForUser(@Param("area_id") Long area_id,@Param("user_id") Long user_id);



}
