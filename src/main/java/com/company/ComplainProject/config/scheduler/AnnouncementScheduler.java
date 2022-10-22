//package com.company.ComplainProject.config.scheduler;
//
//import com.company.ComplainProject.dto.AnnouncementDto;
//import com.company.ComplainProject.dto.Note;
//import com.company.ComplainProject.dto.ProjectEnums.AnnouncementType;
//import com.company.ComplainProject.dto.SearchCriteria;
//import com.company.ComplainProject.dto.UserDetailsResponse;
//import com.company.ComplainProject.model.Announcement;
//import com.company.ComplainProject.repository.AnnouncementRepository;
//import com.company.ComplainProject.service.FirebaseMessagingService;
//import com.company.ComplainProject.service.UserService;
//import com.google.firebase.messaging.FirebaseMessagingException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//
//import java.util.List;
//
////@EnableAsync
//public class AnnouncementScheduler {
//    @Autowired
//    AnnouncementRepository announcementRepository;
//    @Autowired
//    AnnouncementAsync announcementAsync;
//    @Autowired
//    FirebaseMessagingService notificationService;
////    @Autowired
////    AnnouncementRepository announcementRepository;
////    @Async
////    @Scheduled(fixedRate = 1000)
////    public void scheduleFixedRateTaskAsync() throws InterruptedException {
////        System.out.println(
////                "Fixed rate task async - " + System.currentTimeMillis() / 1000);
////        Thread.sleep(2000);
////    }
//
////    sec , min , hr , dayofmonth , month , dayofweek
////    @Scheduled(cron = "*/3 * * * * *")
//
//    @Scheduled(cron = "*/3 * * * * *")
//    public void SendAnnouncement(){
//        announcementAsync.getAsyncExecutor();
////        return announcementRepository.getAnnouncementByStatus();
//    }
//}
//
//
////        List<Announcement> _announcementDto = announcementRepository.getAnnouncementByStatus();
////
////        System.out.println(_announcementDto);
//
//
////            if (_announcementDto != null) {
////                if (_announcementDto.getAnnouncementType() == AnnouncementType.NOTIFICATION){
////
////                Note note = new Note();
////                note.setSubject(_announcementDto.getTitle());
////                note.setContent(_announcementDto.getDescription());
////
////                List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("area", ":",_announcementDto.getArea()));
////
////                for (UserDetailsResponse users : userList) {
////                    if (users.getDeviceToken() != null || users.getDeviceToken() != ""){
////                        notificationService.sendNotification(note,users.getDeviceToken());
////                    }
////                }
////            }
////                else if (_announcementDto.getAnnouncementType() == AnnouncementType.SMS){
////
////                }
////            }
////        announcementRepository.getAnnouncementByStatus();
////        System.out.println("Announcement Sent");
