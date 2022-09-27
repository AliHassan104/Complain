package com.company.ComplainProject.dto;

import lombok.*;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder

public class EmailRequest {
    private String to;
    private String subject;
    private String message;
}
