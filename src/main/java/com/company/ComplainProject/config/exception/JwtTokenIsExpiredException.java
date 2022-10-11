package com.company.ComplainProject.config.exception;

public class JwtTokenIsExpiredException extends  RuntimeException{
    public JwtTokenIsExpiredException(String message) {
        super(message);
    }
}
