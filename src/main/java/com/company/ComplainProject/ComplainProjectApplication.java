package com.company.ComplainProject;

import com.company.ComplainProject.model.Roles;
import com.company.ComplainProject.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


import java.util.List;


@SpringBootApplication
@EnableWebMvc
@EnableSwagger2
public class ComplainProjectApplication implements CommandLineRunner {

	@Autowired
	RolesRepository rolesRepository;

	public static void main(String[] args) {
		SpringApplication.run(ComplainProjectApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*");
			}
		};
	}

	@Override
	public void run(String... args) throws Exception {
		List<Roles> roles = rolesRepository.findAll();
		if(roles.isEmpty()) {
			Roles customer = new Roles(1l, "ROLE_CUSTOMER");
			Roles worker = new Roles(2l, "ROLE_WORKER");
			Roles admin = new Roles(3l, "ROLE_ADMIN");

			rolesRepository.save(customer);
			rolesRepository.save(worker);
			rolesRepository.save(admin);
		}
	}


}
