package com.company.ComplainProject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@ToString

public class ExceptionResponseDto {
    private String fieldName;
    private HttpStatus status;
    private String timestamp;
    private String message;


    public ExceptionResponseDto(String fieldName, HttpStatus status, String timestamp, String message) {
        this.fieldName = fieldName;
        this.status = status;
        this.timestamp = timestamp;
        this.message = message;
    }

    public ExceptionResponseDto(HttpStatus status, String timestamp, String message) {
        this.status = status;
        this.timestamp = timestamp;
        this.message = message;
    }
}
