package com.company.ComplainProject.model;

import lombok.*;
import javax.persistence.*;

@Data
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor

@Entity
public class AreaAnnouncement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "announcement_id")
    private Announcement announcement;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

}
