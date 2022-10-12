package com.company.ComplainProject;



import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
@EnableWebMvc
@EnableSwagger2
public class ComplainProjectApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ComplainProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String dir = System.getProperty("user.dir");
		System.out.println(dir);
	}
}
