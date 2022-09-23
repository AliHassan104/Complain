package com.company.ComplainProject.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.joda.time.DateTime;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

@Entity
@Table(name = "water_timing")
public class WaterTiming {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String day;

    private LocalTime start_time;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime end_time;

    @JsonFormat(pattern = "YYYY-MM-dd")
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "block_id")
    private Block block;

}
