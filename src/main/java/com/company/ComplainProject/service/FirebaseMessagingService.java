package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.Note;
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

    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }


    public String sendNotification(Note note, String token) throws FirebaseMessagingException {
        Notification notification = new Notification(note.getSubject(),note.getContent());

        Message message = Message
                .builder()
                .setToken(token)
                .setNotification(notification)
               // .putAllData(note.getData())
                .build();

        return firebaseMessaging.send(message);
    }
}
