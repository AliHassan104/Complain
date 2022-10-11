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
            throw new ExceptionInFirebaseMessaging("Cannot Send Message Firebase message Exception "+e);
        }
    }


    public String sendNotificationToUserOnComplainStatusChange(ComplainDto complainDto) {
        try {

            Note note = new Note();
            note.setSubject("Your Complain is in " + complainDto.getStatus());
            note.setContent("Your Complain of " +complainDto.getComplainType().getName() + " is in " + complainDto.getStatus());

            return sendNotification(note, complainDto.getUser().getDeviceToken());

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
                sendNotification(note, users.getDeviceToken());
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
                sendNotification(note, users.getDeviceToken());
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
                sendNotification(note, users.getDeviceToken());
            }
        }
        catch (Exception e){
            throw new ExceptionInFirebaseMessaging("Cannot send Notification to user on new polling question"+e);
        }
    }


}
