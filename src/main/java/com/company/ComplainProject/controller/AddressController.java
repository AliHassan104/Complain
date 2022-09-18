package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.AddressDto;
import com.company.ComplainProject.dto.AreaDto;
import com.company.ComplainProject.model.Address;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.service.AddressService;
import com.company.ComplainProject.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class AddressController {

    @Autowired
    AddressService addressService;

    @GetMapping("/address")
    public ResponseEntity<List<Address>> getAddress(){
        List<Address> address = addressService.getAllAddress();
        if(!address.isEmpty()){
            return ResponseEntity.ok(address);
        }
        throw new ContentNotFoundException("No Address Exist");
    }

    @GetMapping("/address/{id}")
    public ResponseEntity<Optional<Address>> getAddressById(@PathVariable Long id){
        Optional<Address> address = addressService.getAddressById(id);
        if(address.isPresent()){
            return  ResponseEntity.ok(address);
        }
        throw new ContentNotFoundException("No Address Exist having id "+id);
    }

    @PostMapping("/address")
    public ResponseEntity<AddressDto> addAddress(@RequestBody AddressDto addressDto){
        try{
            return ResponseEntity.ok(addressService.addAddress(addressDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/address/{id}")
    public ResponseEntity<Void> deleteAddressById(@PathVariable Long id){
        try{
            addressService.deleteAddressById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("Cannot delete No Address Exist having id "+id);
        }
    }

    @PutMapping("/address/{id}")
    public ResponseEntity<Optional<AddressDto>> updateAddressById(@PathVariable Long id, @RequestBody AddressDto addressDto){
        try{
            return ResponseEntity.ok(addressService.updateAddressById(id,addressDto));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("Cannot update No Address Exist having id "+id);
        }
    }
}
