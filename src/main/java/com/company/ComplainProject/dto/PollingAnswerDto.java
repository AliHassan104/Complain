package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.model.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class PollingAnswerDto {
    private Long id;
    private PollingQuestion pollingQuestion;
    private PollingOption pollingOption;
    private User user;
}
