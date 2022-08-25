package com.company.ComplainProject.model;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

@Entity
@Table(name = "polling_answer")
public class PollingAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "question_id")
    private PollingQuestion pollingQuestion;

    @OneToOne
    @JoinColumn(name = "option_id")
    private PollingOption pollingOption;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
