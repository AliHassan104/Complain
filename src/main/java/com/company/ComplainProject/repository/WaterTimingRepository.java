package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.WaterTiming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaterTimingRepository extends JpaRepository<WaterTiming,Long> {
}
