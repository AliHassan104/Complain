package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.model.*;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ComplainDetailsResponse {
    private Long id;
    private String description;
    @NotNull
    private String picture;
    private Area area;
    private Block block;
    private UserDetailsResponse user;
    private ComplainType complainType;
    private Status status = Status.IN_REVIEW;
    private LocalDate date;
    private LocalTime time;
    private List<ComplainLog> complainLog;
}
