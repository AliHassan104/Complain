package com.company.ComplainProject.config.authenticate;

import com.company.ComplainProject.config.util.JwtUtil;
import com.company.ComplainProject.service.MyUserDetailService;
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


    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginCredentials loginCredentials) throws Exception{
        try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginCredentials.getEmail(),loginCredentials.getPassword())
        );
        }
        catch(BadCredentialsException e){
            throw new Exception("incorrect username or password ",e);
        }

        UserDetails userDetails = myUserDetailService.loadUserByUsername(loginCredentials.getEmail());
        String jwtToken = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwtToken));

        }
}
