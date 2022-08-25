package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Area;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class DocumentDto {
    private Long id;
    private String url;
    private Area area;
}
