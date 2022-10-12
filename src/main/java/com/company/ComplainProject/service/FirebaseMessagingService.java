package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ExceptionInFirebaseMessaging;
import com.company.ComplainProject.dto.*;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.EventRepository;
import com.company.ComplainProject.repository.PollingQuestionRepository;
import com.company.ComplainProject.repository.WaterTimingRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private final Logger logger = LoggerFactory.getLogger(FirebaseMessagingService.class);

    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }

//     worker ko bhe notify
//

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


    public void sendNotificationToUserOnComplainStatusChange(ComplainDto complainDto) {
        try {
            if(complainDto.getUser().getDeviceToken() != null) {
                Note note = new Note();
                note.setSubject("Your Complain is in " + complainDto.getStatus());
                note.setContent("Your Complain of " + complainDto.getComplainType().getName() + " is in " + complainDto.getStatus());

                sendNotification(note, complainDto.getUser().getDeviceToken());
            }
            else{
                logger.error("Device Token of "+complainDto.getUser().getEmail()+" is null");
            }

        }catch (Exception e){
            throw new ExceptionInFirebaseMessaging("Cannot send Notification to user on complain status change "+e);
        }
    }

    public void sendNotificationOnWaterTiming(WaterTimingDto waterTiming){
        try {

            Note note = new Note();
            note.setSubject("Water timing Updates");
            note.setContent(waterTiming.getDay() + " at " + waterTiming.getStart_time() + " till " + waterTiming.getEnd_time());

            List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("block", ":", waterTiming.getBlock()));

            for (UserDetailsResponse users : userList) {
                if(users.getDeviceToken() != null) {
                    sendNotification(note, users.getDeviceToken());
                }
                else{
                    logger.error("Device Token of "+users.getEmail()+" is null");
                }
            }
        }
        catch (Exception e){
            throw new ExceptionInFirebaseMessaging("Cannot send Notification to user on water timing "+e);
        }
    }

    public void sendNotificationOnEventUpload(EventDto event) {
        try {

            Note note = new Note();
            note.setSubject("Event is added");
            note.setContent("Event name " + event.getTitle());

            List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("area", ":", event.getArea()));

            for (UserDetailsResponse users : userList) {
                if(users.getDeviceToken() != null) {
                    sendNotification(note, users.getDeviceToken());
                }
                else{
                    logger.error("Device Token of "+users.getEmail()+" is null");
                }
            }
        }
        catch (Exception e){
            throw new ExceptionInFirebaseMessaging("Cannot send Notification to user on event add "+e);
        }
    }

    public void sendNotificationOnNewPollingQuestion(PollingQuestionDto pollingQuestion)  {
        try {

            Note note = new Note();
            note.setSubject("New Polling Question is added");
            note.setContent("Question : " + pollingQuestion.getQuestion());

            List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("area", ":", pollingQuestion.getArea()));

            for (UserDetailsResponse users : userList) {
                if(users.getDeviceToken() != null) {
                    sendNotification(note, users.getDeviceToken());
                }
                else{
                    logger.error("Device Token of "+users.getEmail()+" is null");
                }
            }
        }
        catch (Exception e){
            throw new ExceptionInFirebaseMessaging("Cannot send Notification to user on new polling question"+e);
        }
    }


}
