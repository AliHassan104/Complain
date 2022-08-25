package com.company.ComplainProject.config.image;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

//@Entity
public class FileResponse {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    String name;
    String fileName;
    String message;
}
