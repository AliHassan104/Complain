package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ForgetPasswordDto;
import com.company.ComplainProject.dto.UserDetailsResponse;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.OTP;
import com.company.ComplainProject.service.EmailService;
import com.company.ComplainProject.service.OTPService;
import com.company.ComplainProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api")
public class ForgetPasswordController {


    @Autowired
    EmailService emailService;

    @Autowired
    UserService userService;

    @Autowired
    OTPService otpService;

    @PostMapping("/send/otp/{email}")
    public void sendOTP(@PathVariable String email) throws MalformedURLException, UnsupportedEncodingException {


        UserDetailsResponse user = userService.getUserByEmail(email);
        try{
            OTP otp = otpService.generateAndSaveOTP(user.getEmail());
            emailService.sendForgetPasswordEmail(user,otp);
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @PutMapping("/updatePassword")
    public ResponseEntity<UserDetailsResponse> changePassword(@RequestBody ForgetPasswordDto forgetPasswordDto){
        try{
            return ResponseEntity.ok(userService.updateUserPassword(forgetPasswordDto));
        }
        catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("User with id not present");
        }
    }


}
