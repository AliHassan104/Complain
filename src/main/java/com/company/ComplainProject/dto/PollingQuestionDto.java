package com.company.ComplainProject.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString

public class PollingQuestionDto {
    private Long id;
    private String question;
}
