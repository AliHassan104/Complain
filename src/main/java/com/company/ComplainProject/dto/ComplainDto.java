package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.statusEnum.Status;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.ComplainType;
import com.company.ComplainProject.model.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class ComplainDto {

    private Long id;
    private String title;
    private String description;
    private String suggestionForImprovement;
    private String picture;
    private Area area;
    private User user;
    private ComplainType complainType;
    private Status status = Status.IN_REVIEW;
    private String date;
    private String time;

}
