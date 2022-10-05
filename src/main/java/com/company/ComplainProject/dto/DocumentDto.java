package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Area;
import lombok.*;

import javax.validation.constraints.NotEmpty;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class DocumentDto {
    private Long id;
    @NotEmpty
    private String title;
    @NotEmpty
    private String url;
    private Area area;
}
