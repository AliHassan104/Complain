package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.AnnouncementDto;
import com.company.ComplainProject.dto.ComplainDetailsResponse;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.repository.AnnouncementRepository;
import com.company.ComplainProject.repository.AreaRepository;
import com.company.ComplainProject.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {
    @Autowired
    AnnouncementRepository announcementRepository;
    @Autowired
    SessionService service;
    @Autowired
    AreaRepository areaRepository;

    public List<Announcement> getAllAnnouncement(){
        List<Announcement> announcements = announcementRepository.findAll();
        return announcements;
    }

    public Optional<Announcement> getAnnouncementById(Long id){
        Optional<Announcement> announcement = announcementRepository.findById(id);
        if(!announcement.isPresent()){
            throw new ContentNotFoundException("No Event Exist Having id "+id);
        }
        return announcement;
    }

    public Page<Announcement> getAllAnnouncementWithPagination(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Announcement> announcementPage = announcementRepository.findAll(pageable);
        return announcementPage;
    }

    public void deleteAnnouncement(Long id){
        announcementRepository.deleteById(id);
    }

    public AnnouncementDto addAnnouncement(AnnouncementDto announcementDto) {
        try {
            User user = service.getLoggedInUser();
            announcementDto.setUser(user);
            return toDto(announcementRepository.save(dto(announcementDto)));
        }
        catch (Exception e ){
            throw new RuntimeException("Cannot Save Complain  "+e);
        }
    }


    public AnnouncementDto updateAnnouncementById(Long id, AnnouncementDto announcementDto) {
        try {
            Optional<Announcement> updateAnnouncement = announcementRepository.findById(id);
            User user = service.getLoggedInUser();

            if (updateAnnouncement != null) {
                updateAnnouncement.get().setDescription(announcementDto.getDescription());
                updateAnnouncement.get().setAnnouncementType(announcementDto.getAnnouncementType());
                updateAnnouncement.get().setArea(announcementDto.getArea());
                updateAnnouncement.get().setUser(user);
                updateAnnouncement.get().setTitle(announcementDto.getTitle());
                updateAnnouncement.get().setDate(announcementDto.getDate());
                updateAnnouncement.get().setTime(announcementDto.getTime());
            }
            return toDto(announcementRepository.save(updateAnnouncement.get()));
        }
        catch (Exception e){
            throw new RuntimeException("Cannot Update Complain  "+e);
        }
    }


    public Announcement dto(AnnouncementDto announcementDto){
        return Announcement.builder()
                .id(announcementDto.getId())
                .area(announcementDto.getArea())
                .description(announcementDto.getDescription())
                .title(announcementDto.getTitle())
                .announcementType(announcementDto.getAnnouncementType())
                .user(announcementDto.getUser())
                .date(announcementDto.getDate())
                .time(announcementDto.getTime())
                .build();
    }

    public AnnouncementDto toDto(Announcement announcement){
        return  AnnouncementDto.builder()
                .id(announcement.getId())
                .area(announcement.getArea())
                .description(announcement.getDescription())
                .title(announcement.getTitle())
                .user(announcement.getUser())
                .date(announcement.getDate())
                .time(announcement.getTime())
                .announcementType(announcement.getAnnouncementType())
                .build();
    }



}
