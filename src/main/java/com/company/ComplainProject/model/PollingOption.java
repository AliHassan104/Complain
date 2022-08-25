package com.company.ComplainProject.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

@Entity
@Table(name = "polling_option")
public class PollingOption {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private PollingQuestion pollingQuestion;

    private String option;

//    @OneToOne(mappedBy = "pollingOption")
//    private PollingAnswer pollingAnswer;

}
