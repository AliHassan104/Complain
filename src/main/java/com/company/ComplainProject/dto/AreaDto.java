package com.company.ComplainProject.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class AreaDto {
    private Long id;
    private String name;
    private String postalCode;
    private String block;
}
