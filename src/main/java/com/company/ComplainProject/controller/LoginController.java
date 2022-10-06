package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.util.AuthenticationResponse;
import com.company.ComplainProject.dto.LoginCredentials;
import com.company.ComplainProject.config.util.JwtUtil;
import com.company.ComplainProject.service.MyUserDetailService;
import com.company.ComplainProject.service.SessionService;
import com.company.ComplainProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MyUserDetailService myUserDetailService;
    @Autowired
    private UserService userService;



    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginCredentials loginCredentials) throws Exception{
        try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginCredentials.getEmail(),loginCredentials.getPassword())
        );}
        catch(BadCredentialsException e){
            throw new Exception("incorrect username or password ",e);
        }

        UserDetails userDetails = myUserDetailService.loadUserByUsername(loginCredentials.getEmail());
        String jwtToken = jwtUtil.generateToken(userDetails);
//                                                      Update device token
        userService.updateLoginUserDeviceToken(loginCredentials.getEmail(),loginCredentials.getDeviceToken());

        return ResponseEntity.ok(new AuthenticationResponse(jwtToken));

        }
}
