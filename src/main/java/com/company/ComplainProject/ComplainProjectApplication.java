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

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import java.util.List;



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



//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurerAdapter() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**").allowedOrigins("*");
//			}
//		};
//	}


//	@Override
//	public void run(String... args) throws Exception {
//
//		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//
//		Set<Roles> roles = new HashSet<>();
//	   	roles.add(rolesRepository.getRoleByName("ROLE_ADMIN"));
//		User user = new User().builder()
//				.firstname("saif")
//				.lastname("khan")
//				.password(bCryptPasswordEncoder.encode("saifkhan@1"))
//				.roles(roles)
//				.build();
//		User user1 = userRepository.save(user);
//		System.out.println(user1);
//
//	}


}
