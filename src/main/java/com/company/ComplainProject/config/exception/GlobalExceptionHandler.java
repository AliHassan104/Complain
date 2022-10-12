package com.company.ComplainProject.config.exception;

import com.company.ComplainProject.dto.ExceptionResponseDto;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.time.LocalDateTime;
import java.util.ArrayList;



@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ContentNotFoundException.class)
    public ResponseEntity<Object> contentNotFoundException(ContentNotFoundException ex){
        ExceptionResponseDto errors  = new ExceptionResponseDto(HttpStatus.NOT_FOUND,LocalDateTime.now().toString(),ex.getMessage());
        return new ResponseEntity<>(errors,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ImageStorageException.class)
    public ResponseEntity<Object> imageStorageException(ImageStorageException ex){
        ExceptionResponseDto errors  = new ExceptionResponseDto(HttpStatus.INTERNAL_SERVER_ERROR,LocalDateTime.now().toString(),ex.getMessage());
        return new ResponseEntity<>(errors,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> methodArgumentNotValidException(MethodArgumentNotValidException ex){

        ArrayList<ExceptionResponseDto> allErrors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error)->{

            String fieldName =((FieldError) error).getField();
            String errorMessage =error.getDefaultMessage();
            allErrors.add(new ExceptionResponseDto(fieldName,HttpStatus.BAD_REQUEST,LocalDateTime.now().toString(),errorMessage));

        });
        return new ResponseEntity<>(allErrors,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CannotDeleteImage.class)
    public ResponseEntity<Object> cannotDeleteImageException(CannotDeleteImage ex){
        ExceptionResponseDto errors  = new ExceptionResponseDto(HttpStatus.INTERNAL_SERVER_ERROR,LocalDateTime.now().toString(),ex.getMessage());
        return  new ResponseEntity<>(errors,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ExceptionInFirebaseMessaging.class)
    public ResponseEntity<Object> exceptionInFirebaseMessaging(ExceptionInFirebaseMessaging ex){
        ExceptionResponseDto errors  = new ExceptionResponseDto(HttpStatus.INTERNAL_SERVER_ERROR,LocalDateTime.now().toString(),ex.getMessage());
        return new ResponseEntity<>(errors,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> userNotFoundException(UserNotFoundException ex){
        ExceptionResponseDto errors  = new ExceptionResponseDto(HttpStatus.NOT_FOUND,LocalDateTime.now().toString(),ex.getMessage());
        return new ResponseEntity<>(errors,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity<Object> unAuthorizedException(UnAuthorizedException exception){
        ExceptionResponseDto errors  = new ExceptionResponseDto(HttpStatus.UNAUTHORIZED,LocalDateTime.now().toString(),exception.getMessage());
        return new ResponseEntity<>(errors,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InputMisMatchException.class)
    public ResponseEntity<Object> inputMisMatchException(InputMisMatchException ex){
        ExceptionResponseDto errors  = new ExceptionResponseDto(HttpStatus.BAD_REQUEST,LocalDateTime.now().toString(),ex.getMessage());
        return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
    }

}
