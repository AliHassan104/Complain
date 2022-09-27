package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.EmailRequest;
import com.company.ComplainProject.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest){
        try{
            this.emailService.sendEmail(emailRequest.getSubject(),emailRequest.getMessage(),emailRequest.getTo());
            return ResponseEntity.ok("Success");
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.ok("not Succes");
        }
  }

}
