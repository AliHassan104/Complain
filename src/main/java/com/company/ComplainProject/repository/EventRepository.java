package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Long>{


    @Query("SELECT e FROM Event e WHERE e.area=:id")
    List<Event> findEventByArea(@Param("id") Area areaId);

}
