package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.ProjectEnums.OtpType;
import com.company.ComplainProject.model.OTP;
import com.company.ComplainProject.repository.OTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OTPService {


    @Autowired
    OTPRepository otpRepository;

    public OTP generateAndSaveOTP(String email){
        Random random=new Random();
        Integer otpCode=random.nextInt(9999);
        OTP otp = OTP.builder()
                .code(otpCode)
                .email(email)
                .type(OtpType.FORGOT_PASSWORD)
                .build();

        return otpRepository.save(otp);
    }
}
