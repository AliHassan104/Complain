package com.company.ComplainProject.repository;

import com.company.ComplainProject.dto.WaterTimingByBlockDto;
import com.company.ComplainProject.dto.WaterTimingDto;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.model.WaterTiming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaterTimingRepository extends JpaRepository<WaterTiming,Long> {


    @Query("Select w FROM WaterTiming w WHERE w.block = :id")
    List<WaterTiming> getAllWaterTimingByBlock(@Param("id") Block id);

}
