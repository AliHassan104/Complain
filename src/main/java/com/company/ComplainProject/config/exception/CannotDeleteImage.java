package com.company.ComplainProject.config.exception;

public class CannotDeleteImage extends  RuntimeException{
    public CannotDeleteImage(String message) {
        super(message);
    }
}
