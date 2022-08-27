package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.PollingAnswer;
import com.company.ComplainProject.model.PollingQuestion;
import lombok.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class PollingOptionDto {
    private Long id;
    private String option;
    private PollingQuestion pollingQuestion;
}
