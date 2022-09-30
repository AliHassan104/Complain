package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.model.Complain;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString

public class ComplainLogDto {

    private Long id;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDate date;
    private String assignedFrom;
    private String assignedTo;
    @Lob
    private String description;
    private Complain complain;


}
