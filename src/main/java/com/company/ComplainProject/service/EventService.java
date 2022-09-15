package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.EventDto;
import com.company.ComplainProject.model.Event;
import com.company.ComplainProject.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    final String eventImageFolderPath = Paths.get("src/main/resources/static/event/images").toAbsolutePath().toString();
//                                                                                          get all events
    public List<Event> getAllEvent(){
        List<Event> events = eventRepository.findAll();
        return events;
    }
//                                                                                          get all event s with pagination
    public List<EventDto> getAllEventWithPagination(Integer pageNumber,Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Event> eventPage = eventRepository.findAll(pageable);
        List<Event> events = eventPage.getContent();

        return events.stream().map(event -> todto(event)).collect(Collectors.toList());
     }

//                                                                                           save events in the record
     public EventDto saveEventsInRecord(EventDto eventDto){
        return todto(eventRepository.save(dto(eventDto)));
     }

//      `                                                                                     get event by id
     public Optional<Event> getEventById(Long id){
        Optional<Event> event = eventRepository.findById(id);
        if(!event.isPresent()){
//            Exception no content Found
            return null;
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
        if(getevent != null){
            getevent.setDescription(eventDto.getDescription());
            getevent.setStartDate(eventDto.getStartDate());
            getevent.setStartTime(eventDto.getStartTime());
            getevent.setImage(eventDto.getImage());
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
        return  EventDto.builder().id(event.getId()).description(event.getDescription())
                .image(event.getImage()).startDate(event.getStartDate()).startTime(event.getStartTime())
                .build();
    }

    public Event dto(EventDto eventDto){
        return Event.builder().id(eventDto.getId()).description(eventDto.getDescription())
                .image(eventDto.getImage()).startDate(eventDto.getStartDate()).startTime(eventDto.getStartTime()).build();
    }

}
