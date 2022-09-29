package com.company.ComplainProject.model;

import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class ComplainLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Status status;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;
    private String assignedFrom;
    private String assignedTo;
    @Lob
    private String description;

}
