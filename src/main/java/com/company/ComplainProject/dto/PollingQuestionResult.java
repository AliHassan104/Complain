package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.PollingOption;
import lombok.*;

import javax.persistence.Lob;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class PollingQuestionResult {
    private Long id;
    @Lob
    private String pollingQuestion;
    private List<PollingOptionResponseDto> getPollingQuestionResult;
}
