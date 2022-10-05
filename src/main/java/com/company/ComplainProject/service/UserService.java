package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ForgetPasswordDto;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.dto.ProjectEnums.UserType;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.dto.UserDetailsResponse;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.repository.RolesRepository;
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
    @Autowired
    RolesRepository rolesRepository;

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public List<UserDetailsResponse> getAllUserWithPagination(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<User> userPage = userRepository.findPublishedUser(pageable,UserStatus.PUBLISHED);
        List<User> userList = userPage.getContent();
        List<UserDetailsResponse>  userDetailsResponses=userList.stream().map(user -> userToUserDetailsResponse(user)).collect(Collectors.toList());
        System.out.println(userDetailsResponses);
        return userDetailsResponses;

    }

    public UserDetailsResponse getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()){
            throw new ContentNotFoundException("No User Exist Having id "+id);
        }
        return userToUserDetailsResponse(user.get());
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public UserDetailsResponse addUser(UserDto userDto) {
        System.out.println(userDto);
        if(userDto.getUserType().equals(UserType.Worker) || userDto.getUserType().equals(UserType.Admin)){
            userDto.setStatus(UserStatus.PUBLISHED);
        }
        userDto.setRoles(assignRolesToUser(userDto));
        return userToUserDetailsResponse(userRepository.save(dto(userDto)));
    }

    public Set<Roles> assignRolesToUser(UserDto userDto){
        Set<Roles> rolesSet = new HashSet<>();

        if(userDto.getUserType().equals(UserType.Customer)){
            rolesSet.add(rolesRepository.getRoleByName("ROLE_CUSTOMER"));
        }
        else if(userDto.getUserType().equals(UserType.Worker)){
            rolesSet.add(rolesRepository.getRoleByName("ROLE_CUSTOMER"));
            rolesSet.add(rolesRepository.getRoleByName("ROLE_WORKER"));
        }
        else{
            rolesSet.add(rolesRepository.getRoleByName("ROLE_ADMIN"));
        }
        return rolesSet;
    }

    public Optional<UserDetailsResponse> updateUserById(Long id, UserDto userDto) {
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
        return Optional.of(userToUserDetailsResponse(userRepository.save(updateUser)));
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
                .deviceToken(userDto.getDeviceToken())
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
                .deviceToken(user.getDeviceToken())
                .build();
    }

    public List<UserDetailsResponse> getFilteredUser(SearchCriteria searchCriteria) {
        UserSpecification userSpecification = new UserSpecification(searchCriteria);
        List<User> users = userRepository.findAll(userSpecification);
        return users.stream().map(el->userToUserDetailsResponse(el)).collect(Collectors.toList());
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
                .deviceToken(user.getDeviceToken())
                .build();
    }

    public List<UserDetailsResponse> getUserByStatus(String status) {

        List<UserDetailsResponse> userbyStatus;
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


    public List<UserDetailsResponse> userListToUserDtoList(List<User> users){
        List<UserDetailsResponse> userDetailsResponses = users.stream().map(user -> userToUserDetailsResponse(user)).collect(Collectors.toList());
        return userDetailsResponses;
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

    public UserDetailsResponse updateUserPassword(ForgetPasswordDto forgetPasswordDto) {

        User updateUser = getAllUser().stream().filter(el->el.getId().equals(forgetPasswordDto.getUserId())).findAny().get();
        if(updateUser!=null) {
        updateUser.setPassword(forgetPasswordDto.getPassword());
        }

        return userToUserDetailsResponse(userRepository.save(updateUser));
        }
    }


