package com.company.ComplainProject.config.security;
//import com.company.ComplainProject.config.filter.JwtRequestFilter;
//import com.company.ComplainProject.config.filter.JwtRequestFilter;
//import com.company.ComplainProject.service.MyUserDetailService;
//import com.company.ComplainProject.config.filter.JwtRequestFilter;
import com.company.ComplainProject.config.filter.JwtRequestFilter;
import com.company.ComplainProject.service.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.Filter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
    prePostEnabled = true
)
public class SecurityConfigure extends WebSecurityConfigurerAdapter {
    @Autowired
    private MyUserDetailService myUserDetailsService;
    @Autowired
    JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/api/user").permitAll()
                .antMatchers("/api/achievement/images/**").permitAll()
                .antMatchers("/api/complain/images/**").permitAll()
                .antMatchers("/api/event/images/**").permitAll()
                .antMatchers("/api/upload/image").permitAll()
                .antMatchers("/api/view/image/**").permitAll()
                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/send/otp/**").permitAll()
                .antMatchers("/api/area").permitAll()
                .antMatchers("/api/blockByArea/**").permitAll()
                .antMatchers("/api/block").permitAll()

//                .antMatchers("/swagger-ui.html").permitAll()
//                .antMatchers("/v2/api-docs").permitAll()
//                .antMatchers("/configuration/ui").permitAll()
//                .antMatchers("/swagger-resources/**").permitAll()
//                .antMatchers("/configuration/security").permitAll()
//                .antMatchers("/webjars/**").permitAll()

                .antMatchers(HttpMethod.OPTIONS,"/**")
                .permitAll().anyRequest().authenticated()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter,UsernamePasswordAuthenticationFilter.class);
    }


    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}