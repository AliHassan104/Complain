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

    @GetMapping("/send-notification-touser/{complain_id}")
    public String sendNotificationToUserAboutComplain(@PathVariable("complain_id") Long complain_id){
        try{
            return firebaseMessagingService.sendNotificationToUserOnComplainStatusChange(complain_id);
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("Error");
        }
    }

    @GetMapping("/send-notification-about-watertiming/{watertiming_id}")
    public void sendNotificationToUserAboutWaterTiming(@PathVariable("watertiming_id") Long watertiming_id){
        try{
            firebaseMessagingService.sendNotificationOnWaterTiming(watertiming_id);
        }catch (Exception e){
            System.out.println(e);
        }
    }

    @GetMapping("/send-notification-about-events/{event_id}")
    public void sendNotificationToUserAboutEvents(@PathVariable("event_id") Long event_id){
        try{
            firebaseMessagingService.sendNotificationOnEventUpload(event_id);
        }catch (Exception e){
            System.out.println(e);
        }
    }

}
