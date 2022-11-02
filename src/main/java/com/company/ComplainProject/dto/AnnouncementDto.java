package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.ProjectEnums.AnnouncementStatus;
import com.company.ComplainProject.dto.ProjectEnums.AnnouncementType;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class AnnouncementDto {

    private Long id;
    private User user;
    private Area area;
    private AnnouncementType announcementType;
    private AnnouncementStatus announcementStatus;
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;

}
