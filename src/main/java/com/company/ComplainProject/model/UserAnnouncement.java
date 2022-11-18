package com.company.ComplainProject.model;


import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor

@Entity
public class UserAnnouncement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "announcement_id")
    private Announcement announcement;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
