package com.company.ComplainProject.dto;


import lombok.*;

@ToString
@NoArgsConstructor
@Builder
@Data
@AllArgsConstructor
@Getter
@Setter
public class ForgetPasswordDto {

    private Long UserId;
    private Integer otp;
    private String password;
}
