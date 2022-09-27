package com.company.ComplainProject.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Note {
    private String subject;
    private String content;
    private Map<String, String> data;
    private String image;
}
