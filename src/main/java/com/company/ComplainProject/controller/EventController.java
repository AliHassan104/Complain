package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.image.EventImageImplementation;
import com.company.ComplainProject.dto.EventDto;
import com.company.ComplainProject.model.Event;
import com.company.ComplainProject.service.EventService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Optional;

@CrossOrigin
@Controller
@RequestMapping("/api")
public class EventController {

    @Autowired
    EventService eventService;
    @Autowired
    EventImageImplementation eventImageImplementation;

    final String eventImageApi = "http://localhost:8081/api/event/images/";

    @GetMapping("/event")
    public ResponseEntity<List<Event>> getAllEvent(){
        List<Event> events = eventService.getAllEvent();
        if(!events.isEmpty()) {
            return ResponseEntity.ok(eventService.getAllEvent());
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    @GetMapping("/paginatedEvents")
    public ResponseEntity<List<EventDto>> getAllEventsWithPagination(@RequestParam(value = "pageNumber" ,defaultValue = "0",required = false) Integer pageNumber,
                                                                     @RequestParam(value = "pageSize" , defaultValue = "10",required = false) Integer pageSize){
        try{
            return ResponseEntity.ok(eventService.getAllEventWithPagination(pageNumber,pageSize));
        }catch (Exception error){
            System.out.println(error+" get All events with pagination error");
            return  ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }
    @GetMapping("/event/{id}")
    public  ResponseEntity<Optional<Event>> getEventWithId(@PathVariable Long id){
        try{
            return ResponseEntity.ok(eventService.getEventById(id));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/event")
    public ResponseEntity<EventDto> saveEventsInRecord(@RequestParam("image")MultipartFile image,@RequestParam("data")String eventData){

        try {
            ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();
            EventDto eventDto = objectMapper.readValue(eventData, EventDto.class);
//                                                                      Save image in the disk
            String imageName = eventImageImplementation.uploadImage(image);

            String eventImagePath = eventImageApi+imageName;

            eventDto.setImage(eventImagePath);

            return ResponseEntity.ok(eventService.saveEventsInRecord(eventDto));
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PutMapping("/event/{id}")
    public ResponseEntity<EventDto> updateEventById(@PathVariable Long id,@RequestParam("image") MultipartFile image,@RequestParam("data") String eventData){
        try{
//            Delete the previous image
//            Boolean eventImageDeleted = eventImageImplementation.deleteEventImage(id);

            if(image.isEmpty()){
               return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }

            ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();
            EventDto eventDto = objectMapper.readValue(eventData,EventDto.class);
//
//                                                                                     upload the image in the disk
//            if(eventImageDeleted) {
                String uploadImageName = eventImageImplementation.uploadImage(image);
                eventDto.setImage(eventImageApi+uploadImageName);
                return ResponseEntity.ok(eventService.updateEventById(id, eventDto));
//            }
//            else{
//                return ResponseEntity.status(HttpStatus.CONFLICT).build();
//            }
        }catch (Exception e){
            System.out.println(e+" update Event exception");
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<Void> deleteEventById(@PathVariable Long id){
        try{
            eventService.deleteEventBuId(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
