package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.Address;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    AreaService areaService;
    @Autowired
    AddressService addressService;

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public Optional<User> getUserTypeById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public UserDto addComplain(UserDto userDto) {
//        userDto.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        return toDto(userRepository.save(dto(userDto)));
    }

    public Optional<UserDto> updateUserById(Long id, UserDto userDto) {
        User updateUser = getAllUser().stream().filter(el->el.getId().equals(id)).findAny().get();

        Area updatedArea =  areaService.getAllArea().stream().filter(area -> area.getId().equals(userDto.getArea().getId())).findAny().get();
        Address updatedAddress = addressService.getAllAddress().stream().filter(address -> address.getId().equals(userDto.getAddress().getId())).findAny().get();

        if(updateUser != null){
            updateUser.setFirstname(userDto.getFirstname());
            updateUser.setLastname(userDto.getLastname());
            updateUser.setEmail(userDto.getEmail());
            updateUser.setCnic(userDto.getCnic());
            updateUser.setPhoneNumber(userDto.getPhoneNumber());
            updateUser.setNumberOfFamilyMembers(userDto.getNumberOfFamilyMembers());
            updateUser.setArea(updatedArea);
            updateUser.setAddress(updatedAddress);
        }
        return Optional.of(toDto(userRepository.save(updateUser)));
    }

    public User dto(UserDto userDto){
        return User.builder()
                .id(userDto.getId())
                .firstname(userDto.getFirstname())
                .lastname(userDto.getLastname())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .phoneNumber(userDto.getPhoneNumber())
                .cnic(userDto.getCnic())
                .numberOfFamilyMembers(userDto.getNumberOfFamilyMembers())
                .area(userDto.getArea())
                .address(userDto.getAddress())
                .roles(userDto.getRoles())
                .build();
    }

    public UserDto toDto(User user){
        return  UserDto.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .password(user.getPassword())
                .phoneNumber(user.getPhoneNumber())
                .cnic(user.getCnic())
                .numberOfFamilyMembers(user.getNumberOfFamilyMembers())
                .area(user.getArea())
                .address(user.getAddress())
                .roles(user.getRoles())
                .build();
    }
}
