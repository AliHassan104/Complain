package com.company.ComplainProject;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;


@SpringBootApplication
@EnableWebMvc
@EnableSwagger2
@EnableScheduling
public class ComplainProjectApplication implements CommandLineRunner {


	private  static Logger logger = LoggerFactory.getLogger(ComplainProjectApplication.class);

	public static void main(String[] args) {
		logger.info("Application is starting");
		SpringApplication.run(ComplainProjectApplication.class, args);
		logger.info("Application is started ");
	}

	@Override
	public void run(String... args) throws Exception {
		String dir = System.getProperty("user.dir");
		System.out.println(dir);
	}

}
