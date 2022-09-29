package com.company.ComplainProject.model;

import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name = "complain")
public class Complain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private LocalDate date;
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime time;

    @Enumerated(EnumType.STRING)
    private Status status = Status.IN_REVIEW;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "complain_type_id", referencedColumnName = "id")
    private ComplainType complainType;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "complain_id")
    private List<ComplainLog> complainLog;

    @Override
    public String toString() {
        return "Complain{" +
                "id=" + id +
                ", area=" + area +
                ", block=" + block +
                ", description='" + description + '\'' +
                ", picture='" + picture + '\'' +
                ", date=" + date +
                ", time=" + time +
                ", status=" + status +
                ", user=" + user +
                ", complainType=" + complainType +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Block getBlock() {
        return block;
    }

    public void setBlock(Block block) {
        this.block = block;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ComplainType getComplainType() {
        return complainType;
    }

    public void setComplainType(ComplainType complainType) {
        this.complainType = complainType;
    }
}
