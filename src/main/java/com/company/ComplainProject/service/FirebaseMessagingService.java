package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ExceptionInFirebaseMessaging;
import com.company.ComplainProject.dto.*;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Async
@Service
public class FirebaseMessagingService {

    @Autowired
    private final FirebaseMessaging firebaseMessaging;


    private final Logger logger = LoggerFactory.getLogger(FirebaseMessagingService.class);

    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }

//     worker ko bhe notify
//

    //@Async
    public void sendNotification(Note note, String token) throws FirebaseMessagingException {
        try{
            if(token != null) {
                Notification notification = new Notification(note.getSubject(), note.getContent());

                Message message = Message
                        .builder()
                        .setToken(token)
                        .setNotification(notification)
                        .build();

                firebaseMessaging.send(message);
            }
            else{
                logger.error("Device Token is null");
            }
        }
        catch (Exception e){
            throw new ExceptionInFirebaseMessaging("Cannot Send Message Firebase message Exception "+e);
        }
    }

}
