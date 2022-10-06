package com.company.ComplainProject;

import com.company.ComplainProject.model.Roles;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.RolesRepository;
import com.company.ComplainProject.repository.UserRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
@EnableWebMvc
@EnableSwagger2
public class ComplainProjectApplication {

	@Autowired
	RolesRepository rolesRepository;
	@Autowired
	UserRepository userRepository;



	public static void main(String[] args) {
		SpringApplication.run(ComplainProjectApplication.class, args);
	}





}
