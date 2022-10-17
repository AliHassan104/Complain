package com.company.ComplainProject.config.scheduler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class ScheduleConfig {

    @Bean
    public ComplainScheduler scheduler(){
        return new ComplainScheduler();
    }

}
