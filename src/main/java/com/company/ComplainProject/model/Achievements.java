package com.company.ComplainProject.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

@Entity
@Table(name = "achievements")
public class Achievements {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    private String title;
    private String description;
    private String pictureUrl;
    @JsonFormat(pattern="yyyy-MM-dd")
    private String date;
//    @JsonFormat(pattern="HH:mm:ss")
//    private String time;

}
