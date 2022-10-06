package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.PollingOption;
import com.company.ComplainProject.model.PollingQuestion;
import com.company.ComplainProject.model.User;
import lombok.*;

import java.util.HashMap;
import java.util.List;

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
    private UserDetailsResponse user;
}
