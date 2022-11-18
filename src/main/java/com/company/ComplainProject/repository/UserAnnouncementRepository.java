package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.UserAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAnnouncementRepository extends JpaRepository <UserAnnouncement , Long> {
}
