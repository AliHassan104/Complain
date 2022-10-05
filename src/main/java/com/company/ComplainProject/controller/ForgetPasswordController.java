package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ForgetPasswordDto;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.ForgetPassword;
import com.company.ComplainProject.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Random;
import java.util.UUID;

//@CrossOrigin("*")
@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "*")

public class ForgetPasswordController {


    @Autowired
    EmailService emailService;
    @Autowired
    ForgetPassword forgetPassword;
    @Value("${email.send}")
    private String emailPath;

    @PostMapping("/send/otp")
    public void sendOTP(@RequestBody String email) throws MalformedURLException, UnsupportedEncodingException {

        Random random=new Random();
        int otp=random.nextInt(9999);

        Long getbyEmail= emailService.getUserIdByEmail(email);
        String userId=String.valueOf(getbyEmail);
        String otp2=String.valueOf(otp);

        URL url=new URL(emailPath+"#/new-password?otp="+ URLEncoder.encode(otp2, String.valueOf(StandardCharsets.UTF_8))+"&userId="
                +URLEncoder.encode(userId));
        String message="hello dear your url " + url;
        String subject="Confirmation code";
        String to=email;

        forgetPassword.setOtp(otp);
        emailService.saveOtpInDb(forgetPassword);
        this.emailService.sendEmail(subject,message,to);

    }



    @GetMapping("/getAllOtp")
    public ResponseEntity<List<ForgetPassword>> getAllOtp(){
        List<ForgetPassword> getOtp=emailService.getAllOtp();
        return ResponseEntity.ok(getOtp);
    }



    @PutMapping("/updatePassword")
    public ResponseEntity<UserDto> changePassword( @RequestBody ForgetPasswordDto forgetPasswordDto){

        try{


//            Long id1 = Long.parseLong();
            return ResponseEntity.ok(emailService.updateUserPassword(forgetPasswordDto));
        }
        catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("User with id not present");
        }
    }


//    @PutMapping("/testing")
//        public ResponseEntity<String> helloReturn(){
////        try{
////            Long id=forgetPasswordDto.getId();
//////            Long id1 = Long.parseLong();
////            return ResponseEntity.ok(emailService.updateUserPassword(id,forgetPasswordDto));
////        }
////        catch (Exception e){
////            System.out.println(e);
////            throw new ContentNotFoundException("User with id not present");
////        }
//        return ResponseEntity.ok("Hello");
//    }

}
