package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.AddressDto;
import com.company.ComplainProject.dto.AreaDto;
import com.company.ComplainProject.model.Address;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.repository.AchievementRepository;
import com.company.ComplainProject.repository.AddressRepository;
import com.company.ComplainProject.repository.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    AddressRepository addressRepository;

    public List<Address> getAllAddress() {
        return addressRepository.findAll();
    }

    public Optional<Address> getAddressById(Long id) {
        return addressRepository.findById(id);
    }

    public void deleteAddressById(Long id) {
        addressRepository.deleteById(id);
    }

    public AddressDto addAddress(AddressDto addressDto) {
        return toDto(addressRepository.save(dto(addressDto)));
    }

    public Optional<AddressDto> updateAddressById(Long id, AddressDto addressDto) {
        Address updateAddress = getAllAddress().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateAddress != null){
            updateAddress.setCity(addressDto.getCity());
            updateAddress.setFloorNumber(addressDto.getFloorNumber());
            updateAddress.setHouseNumber(addressDto.getHouseNumber());
            updateAddress.setStreet(addressDto.getStreet());
        }
        return Optional.of(toDto(addressRepository.save(updateAddress)));
    }

    public Address dto(AddressDto addressDto){
        return Address.builder().id(addressDto.getId()).city(addressDto.getCity())
                .houseNumber(addressDto.getHouseNumber()).floorNumber(addressDto.getFloorNumber())
                .street(addressDto.getStreet()).build();
    }

    public AddressDto toDto(Address address){
        return  AddressDto.builder().id(address.getId()).city(address.getCity())
                .houseNumber(address.getHouseNumber()).floorNumber(address.getFloorNumber())
                .street(address.getStreet()).build();
    }
}
