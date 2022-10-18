package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.EventDto;
import com.company.ComplainProject.dto.Note;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.dto.UserDetailsResponse;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Event;
import com.company.ComplainProject.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;
    @Autowired
    AreaService areaService;
    @Autowired
    FirebaseMessagingService notificationService;
    @Autowired
    UserService userService;

    final String eventImageFolderPath = Paths.get("src/main/resources/static/event/images").toAbsolutePath().toString();
//                                                                                          get all events
    public List<Event> getAllEvent(){
        List<Event> events = eventRepository.findAll();
        return events;
    }
//                                                                                          get all event s with pagination
    public Page<Event> getAllEventWithPagination(Integer pageNumber,Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Event> eventPage = eventRepository.findAll(pageable);

        return eventPage;
     }

//                                                                                           save events in the record
     public EventDto saveEventsInRecord(EventDto eventDto) {
         try {
             EventDto _eventDto = todto(eventRepository.save(dto(eventDto)));

             if (_eventDto != null) {
                 Note note = new Note();
                 note.setSubject("New Event is added");
                 note.setContent("Event name " + _eventDto.getTitle());

                 List<UserDetailsResponse> userList = userService.getFilteredUser(new SearchCriteria("area", ":", _eventDto.getArea()));

                 for (UserDetailsResponse users : userList) {
                         notificationService.sendNotification(note, users.getDeviceToken());
                 }
             }
             return _eventDto;
         }catch (Exception e){
             throw new RuntimeException("Some thing went wrong cannot save Events");
         }
     }

//      `                                                                                     get event by id
     public Optional<Event> getEventById(Long id){
        Optional<Event> event = eventRepository.findById(id);
        if(!event.isPresent()){
            throw new ContentNotFoundException("No Event Exist Having id "+id);
        }
        return event;
     }
//                                                                                          Delete event by id
     public void deleteEventBuId(Long id){
        eventRepository.deleteById(id);
     }
//                                                                                          update event by id
     public EventDto updateEventById(Long id,EventDto eventDto){
        Event getevent = getAllEvent().stream().filter(event -> event.getId().equals(id)).findAny().get();
        Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(eventDto.getArea().getId())).findAny().get();

        if(getevent != null){
            getevent.setTitle(eventDto.getTitle());
            getevent.setDescription(eventDto.getDescription());
            getevent.setStartDate(eventDto.getStartDate());
            getevent.setStartTime(eventDto.getStartTime());
            getevent.setImage(eventDto.getImage());
            getevent.setArea(area);
        }
        return todto(eventRepository.save(getevent));
     }

     public InputStream getImageByName(String fileName) throws FileNotFoundException {
        try {
            String eventImagePath = eventImageFolderPath+File.separator+fileName;
            InputStream inputStream = new FileInputStream(eventImagePath);
            return inputStream;
        }catch (Exception e){
            System.out.println(e+" Cannot get Event image");
            throw new FileNotFoundException("Image not exist in Event Folder");
        }
     }


    public EventDto todto(Event event)
    {
        return  EventDto.builder().id(event.getId()).title(event.getTitle()).description(event.getDescription())
                .image(event.getImage()).startDate(event.getStartDate()).startTime(event.getStartTime()).area(event.getArea())
                .build();
    }

    public Event dto(EventDto eventDto){
        return Event.builder().id(eventDto.getId()).title(eventDto.getTitle()).description(eventDto.getDescription())
                .image(eventDto.getImage()).startDate(eventDto.getStartDate()).startTime(eventDto.getStartTime()).area(eventDto.getArea()).build();
    }

    public List<Event> getEventByArea(Long areaId) {
        Area area = areaService.getAllArea().stream().filter(area1 -> area1.getId().equals(areaId)).findAny().get();
        return eventRepository.findEventByArea(area);
    }

    public Long countAllEvents_Service() {
        return eventRepository.count();
    }
}
