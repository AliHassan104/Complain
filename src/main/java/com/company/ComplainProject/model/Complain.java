package com.company.ComplainProject.model;

import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(name = "complain")
public class Complain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

    @ManyToOne
    @JoinColumn(name = "block_id")
    private Block block;

    @Lob
    @Column
    private String description;
    private String picture;

    @JsonFormat(pattern="yyyy-MM-dd")
    private String date;
    @JsonFormat(pattern="HH:mm:ss")
    private String time;

    @Enumerated(EnumType.STRING)
    private Status status = Status.IN_REVIEW;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "complain_type_id", referencedColumnName = "id")
    private ComplainType complainType;

}
