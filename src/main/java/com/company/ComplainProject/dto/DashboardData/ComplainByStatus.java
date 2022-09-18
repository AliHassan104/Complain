package com.company.ComplainProject.dto.DashboardData;

import com.company.ComplainProject.dto.ProjectEnums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ComplainByStatus {

    private Status status;
    private Long numberOfComplains;

}


