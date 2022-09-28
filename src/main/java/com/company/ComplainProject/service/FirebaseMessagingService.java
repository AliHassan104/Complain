package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.Note;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.dto.WaterTimingDto;
import com.company.ComplainProject.model.WaterTiming;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FirebaseMessagingService {

    @Autowired
    private final FirebaseMessaging firebaseMessaging;
    @Autowired
    UserService userService;

    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }


    public String sendNotification(Note note, String token) throws FirebaseMessagingException {
        Notification notification = new Notification(note.getSubject(),note.getContent());

        Message message = Message
                .builder()
                .setToken(token)
                .setNotification(notification)
                .build();

        return firebaseMessaging.send(message);
    }

    public String sendNotificationToUserOnComplainStatusChange(ComplainDto complainDto) throws FirebaseMessagingException {
        Note note  = new Note();
        note.setSubject("Your Complain is in "+complainDto.getStatus());
        note.setContent("Your Complain of "+complainDto.getComplainType().getName()+" is in "+complainDto.getStatus());

        Notification notification = new Notification(note.getSubject(),note.getContent());

        Message message = Message
                .builder()
                .setToken(complainDto.getUser().getDeviceToken())
                .setNotification(notification)
                .build();

        return  firebaseMessaging.send(message);
    }

    public void sendNotificationOnWaterTiming(WaterTimingDto waterTimingDto){
        Note note = new Note();
        note.setSubject("Water timing Update");
        note.setContent("");
    }


}
