package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.AddressDto;
import com.company.ComplainProject.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    @GetMapping("/address")
    public ResponseEntity<List<AddressDto>> getAddress(){

        List<AddressDto> address = addressService.getAllAddressDto();
        return ResponseEntity.ok(address);

    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    @GetMapping("/address/{id}")
    public ResponseEntity<AddressDto> getAddressById(@PathVariable Long id){
        AddressDto address = addressService.getAddressById(id);
        return  ResponseEntity.ok(address);
    }


//    @PostMapping("/address")
//    public ResponseEntity<AddressDto> addAddress(@RequestBody AddressDto addressDto){
//        try{
//            return ResponseEntity.ok(addressService.addAddress(addressDto));
//        }catch (Exception e){
//            System.out.println(e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    @DeleteMapping("/address/{id}")
    public ResponseEntity<Void> deleteAddressById(@PathVariable Long id){
            addressService.deleteAddressById(id);
            return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER') or hasRole('ROLE_WORKER')")
    @PutMapping("/address/{id}")
    public ResponseEntity<AddressDto> updateAddressById(@PathVariable Long id, @RequestBody AddressDto addressDto){
            return ResponseEntity.ok(addressService.updateAddressById(id,addressDto));
    }
}
