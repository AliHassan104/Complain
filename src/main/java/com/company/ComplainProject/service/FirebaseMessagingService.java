package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ExceptionInFirebaseMessaging;
import com.company.ComplainProject.dto.*;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.Event;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.model.WaterTiming;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.EventRepository;
import com.company.ComplainProject.repository.WaterTimingRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FirebaseMessagingService {

    @Autowired
    private final FirebaseMessaging firebaseMessaging;
    @Autowired
    UserService userService;
    @Autowired
    ComplainRepository complainRepository;
    @Autowired
    WaterTimingRepository waterTimingRepository;
    @Autowired
    EventRepository eventRepository;

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
        Optional<Complain> complain = complainRepository.findById(c_id);

        Note note  = new Note();
        note.setSubject("Your Complain is in "+complain.get().getStatus());
        note.setContent("Your Complain of "+complain.get().getComplainType().getName()+" is in "+complain.get().getStatus());

        return sendNotification(note,complain.get().getUser().getDeviceToken());
    }

    public void sendNotificationOnWaterTiming(Long id) throws FirebaseMessagingException {
        Optional<WaterTiming> waterTiming = waterTimingRepository.findById(id);

        Note note = new Note();
        note.setSubject("Water timing Updates");
        note.setContent(waterTiming.get().getDay()+" at "+waterTiming.get().getStart_time()+" till "+waterTiming.get().getEnd_time());

        List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("block",":",waterTiming.get().getBlock()));

        for (UserDetailsResponse users:userList) {
            System.out.println(users);
            sendNotification(note,users.getDeviceToken());
        }

    }

    public void sendNotificationOnEventUpload(Long event_id) throws FirebaseMessagingException {
        Optional<Event> event = eventRepository.findById(event_id);

        Note note = new Note();
        note.setSubject("Event is added");
        note.setContent("Event name "+event.get().getTitle());

        List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("area",":",event.get().getArea()));

        for (UserDetailsResponse users:userList) {
            System.out.println(users);
            sendNotification(note,users.getDeviceToken());
        }
    }


}
