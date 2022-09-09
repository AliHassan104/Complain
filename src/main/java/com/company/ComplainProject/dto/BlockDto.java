package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Area;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder

public class BlockDto {
    private Long id;
    private String block_name;
    private Area area;

}
