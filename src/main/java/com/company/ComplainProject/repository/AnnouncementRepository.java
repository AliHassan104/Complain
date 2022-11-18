package com.company.ComplainProject.repository;

import com.company.ComplainProject.dto.AnnouncementDto;
import com.company.ComplainProject.dto.PendingAnnoucementDTO;
import com.company.ComplainProject.dto.ProjectEnums.AnnouncementStatus;
import com.company.ComplainProject.model.Announcement;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement,Long> {

//    and announcement_type= 'NOTIFICATION'
    @Query(value = "SELECT new com.company.ComplainProject.dto.PendingAnnoucementDTO(a.id,a.title,a.description,a.area.id,a.announcementType) " +
            "From Announcement a WHERE announcement_status = 'PENDING' and date = CURDATE()")
    public List<PendingAnnoucementDTO> getAnnouncementScheduler();

//    @Query("SELECT NEW com.company.ComplainProject.model.Announcement(a.id,a.title) FROM Announcement a WHERE a.area = :id ")
//    List<Announcement>  getAllAnnouncementByArea(@Param("id") Long areaId);


    @Query(value = "select * FROM Announcement a WHERE a.area_id =:id ",nativeQuery = true)
    List<Announcement>  getAllAnnouncementByArea(@Param("id") Long areaId);


//    @Query(value = "SELECT a FROM Announcement a WHERE a.announcementStatus  =:status ")
//    Announcement getAnnouncementByStatus(@Param("status") AnnouncementStatus announcementStatus);


}
