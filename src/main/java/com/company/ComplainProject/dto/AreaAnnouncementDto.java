package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Announcement;
import com.company.ComplainProject.model.Area;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AreaAnnouncementDto {
    private Long id;
    private Announcement announcement;
    private Area area;
}
