package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.Announcement;
import com.company.ComplainProject.model.User;
import lombok.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserAnnouncementDto {
    private Long id;
    private Announcement announcement;
    private User user;
}
