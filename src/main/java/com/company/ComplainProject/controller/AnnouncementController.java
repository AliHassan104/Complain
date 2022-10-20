package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.AnnouncementDto;
import com.company.ComplainProject.dto.UserDetailsResponse;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.Announcement;
import com.company.ComplainProject.model.Event;
import com.company.ComplainProject.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@Controller
@RequestMapping("/api")
public class AnnouncementController {
    @Autowired
    AnnouncementService announcementService;

    @GetMapping("/announcement")
    public ResponseEntity<List<Announcement>> getAllEvent(){
        return ResponseEntity.ok(announcementService.getAllAnnouncement());
    }

    @GetMapping("/paginatedannouncement")
    public ResponseEntity<Page<Announcement>> getAllEventsWithPagination(@RequestParam(value = "pageNumber" ,defaultValue = "0",required = false) Integer pageNumber,
                                                                  @RequestParam(value = "pageSize" , defaultValue = "10",required = false) Integer pageSize){
        try{
            return ResponseEntity.ok(announcementService.getAllAnnouncementWithPagination(pageNumber,pageSize));
        }catch (Exception error){
            System.out.println(error+" get All events with pagination error");
            return  ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @GetMapping("/announcement/{id}")
    public  ResponseEntity<Optional<Announcement>> getEventWithId(@PathVariable Long id){
        return ResponseEntity.ok(announcementService.getAnnouncementById(id));
    }

    @PostMapping("/announcement")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<AnnouncementDto> addAnnouncement(@Valid @RequestBody AnnouncementDto announcementDto){
        try{
            return ResponseEntity.ok(announcementService.addAnnouncement(announcementDto));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/announcement/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteAnnouncementById(@PathVariable Long id){
        try{
            announcementService.deleteAnnouncement(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/announcement/{id}")
    public ResponseEntity<AnnouncementDto> updateAnnouncementTypeById(@PathVariable Long id,@RequestBody AnnouncementDto announcementDto){
        return ResponseEntity.ok(announcementService.updateAnnouncementById(id,announcementDto));
    }















}
