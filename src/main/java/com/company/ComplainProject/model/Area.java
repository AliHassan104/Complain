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
@Table(name = "area")
public class Area {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    private String name;
    private String block;
    private String postalCode;

//    @OneToMany
//    @JoinColumn(name = "area_id")
//    private List<Complain> complains;
//
//    @OneToOne(mappedBy = "area")
//    private User user;
//
//    @OneToMany
//    @JoinColumn(name = "area_id")
//    private List<WaterTiming> waterTimings;
//
//    @OneToMany
//    @JoinColumn(name = "area_id")
//    private List<Document> documents;



}
