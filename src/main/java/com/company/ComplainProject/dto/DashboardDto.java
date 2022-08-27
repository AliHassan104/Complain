package com.company.ComplainProject.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class DashboardDto {
    private Long noc; //no of complain
    private Long cip; //complain in progress
    private Long rc; //resolved complain
    private Long irc; //in review complain
    private List<Integer> complainChartData;
    private List<Integer> userChartData;
}
