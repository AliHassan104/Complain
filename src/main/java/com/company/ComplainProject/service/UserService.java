package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.config.exception.InputMisMatchException;
import com.company.ComplainProject.config.exception.UserNotFoundException;
import com.company.ComplainProject.dto.ForgetPasswordDto;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.dto.ProjectEnums.UserType;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.dto.UserDetailsResponse;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.repository.AreaRepository;
import com.company.ComplainProject.repository.RolesRepository;
import com.company.ComplainProject.repository.UserRepository;
import com.company.ComplainProject.repository.specification.UserSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

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
    RolesRepository rolesRepository;
    @Autowired
    SessionService service;
    @Autowired
    AreaRepository areaRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public Page<User> getAllUserWithPagination(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<User> userPage = userRepository.findPublishedUser(pageable,UserStatus.PUBLISHED);
        return userPage;
    }

    public UserDetailsResponse getUserById(Long id) {
        try {
            Optional<User> user = userRepository.findById(id);
            return userToUserDetailsResponse(user.get());
        }catch (Exception e){
            throw new ContentNotFoundException("No user Exist Having id "+id);
        }
    }


    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public UserDetailsResponse addUser(UserDto userDto) {

        userDto.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
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
        try {
            User updateUser = getAllUser().stream().filter(el -> el.getId().equals(id)).findAny().get();
            Optional<Area> updatedArea = areaRepository.findById(userDto.getArea().getId());

            if (updateUser != null) {
                updateUser.setFirstname(userDto.getFirstname());
                updateUser.setLastname(userDto.getLastname());
                updateUser.setEmail(userDto.getEmail());
                updateUser.setCnic(userDto.getCnic());
                updateUser.setPhoneNumber(userDto.getPhoneNumber());
                updateUser.setNumberOfFamilyMembers(userDto.getNumberOfFamilyMembers());
                updateUser.setArea(updatedArea.get());
                updateUser.setAddress(userDto.getAddress());
                updateUser.setProperty(userDto.getProperty());
                updateUser.setBlock(userDto.getBlock());
            }
            return Optional.of(userToUserDetailsResponse(userRepository.save(updateUser)));
        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong while updating user "+e);
        }
    }


    public List<UserDetailsResponse> getFilteredUser(SearchCriteria searchCriteria) {
        UserSpecification userSpecification = new UserSpecification(searchCriteria);
        List<User> users = userRepository.findAll(userSpecification);
        return users.stream().map(el->userToUserDetailsResponse(el)).collect(Collectors.toList());
    }

    public UserDetailsResponse getLoggedInUser() {
        User user = service.getLoggedInUser();
        UserDetailsResponse userDetailsResponse = userToUserDetailsResponse(user);
        return userDetailsResponse;
    }


    public List<UserDetailsResponse> getUserByStatus(String status) {

        List<UserDetailsResponse> userbyStatus;
        if(status.equalsIgnoreCase("IN_REVIEW")){
            userbyStatus = userListToUserDetailsResponseList(userRepository.findUserByStatus(UserStatus.IN_REVIEW));
        }
        else if(status.equalsIgnoreCase("PUBLISHED")){
            userbyStatus = userListToUserDetailsResponseList(userRepository.findUserByStatus(UserStatus.PUBLISHED));
        }
        else if(status.equalsIgnoreCase("REJECTED")){
            userbyStatus = userListToUserDetailsResponseList(userRepository.findUserByStatus(UserStatus.REJECTED));
        }
        else{
            throw new ContentNotFoundException("No User Exist Having Status "+status);
        }
        return userbyStatus;
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

    /**
     * Get All Workers
     * @return
     */
    public List<UserDetailsResponse> getAllWorkers() {
        List<User> userList = userRepository.getAllWorkers(UserType.Worker);
        return userListToUserDetailsResponseList(userList);
    }

    public UserDetailsResponse updateLoginUserDeviceToken(String email,String deviceToken){
        try {
            User user = userRepository.findUserByEmail(email);
            if(user != null){
                user.setDeviceToken(deviceToken);
            }
            return userToUserDetailsResponse(userRepository.save(user));
        }
        catch (Exception e){
            throw new UserNotFoundException("User having Email "+email+" not found");
        }

    }

    public List<UserDetailsResponse> userListToUserDetailsResponseList(List<User> users){
        List<UserDetailsResponse> userDetailsResponses = users.stream().map(user -> userToUserDetailsResponse(user)).collect(Collectors.toList());
        return userDetailsResponses;
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

    public List<UserDetailsResponse> getAllWorkerByArea(Long area_id) {
        Optional<Area> area = areaRepository.findById(area_id);
        if(area.isPresent()){
            return userListToUserDetailsResponseList(userRepository.getAllWorkerByArea(UserType.Worker,area.get()));
        }
        throw new ContentNotFoundException("Area Not Exist Having id "+area_id);
    }

    public User userDetailResponseToUser(UserDetailsResponse userDetailsResponse){
        return User.builder()
                .id(userDetailsResponse.getId())
                .firstname(userDetailsResponse.getFirstname())
                .lastname(userDetailsResponse.getLastname())
                .email(userDetailsResponse.getEmail())
                .phoneNumber(userDetailsResponse.getPhoneNumber())
                .cnic(userDetailsResponse.getCnic())
                .numberOfFamilyMembers(userDetailsResponse.getNumberOfFamilyMembers())
                .area(userDetailsResponse.getArea())
                .address(userDetailsResponse.getAddress())
                .property(userDetailsResponse.getProperty())
                .roles(userDetailsResponse.getRoles())
                .status(userDetailsResponse.getStatus())
                .block(userDetailsResponse.getBlock())
                .userType(userDetailsResponse.getUserType())
                .deviceToken(userDetailsResponse.getDeviceToken())
                .build();
    }

    public UserDetailsResponse updateUserPassword(ForgetPasswordDto forgetPasswordDto) {

        User updateUser = getAllUser().stream().filter(el->el.getId().equals(forgetPasswordDto.getUserId())).findAny().get();
        if(updateUser!=null) {
            updateUser.setPassword(forgetPasswordDto.getPassword());
        }

        return userToUserDetailsResponse(userRepository.save(updateUser));
    }

    public UserDetailsResponse getUserByEmail(String email) {
        UserDetailsResponse userDetailsResponse = userToUserDetailsResponse(userRepository.findUserByEmail(email));
        return userDetailsResponse;
    }

}






