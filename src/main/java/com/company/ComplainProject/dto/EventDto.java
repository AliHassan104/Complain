package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Area;
import com.fasterxml.jackson.annotation.JsonFormat;
import javafx.scene.NodeBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.jackson.Jacksonized;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Jacksonized
@Builder
public class EventDto {
    private Long id;
    private String title;
    private String description;
    private String image;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    private Area area;



}
