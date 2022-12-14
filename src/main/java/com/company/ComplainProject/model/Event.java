package com.company.ComplainProject.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Lob
    @Column
    private String description;
    private String image;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

    @JsonFormat(pattern = "YYYY-MM-dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
}
