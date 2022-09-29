package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.CustomUserDetail;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.ArrayList;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        try{
            User user = userRepository.findByEmailAndStatus(username,UserStatus.PUBLISHED);
            if(user == null){
                throw new UsernameNotFoundException("No User Found Having Email "+username);
            }
            return new CustomUserDetail(user);
        }catch (Exception e){
            System.out.println(e);
            throw new UsernameNotFoundException("No User Found Having Email "+username);

        }
    }

}
