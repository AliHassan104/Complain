package com.company.ComplainProject.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder

@Entity
@Table(name = "polling_question")
public class PollingQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    @Lob
    @Column
    private String question;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;
    @JsonFormat(pattern = "YYYY-MM-dd")
    private LocalDate end_date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime end_time;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pollingQuestion_id")
    private List<PollingOption> pollingOptions;

}
