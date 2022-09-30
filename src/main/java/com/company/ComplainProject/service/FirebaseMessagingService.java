package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ExceptionInFirebaseMessaging;
import com.company.ComplainProject.dto.*;
import com.company.ComplainProject.model.Event;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.model.WaterTiming;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FirebaseMessagingService {

    @Autowired
    private final FirebaseMessaging firebaseMessaging;
    @Autowired
    UserService userService;
    @Autowired
    ComplainService complainService;
    @Autowired
    WaterTimingService waterTimingService;
    @Autowired
    EventService eventService;

    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }


    public String sendNotification(Note note, String token) throws FirebaseMessagingException {
        try{
            Notification notification = new Notification(note.getSubject(),note.getContent());

            Message message = Message
                    .builder()
                    .setToken(token)
                    .setNotification(notification)
                    .build();

            return firebaseMessaging.send(message);
        }
        catch (Exception e){
            System.out.println(e);
            throw new ExceptionInFirebaseMessaging("Cannot Send Message Firebase message Exception");
        }
    }


    public String sendNotificationToUserOnComplainStatusChange(Long c_id) throws FirebaseMessagingException {
        ComplainDto complainDto = complainService.getAllComplain().stream().filter(complain -> complain.getId().equals(c_id)).findAny().get();

        Note note  = new Note();
        note.setSubject("Your Complain is in "+complainDto.getStatus());
        note.setContent("Your Complain of "+complainDto.getComplainType().getName()+" is in "+complainDto.getStatus());

        return sendNotification(note,complainDto.getUser().getDeviceToken());
    }

    public void sendNotificationOnWaterTiming(Long id) throws FirebaseMessagingException {
        WaterTimingDto waterTimingDto = waterTimingService.toDto(waterTimingService.getAllWaterTiming().stream().filter(waterTiming -> waterTiming.getId().equals(id)).findAny().get());

        Note note = new Note();
        note.setSubject("Water timing Updates");
        note.setContent(waterTimingDto.getDay()+" at "+waterTimingDto.getStart_time()+" till "+waterTimingDto.getEnd_time());

        List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("block",":",waterTimingDto.getBlock()));

//        for (UserDetailsResponse users:userList) {
//            sendNotification(note,users.getDeviceToken());
//        }

    }

    public void sendNotificationOnEventUpload(Long event_id) throws FirebaseMessagingException {
        Event event = eventService.getAllEvent().stream().filter(event1 -> event1.getId().equals(event_id)).findAny().get();

        Note note = new Note();
        note.setSubject("Event is added");
        note.setContent("Event name "+event.getTitle());

        List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("area",":",event.getArea()));

//        for (UserDetailsResponse users:userList) {
//            sendNotification(note,users.getDeviceToken());
//        }
    }


}
