package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.joda.time.DateTime;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

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
    private LocalTime time;
    private Block block;
}
