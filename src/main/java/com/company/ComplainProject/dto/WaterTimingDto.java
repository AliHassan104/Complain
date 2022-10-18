package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class WaterTimingDto {
    private Long id;
    private String day;
    private LocalDate date;
    private LocalTime start_time;
    private LocalTime end_time;
    private Block block;
    private Area area;
}
