package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.exportDataToExcel.UserExcelExporter;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/user")
    public ResponseEntity<List<User>> getUser(){
        List<User> user = userService.getAllUser();
        if(!user.isEmpty()){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id){
        Optional<User> user = userService.getUserTypeById(id);
        if(user.isPresent()){
            return  ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/user")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto){
        System.out.println(userDto);
        try{
            return ResponseEntity.ok(userService.addComplain(userDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id){
        try{
            userService.deleteUserById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<Optional<UserDto>> updateComplainTypeById(@PathVariable Long id,@RequestBody UserDto userDto){
        try{
            return ResponseEntity.ok(userService.updateUserById(id,userDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/search")
    public ResponseEntity<List<UserDto>>  filteredAssetBooking(@RequestBody SearchCriteria searchCriteria){
        List<UserDto> user = userService.getFilteredUser(searchCriteria);
        if(!user.isEmpty()){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/user/export")
    public void exportUserDataToExcel(HttpServletResponse response) throws IOException {

        response.setContentType("application/octet-stream");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment;filename = UserData.xlsx";
        response.setHeader(headerKey,headerValue);

        List<User> userList = userService.getAllUser();
        UserExcelExporter userExcelExporter = new UserExcelExporter(userList);
        userExcelExporter.exportData(response);
    }



}
