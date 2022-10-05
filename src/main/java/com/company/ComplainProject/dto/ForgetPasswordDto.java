package com.company.ComplainProject.dto;


import lombok.*;

@ToString
@NoArgsConstructor
@Builder
@Data
@AllArgsConstructor
public class ForgetPasswordDto {

    private Long Id;
    private Integer otp;
    private String password;
}
