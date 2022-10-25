package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.*;
import com.company.ComplainProject.dto.ProjectEnums.AnnouncementStatus;
import com.company.ComplainProject.dto.ProjectEnums.AnnouncementType;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.repository.AnnouncementRepository;
import com.company.ComplainProject.repository.AreaRepository;
import com.google.firebase.messaging.FirebaseMessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class AnnouncementService {
    @Autowired
    AnnouncementRepository announcementRepository;
    @Autowired
    SessionService service;
    @Autowired
    FirebaseMessagingService notificationService;
    @Autowired
    UserService userService;
    @Autowired
    AreaRepository areaRepository;

    public List<Announcement> getAllAnnouncement() throws FirebaseMessagingException {
//        Announcement _announcement = announcementRepository.getAnnouncementScheduler();
//        System.out.println(_announcement);
//        AnnouncementToUser(_announcement);

        List<Announcement> announcements = announcementRepository.findAll();
        getPendingAnnouncement();
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

            AnnouncementDto _announcementDto = toDto(announcementRepository.save(dto(announcementDto)));
//            if (_announcementDto != null) {
//                if (_announcementDto.getAnnouncementType() == AnnouncementType.NOTIFICATION){
//
//                Note note = new Note();
//                note.setSubject(_announcementDto.getTitle());
//                note.setContent(_announcementDto.getDescription());
//
//                List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("area", ":",_announcementDto.getArea()));
//
//            }
//                else if (_announcementDto.getAnnouncementType() == AnnouncementType.SMS){
//
//                }
//            }


            return announcementDto;
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
                updateAnnouncement.get().setAnnouncementStatus(announcementDto.getAnnouncementStatus());
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

    @Async
    public void AnnouncementToUser(PendingAnnoucementDTO _announcementDto) throws FirebaseMessagingException {

            if (_announcementDto != null) {

                Note note = new Note();

                note.setSubject(_announcementDto.getTitle());

                note.setContent(_announcementDto.getDescription());

                List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("area", ":",_announcementDto.getAreaId()));

                for (UserDetailsResponse users : userList) {
                    notificationService.sendNotification(note,users.getDeviceToken());
                }

            }


    }

    public PendingAnnoucementDTO getPendingAnnouncement() throws FirebaseMessagingException {
        List<PendingAnnoucementDTO> _announcement = announcementRepository.getAnnouncementScheduler();
        if(_announcement.size() > 0 ){
            return _announcement.get(0);
        }

        return null; //threow wxception
    }

    public AnnouncementDto updateAnnouncementStatus(Long id, AnnouncementDto announcementDto) {
        try {
            Optional<Announcement> updateComplain = announcementRepository.findById(id);
            if (updateComplain.isPresent()) {
                updateComplain.get().setAnnouncementStatus(announcementDto.getAnnouncementStatus());
            }
            else{
                throw new ContentNotFoundException("Announcement "+id);
            }
            return announcementDto;

        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot update complain Status "+e);
        }
    }




    //    @Scheduled(fixedRate = 10000)
    @Scheduled(cron = "*/10 * * * * *")
    public void SendAnnouncement() throws FirebaseMessagingException {

        PendingAnnoucementDTO anc =  getPendingAnnouncement();
        System.out.println(anc);

        AnnouncementToUser(anc);
//        getAllAnnouncement();

//        Announcement _announcement = announcementRepository.getAnnouncementScheduler();

//        System.out.println(_announcement);

//        AnnouncementToUser(_announcement);

//        announcementAsync.getAsyncExecutor();
    }

    private void sleep(int args){
        try {
            TimeUnit.SECONDS.sleep(args);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public Announcement dto(AnnouncementDto announcementDto){
        return Announcement.builder()
                .id(announcementDto.getId())
                .area(announcementDto.getArea())
                .description(announcementDto.getDescription())
                .title(announcementDto.getTitle())
                .announcementType(announcementDto.getAnnouncementType())
                .announcementStatus(announcementDto.getAnnouncementStatus())
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
                .announcementStatus(announcement.getAnnouncementStatus())
                .build();
    }



}
