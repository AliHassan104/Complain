package com.company.ComplainProject.config.exception;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.sun.javafx.iio.ImageStorageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ContentNotFoundException.class)
    public ResponseEntity<String> recordNotFoundException(ContentNotFoundException contentNotFoundException){
        return new ResponseEntity<>(contentNotFoundException.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ImageStorageException.class)
    public ResponseEntity<String> imageStorageException(ImageStorageException imageStorageException){
        return new ResponseEntity<>(imageStorageException.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> methodArgumentNotValidException(MethodArgumentNotValidException error){
        return new ResponseEntity<>(error.getMessage(),HttpStatus.BAD_REQUEST);
    }

}
