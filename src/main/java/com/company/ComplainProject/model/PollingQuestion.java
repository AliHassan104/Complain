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
@Table(name = "polling_question")
public class PollingQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    private String question;

//    @OneToMany
//    @JoinColumn(name = "question_id")
//    private List<PollingOption> pollingOptions;
//
//    @OneToOne(mappedBy = "pollingQuestion")
//    private PollingAnswer pollingAnswer;






}
