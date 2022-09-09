package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.statusEnum.Status;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import com.company.ComplainProject.model.ComplainType;
import com.company.ComplainProject.model.User;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

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
    private String date;
    private String time;

}
