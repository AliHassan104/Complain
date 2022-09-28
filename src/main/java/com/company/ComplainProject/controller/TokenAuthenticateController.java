package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.config.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TokenAuthenticateController {


    @GetMapping("/checkToken")
    public Boolean isTokenExpired(@RequestParam("token") String token){
        JwtUtil jwtUtil  = new JwtUtil();
        try{
            System.out.println(jwtUtil.isTokenExpired(token));
            return  jwtUtil.isTokenExpired(token);
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No token");
        }
    }

}
