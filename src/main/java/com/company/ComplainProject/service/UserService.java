package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.dto.ProjectEnums.UserType;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.dto.UserDetailsResponse;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.Address;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Roles;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.UserRepository;
import com.company.ComplainProject.repository.specification.UserSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
        if(userDto.getUserType().equals(UserType.Worker) || userDto.getUserType().equals(UserType.Admin)){
            userDto.setStatus(UserStatus.PUBLISHED);
        }
        userDto.setRoles(assignRolesToUser(userDto));
        return toDto(userRepository.save(dto(userDto)));
    }

    public Set<Roles> assignRolesToUser(UserDto userDto){
        Set<Roles> rolesSet = new HashSet<>();

        if(userDto.getUserType().equals(UserType.Customer)){
            rolesSet.add(new Roles(1l,"ROLE_CUSTOMER"));
            userDto.setRoles(rolesSet);
        }
        else if(userDto.getUserType().equals(UserType.Worker)){
            rolesSet.add(new Roles(1l,"ROLE_CUSTOMER"));
            rolesSet.add(new Roles(2l,"ROLE_WORKER"));
            userDto.setRoles(rolesSet);
        }
        else{
            rolesSet.add(new Roles(1l,"ROLE_CUSTOMER"));
            rolesSet.add(new Roles(3l,"ROLE_ADMIN"));
            userDto.setRoles(rolesSet);
        }
        return rolesSet;
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
            updateUser.setBlock(userDto.getBlock());
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
                .status(userDto.getStatus())
                .block(userDto.getBlock())
                .userType(userDto.getUserType())
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
                .status(user.getStatus())
                .block(user.getBlock())
                .userType(user.getUserType())
                .build();
    }

    public List<UserDto> getFilteredUser(SearchCriteria searchCriteria) {
        UserSpecification userSpecification = new UserSpecification(searchCriteria);
        List<User> users = userRepository.findAll(userSpecification);
        return users.stream().map(el->toDto(el)).collect(Collectors.toList());
    }

    public UserDetailsResponse getUserByEmail(String email) {
        UserDetailsResponse userDetailsResponse = userToUserDetailsResponse(userRepository.findUserByEmail(email));
        return userDetailsResponse;
    }


    public UserDetailsResponse userToUserDetailsResponse(User user){
        return UserDetailsResponse.builder().id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .cnic(user.getCnic())
                .numberOfFamilyMembers(user.getNumberOfFamilyMembers())
                .area(user.getArea())
                .address(user.getAddress())
                .property(user.getProperty())
                .roles(user.getRoles())
                .status(user.getStatus())
                .block(user.getBlock())
                .userType(user.getUserType())
                .build();
    }

    public List<UserDto> getUserByStatus(String status) {

        List<UserDto> userbyStatus;
        if(status.equalsIgnoreCase("IN_REVIEW")){
            userbyStatus = userListToUserDtoList(userRepository.findUserByStatus(UserStatus.IN_REVIEW));
        }
        else if(status.equalsIgnoreCase("PUBLISHED")){
            userbyStatus = userListToUserDtoList(userRepository.findUserByStatus(UserStatus.PUBLISHED));
        }
        else if(status.equalsIgnoreCase("REJECTED")){
            userbyStatus = userListToUserDtoList(userRepository.findUserByStatus(UserStatus.REJECTED));
        }
        else{
            throw new ContentNotFoundException("No User Exist Having Status "+status);
        }
        return userbyStatus;
    }


    public List<UserDto> userListToUserDtoList(List<User> users){
        List<UserDto> userDtoList = users.stream().map(user -> toDto(user)).collect(Collectors.toList());
        return userDtoList;
    }

    public Long countUserByStatus(String status){
        Long countByStatus;
        if(status.equalsIgnoreCase("IN_REVIEW")){
            countByStatus = userRepository.countUserByStatus(UserStatus.IN_REVIEW);
        }
        else if(status.equalsIgnoreCase("PUBLISHED")){
            countByStatus = userRepository.countUserByStatus(UserStatus.PUBLISHED);
        }
        else{
            countByStatus = userRepository.countUserByStatus(UserStatus.REJECTED);
        }
        return countByStatus;
    }

}

