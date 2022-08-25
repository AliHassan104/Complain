package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Achievements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AchievementRepository extends JpaRepository<Achievements,Long> {
}
