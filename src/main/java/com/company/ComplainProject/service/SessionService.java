package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.UserNotFoundException;
import com.company.ComplainProject.dto.CustomUserDetail;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
public class SessionService {

    @Autowired
    UserRepository userRepository;
    public static HashMap<String,String> token = new HashMap<>();

    public User getLoggedInUser(){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof CustomUserDetail) {
            Long id = ((CustomUserDetail) principal).getUserId();
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                return user.get();
            }

        }
        throw new UserNotFoundException("User Not Found");
    }

    public  void saveToken(String username,String token){
        SessionService.token.put(username, token);
    }

    /**
     * it will remove the token in the map
     */
    public void removeToken() {
        User user = getLoggedInUser();
        SessionService.token.remove(user.getEmail());
    }


}
