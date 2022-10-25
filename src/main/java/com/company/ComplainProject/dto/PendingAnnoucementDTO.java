package com.company.ComplainProject.dto;

import com.company.ComplainProject.dto.ProjectEnums.AnnouncementType;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class PendingAnnoucementDTO {

    private Long id;
    private String title;
    private String description;
    private Long areaId;
}
