package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.model.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class ComplainDto {

    private Long id;
    private String description;
    private String picture;
    private Area area;
    private Block block;
    private User user;
    private ComplainType complainType;
    private Status status = Status.IN_REVIEW;
    private LocalDate date;
    private LocalTime time;
    private List<ComplainLog> complainLog;

}
