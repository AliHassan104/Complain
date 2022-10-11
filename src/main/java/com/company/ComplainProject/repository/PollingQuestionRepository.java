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






    @Query("SELECT p FROM PollingQuestion p  WHERE p.area.id = :area_id AND DATE(p.end_date) >= CURDATE() AND p.end_time >= CURRENT_TIME()\n" +
            "AND p.id not in (SELECT ans.pollingQuestion FROM PollingAnswer ans WHERE ans.user.id = :user_id)")
    List<PollingQuestion> findAllPollingQuestionByUser(@Param("area_id") Long area_id,@Param("user_id") Long user_id);
}
