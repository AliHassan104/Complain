package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
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
import java.util.stream.Collectors;

@Service
public class AddressService {
    @Autowired
    AddressRepository addressRepository;

    public List<Address> getAllAddress(){
        return addressRepository.findAll();
    }

    public List<AddressDto> getAllAddressDto() {
        List<AddressDto> addressDtoList =  addressListToAddressDtoList(addressRepository.findAll());
        if(!addressDtoList.isEmpty()){
            return addressDtoList;
        }
        throw new ContentNotFoundException("No Address Exist");
    }

    public AddressDto getAddressById(Long id) {
        Optional<Address> address = addressRepository.findById(id);
        if(address.isPresent()){
            return toDto(address.get());
        }
        throw new ContentNotFoundException("No Address Exist having id "+id);
    }

    public void deleteAddressById(Long id) {
        try{
            addressRepository.deleteById(id);
        }catch (Exception e){
            throw new ContentNotFoundException("Cannot Delete No Address Exist Having id "+id);
        }

    }

    public AddressDto addAddress(AddressDto addressDto) {
        return toDto(addressRepository.save(dto(addressDto)));
    }

    public AddressDto updateAddressById(Long id, AddressDto addressDto) {
        try {
            Optional<Address> updateAddress = addressRepository.findById(id);
            if (updateAddress.isPresent()) {
                updateAddress.get().setCity(addressDto.getCity());
                updateAddress.get().setFloorNumber(addressDto.getFloorNumber());
                updateAddress.get().setHouseNumber(addressDto.getHouseNumber());
            }
            else{
                throw new ContentNotFoundException("Cannot Update No Address Exist having id "+id);
            }
            return toDto(addressRepository.save(updateAddress.get()));
        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong while updating address");
        }
    }

    public Address dto(AddressDto addressDto){
        return Address.builder().id(addressDto.getId()).city(addressDto.getCity())
                .houseNumber(addressDto.getHouseNumber()).floorNumber(addressDto.getFloorNumber()).build();

    }

    public AddressDto toDto(Address address){
        return  AddressDto.builder().id(address.getId()).city(address.getCity())
                .houseNumber(address.getHouseNumber()).floorNumber(address.getFloorNumber()).build();

    }

    public List<AddressDto> addressListToAddressDtoList(List<Address> address){
        return address.stream().map(address1 -> toDto(address1)).collect(Collectors.toList());
    }
}
