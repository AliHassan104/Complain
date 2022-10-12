package com.company.ComplainProject.config.filter;//package com.company.ComplainProject.config.filter;
import com.company.ComplainProject.config.exception.JwtTokenIsExpiredException;
import com.company.ComplainProject.config.exception.UnAuthorizedException;
import com.company.ComplainProject.config.util.JwtUtil;
import com.company.ComplainProject.dto.ExceptionResponseDto;
import com.company.ComplainProject.service.MyUserDetailService;
import com.company.ComplainProject.service.SessionService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtil jwtUtil;
        @Autowired
        MyUserDetailService customUserDetailService;


@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

    try {
        final String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);


            username = jwtUtil.extractUsername(jwt);


            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = customUserDetailService.loadUserByUsername(username);

                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        }

        filterChain.doFilter(request, response);
        } catch (Exception e) {
            ExceptionResponseDto exception= new ExceptionResponseDto(HttpStatus.UNAUTHORIZED, LocalDateTime.now().toString(),"Jwt Token is Expired");
            response.setStatus(401);
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.getWriter().write(new Gson().toJson(exception));
            return;
        }
}


    }

