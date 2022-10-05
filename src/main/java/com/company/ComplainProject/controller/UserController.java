package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.dto.UserDetailsResponse;
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

    @GetMapping("/user")
    public ResponseEntity<List<UserDetailsResponse>> getUser(@RequestParam(value = "pageNumber" ,defaultValue = "0",required = false) Integer pageNumber ,
                                              @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){
        List<UserDetailsResponse> user = userService.getAllUserWithPagination(pageNumber,pageSize);
        if(!user.isEmpty()){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDetailsResponse> getUserById(@PathVariable Long id){
        UserDetailsResponse user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/user")
    public ResponseEntity<UserDetailsResponse> addUser(@RequestBody UserDto userDto){
        try{
            return ResponseEntity.ok(userService.addUser(userDto));
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
    public ResponseEntity<Optional<UserDetailsResponse>> updateComplainTypeById(@PathVariable Long id,@RequestBody UserDto userDto){
        try{
            return ResponseEntity.ok(userService.updateUserById(id,userDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/search")
    public ResponseEntity<List<UserDetailsResponse>>  filtereUser(@RequestBody SearchCriteria searchCriteria){
        List<UserDetailsResponse> user = userService.getFilteredUser(searchCriteria);
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

    @GetMapping("/userbyemail/{email}")
    public ResponseEntity<UserDetailsResponse> getUserByEmail(@PathVariable("email") String email){
        try{
            return  ResponseEntity.ok(userService.getUserByEmail(email));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No user Exist having email "+email);
        }
    }

    @GetMapping("/user/userbystatus/{status}")
    public ResponseEntity<List<UserDetailsResponse>> getUserByStatus(@PathVariable("status") String status){
        try{
            return ResponseEntity.ok(userService.getUserByStatus(status));
        }
        catch (Exception e){
            System.out.println(e);
            throw  new ContentNotFoundException("No User Found Having Status "+status);
        }
    }

    @GetMapping("/user/countuserbystatus/{status}")
    public ResponseEntity<Long> countUserByUserStatus(@PathVariable("status") String status){
        try{
            return ResponseEntity.ok(userService.countUserByStatus(status));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No user found having status "+status);
        }
    }

}
