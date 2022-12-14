package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.config.exception.UserNotFoundException;
import com.company.ComplainProject.dto.SearchCriteria;
import com.company.ComplainProject.dto.UserDetailsResponse;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.exportDataToExcel.UserExcelExporter;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
    public ResponseEntity<Page<User>> getUser(@RequestParam(value = "pageNumber" ,defaultValue = "0",required = false) Integer pageNumber ,
                                                             @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){
        Page<User> user = userService.getAllUserWithPagination(pageNumber,pageSize);
        return ResponseEntity.ok(user);

    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    public ResponseEntity<UserDetailsResponse> getUserById(@PathVariable Long id){
        UserDetailsResponse user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Register User
     * @param userDto
     * @return
     */
    @PostMapping("/user")
    public ResponseEntity<UserDetailsResponse> addUser(@Valid @RequestBody UserDto userDto){
        try{
            return ResponseEntity.ok(userService.addUser(userDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
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
            return ResponseEntity.ok(userService.updateUserById(id,userDto));
    }

    @GetMapping("/user/search")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    public ResponseEntity<List<UserDetailsResponse>>  filteredUser(@RequestBody SearchCriteria searchCriteria){
        List<UserDetailsResponse> user = userService.getFilteredUser(searchCriteria);
        return ResponseEntity.ok(user);

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

    @GetMapping("/get-logged-in-user")
    public ResponseEntity<UserDetailsResponse> getLoggedInUser(){
        try{
            return ResponseEntity.ok(userService.getLoggedInUser());
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No user Exist");
        }
    }

    @GetMapping("/user/userbystatus/{status}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
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

    /**
     * Get All User whose type = worker
     * @return
     */
    @GetMapping("/user/getallworker")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDetailsResponse>> getAllWorkers(){
        try{
            return ResponseEntity.ok(userService.getAllWorkers());
        }catch (Exception e){
            e.printStackTrace();
            throw new UserNotFoundException("No Worker Exist");
        }
    }

    /**
     *  Get Worker By Area
     */
    @GetMapping("/user/getallworkerbyarea/{area_id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDetailsResponse>> getAllWorkerByArea(@PathVariable("area_id") Long area_id){
        try{
            return ResponseEntity.ok(userService.getAllWorkerByArea(area_id));
        }catch (Exception e){
            e.printStackTrace();
            throw new UserNotFoundException("No Worker Exist Having area id "+area_id);
        }
    }

}
