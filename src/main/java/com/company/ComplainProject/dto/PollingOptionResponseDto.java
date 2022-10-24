package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.PollingOption;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class PollingOptionResponseDto {
    private String pol_options;
    private Long count;
}
