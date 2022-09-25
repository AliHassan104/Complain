package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.PollingOption;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString

public class PollingQuestionDto {
    private Long id;
    private String question;
    private LocalDate end_date;
    private LocalTime end_time;
    private Area area;
    private List<PollingOption> pollingOptions;
}
