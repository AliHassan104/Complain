package com.company.ComplainProject.controller;

import com.company.ComplainProject.config.exception.CannotDeleteImage;
import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.config.image.ComplainImageImplementation;
import com.company.ComplainProject.config.image.FileService;
import com.company.ComplainProject.dto.*;
import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.exportDataToExcel.ComplainExcelExporter;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.service.ComplainService;
import com.company.ComplainProject.service.SessionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ComplainController {

    @Autowired
    private ComplainService complainService;
    @Autowired
    private ComplainImageImplementation complainImageImplementation;
    @Autowired
    private SessionService service;

    @Value("${complain.image}")
    private String complainImagePath;
    @Value("${image.path.url}")
    private String imagePathUrl;


    @GetMapping("/complain")
    public ResponseEntity<Page<ComplainDetailsResponse>> getComplain(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                                     @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){
        Page<ComplainDetailsResponse> complain = complainService.getAllComplainsWithPagination(pageNumber,pageSize);
        if(!complain.getContent().isEmpty()){
            return ResponseEntity.ok(complain);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/complain/{id}")
    public ResponseEntity<ComplainDetailsResponse> getComplainById(@PathVariable Long id){
       ComplainDetailsResponse complain = complainService.getComplainById(id);
       return  ResponseEntity.ok(complain);

    }

    @PostMapping("/complain")
    public ResponseEntity<ComplainDetailsResponse> addComplain(@RequestParam("pictureUrl") MultipartFile image,
                                                   @RequestParam("data") String userdata) {
        try{
            ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();
            ComplainDto complainDto = mapper.readValue(userdata,ComplainDto.class);
            /**
             *  Upload Image
             */
            String  fileName = complainImageImplementation.uploadImage(image);
            complainDto.setPicture(imagePathUrl+"api/"+complainImagePath+fileName);

            return ResponseEntity.ok(complainService.addComplain(complainDto));

        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @DeleteMapping("/complain/{id}")
    public ResponseEntity<Void> deleteComplainById(@PathVariable Long id){
        try{
            Boolean complainImageDeleted = complainImageImplementation.deleteImage(id);

            if(complainImageDeleted){
                complainService.deleteComplainById(id);
                return ResponseEntity.ok().build();
            }else{
                throw new CannotDeleteImage("Cannot Delete complain image having id "+id);
            }

        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/complain/{id}")
    public ResponseEntity<ComplainDetailsResponse> updateComplainTypeById(@PathVariable Long id,@RequestParam("pictureUrl") MultipartFile image,
                                                              @RequestParam("data") String complaindata){
        try{
            if(image.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
            ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();
            ComplainDto complainDto = objectMapper.readValue(complaindata,ComplainDto.class);
            Boolean complainImageDeleted = complainImageImplementation.deleteImage(id);

            if(complainImageDeleted){
                String complainFleName =  complainImageImplementation.uploadImage(image);
                complainDto.setPicture(imagePathUrl+"api/"+complainImagePath+complainFleName);
                return ResponseEntity.ok(complainService.updateComplainById(id,complainDto));
            }
            else{
                throw new CannotDeleteImage("Cannot Delete complain image having id "+id);
            }

        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/complain/search")
    public ResponseEntity<List<ComplainDetailsResponse>>  filteredComplain(@RequestBody SearchCriteria searchCriteria){
        List<ComplainDetailsResponse> complain = complainService.getFilteredComplain(searchCriteria);
        if(!complain.isEmpty()){
            return ResponseEntity.ok(complain);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/complain/searchByStatus")
    public ResponseEntity<List<ComplainDetailsResponse>> filteredComplainByStatus(@RequestBody SearchCriteria searchCriteria)  {

        try{
            List<ComplainDetailsResponse> complain = complainService.getFilteredComplainByStatus(searchCriteria);
            return ResponseEntity.ok(complain);
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("Complain Having Status = "+searchCriteria.getValue()+" Not Exist");
        }

    }


    /**
     * Create Excel File
     * @param response
     * @throws IOException
     */
    @GetMapping("/complain/export")
    public void exportComplainsToExcel(HttpServletResponse response) throws IOException {
        response.getHeader("application/octet-stream");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename = ComplainData.xlsx";

        List<ComplainDto> complains =complainService.getAllComplain();
        ComplainExcelExporter complainExcelExporter = new ComplainExcelExporter(complains);
        complainExcelExporter.export(response);

    }

    @GetMapping("complain/complainbyuser")
    public ResponseEntity<List<ComplainDetailsResponse>> getComplainByUser(){
        try{
            return ResponseEntity.ok(complainService.getComplainByUser());
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No complain Found with user "+service.getLoggedInUser().getEmail());
        }
    }

//    The api for this method will be http://localhost:8081/api/complain/usercomplainbystatus?status=in_review

    @GetMapping("/complain/usercomplainbystatus")
    public ResponseEntity<List<ComplainDetailsResponse>> getComplainByUserAndStatus(@RequestParam(name = "status") String status){
        try{
            return ResponseEntity.ok(complainService.getComplainByUserAndStatus(status));
        }catch (Exception e){
            System.out.println(e);
            throw new ContentNotFoundException("No Complain Found having status "+status);
        }
    }
    @GetMapping("/countallcomplains")
    public ResponseEntity<Long> countAllComplains(){
        try{
            return ResponseEntity.ok(complainService.countAllComplains_Service());
        }catch (Exception e){
            throw new ContentNotFoundException("No Complain Found");
        }
    }


}
