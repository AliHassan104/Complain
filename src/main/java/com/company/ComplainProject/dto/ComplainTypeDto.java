package com.company.ComplainProject.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class ComplainTypeDto {
    private Long id;
    @NotNull
    private String name;
}
