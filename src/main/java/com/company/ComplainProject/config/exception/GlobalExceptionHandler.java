package com.company.ComplainProject.config.exception;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
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

    @ExceptionHandler(CannotDeleteImage.class)
    public ResponseEntity<String> cannotDeleteImageException(CannotDeleteImage cannotDeleteImage){
        return  new ResponseEntity<>(cannotDeleteImage.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ExceptionInFirebaseMessaging.class)
    public ResponseEntity<String> exceptionInFirebaseMessaging(ExceptionInFirebaseMessaging exceptionInFirebaseMessaging){
        return new ResponseEntity<>(exceptionInFirebaseMessaging.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> userNotFoundException(UserNotFoundException userNotFoundException){
        return new ResponseEntity<>(userNotFoundException.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity<String> unAuthorizedException(UnAuthorizedException exception){
        return new ResponseEntity<>(exception.getMessage(),HttpStatus.FORBIDDEN);
    }

}
