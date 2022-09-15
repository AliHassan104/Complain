package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.Address;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.UserRepository;
import com.company.ComplainProject.repository.specification.UserSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<User> getAllUserWithPagination(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<User> userPage = userRepository.findAll(pageable);
        List<User> users = userPage.getContent();

        return users;
    }

    public Optional<User> getUserTypeById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public UserDto addUser(UserDto userDto) {
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
            updateUser.setProperty(userDto.getProperty());
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
                .property(userDto.getProperty())
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
                .property(user.getProperty())
                .roles(user.getRoles())
                .build();
    }

    public List<UserDto> getFilteredUser(SearchCriteria searchCriteria) {
        UserSpecification userSpecification = new UserSpecification(searchCriteria);
        List<User> users = userRepository.findAll(userSpecification);
        return users.stream().map(el->toDto(el)).collect(Collectors.toList());
    }

}

