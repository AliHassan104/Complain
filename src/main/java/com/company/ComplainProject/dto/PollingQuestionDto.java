package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.PollingOption;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString

public class PollingQuestionDto {
    private Long id;
    private String question;
    private List<PollingOption> pollingOptions;
}
