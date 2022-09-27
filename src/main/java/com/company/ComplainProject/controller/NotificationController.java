package com.company.ComplainProject.controller;

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

}

//AAAAtfhZPjs:APA91bGzlGM3QaC6mnMyUnBTHwaNURf4_xlqULBGluwKJxcKTFQyFayEWHEFDfwUikVySLs-vS13sRlYGPm431IC3YApAmzNzb_kzKl0NKoUAV9xrrrAfBAIlqBjyg_6VEP4E0EK8HKm