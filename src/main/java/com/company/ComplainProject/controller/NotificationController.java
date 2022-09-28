package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.Note;
import com.company.ComplainProject.service.FirebaseMessagingService;
import com.google.firebase.messaging.FirebaseMessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    FirebaseMessagingService firebaseMessagingService;

    @PostMapping("/send-notification")
    public String sendNotification(@RequestBody Note note,@RequestParam(value = "token") String token) throws FirebaseMessagingException {
        return firebaseMessagingService.sendNotification(note,token);
    }

    @PostMapping("/send-notification-touser")
    public String sendNotificationToUserAboutComplain(@RequestBody ComplainDto complainDto){
        try{
            return firebaseMessagingService.sendNotificationToUserOnComplainStatusChange(complainDto);
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("Error");
        }
    }

}
