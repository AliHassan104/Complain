package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.UnAuthorizedException;
import com.company.ComplainProject.config.exception.UserNotFoundException;
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
import java.util.Optional;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {

           User user = userRepository.findByEmailAndStatus(username, UserStatus.PUBLISHED);
            if(user == null){
                throw new UserNotFoundException("Wrong Email Address "+username);
            }
            return new CustomUserDetail(user);
    }

}
