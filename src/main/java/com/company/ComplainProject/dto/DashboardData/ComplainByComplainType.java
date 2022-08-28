package com.company.ComplainProject.dto.DashboardData;

import lombok.*;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

public class ComplainByComplainType {

    private String complainType;
    private Long numberOfComplains;

    @Override
    public String toString() {
        return "ComplainByComplainType{" +
                "complainType='" + complainType + '\'' +
                ", numberOfComplains=" + numberOfComplains +
                '}';
    }


}
