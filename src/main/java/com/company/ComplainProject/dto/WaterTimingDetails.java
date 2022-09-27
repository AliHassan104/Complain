package com.company.ComplainProject.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WaterTimingDetails {

    private String day;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime start_time;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime end_time;
    private LocalDate date;

}
