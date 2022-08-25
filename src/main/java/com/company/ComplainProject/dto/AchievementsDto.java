package com.company.ComplainProject.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

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

public class AchievementsDto {
    private Long id;
    private String title;
    private String description;
    private String pictureUrl;
    private String date;
    private String time;
}
