package com.company.ComplainProject.repository;

import com.company.ComplainProject.dto.AnnouncementDto;
import com.company.ComplainProject.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement,Long> {

//    SELECT *
    @Query(value = "SELECT * FROM announcement WHERE announcement_status = 'PENDING' LIMIT 1", nativeQuery = true)
    List<Announcement> getAnnouncementByStatus();


}
