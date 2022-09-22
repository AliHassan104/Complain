package com.company.ComplainProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@ToString
@Builder

@Entity
public class Block {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String block_name;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

    public Block(String block_name) {
        this.block_name = block_name;
    }

    public Block(Long id, String block_name) {
        this.id = id;
        this.block_name = block_name;
    }

    public Block(Long id, String block_name, Area area) {
        this.id = id;
        this.block_name = block_name;
        this.area = area;
    }
}
