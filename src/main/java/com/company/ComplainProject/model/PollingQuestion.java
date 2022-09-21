package com.company.ComplainProject.model;

import lombok.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
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
    private String question;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

    @OneToMany
    @JoinColumn(name = "pollingQuestion_id")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<PollingOption> pollingOptions;

}
