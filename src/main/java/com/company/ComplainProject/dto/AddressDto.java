package com.company.ComplainProject.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class AddressDto {
    private Long id;
    private String houseNumber;
    // private String street;
    private String floorNumber;
    private String city;
}
