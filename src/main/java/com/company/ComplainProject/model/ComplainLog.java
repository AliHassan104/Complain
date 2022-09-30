package com.company.ComplainProject.model;

import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

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

    @ManyToOne
    @JoinColumn(name = "complain")
    private Complain complain;


    @Override
    public String toString() {
        return "ComplainLog{" +
                "id=" + id +
                ", status=" + status +
                ", date=" + date +
                ", assignedFrom='" + assignedFrom + '\'' +
                ", assignedTo='" + assignedTo + '\'' +
                ", description='" + description + '\'' +
                '}';
    }

}