package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.WaterTiming;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class WaterTimingByBlockDto {

    private Long area_id;
    private String area_name;
    private Long block_id;
    private String block_name;
    private List<WaterTimingDetails> waterTimingDtoList;

}
