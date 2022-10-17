package com.company.ComplainProject.controller;


import com.company.ComplainProject.dto.*;
import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.exportDataToExcel.ComplainExcelExporter;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.service.ComplainService;
import com.company.ComplainProject.service.ImageService;
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


@RestController
@RequestMapping("/api")
public class ComplainController {

    @Autowired
    private ComplainService complainService;

    @Autowired
    private SessionService service;

    @Autowired
    private ImageService imageService;



    @GetMapping("/complain")
    public ResponseEntity<Page<Complain>> getComplain(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                                     @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize){
        Page<Complain> complain = complainService.getAllComplainsWithPagination(pageNumber,pageSize);
        return ResponseEntity.ok(complain);

    }

    @GetMapping("/complain/{id}")
    public ResponseEntity<ComplainDetailsResponse> getComplainById(@PathVariable Long id){
       ComplainDetailsResponse complain = complainService.getComplainById(id);
       return  ResponseEntity.ok(complain);

    }

    @PostMapping("/complain")
    public ResponseEntity<ComplainDetailsResponse> addComplain(@RequestParam("pictureUrl") MultipartFile image,
                                                   @RequestParam("data") String complainData) {
        try{
            ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();
            ComplainDto complainDto = mapper.readValue(complainData,ComplainDto.class);
            /**
             *  Upload Image
             */
            String  picture = imageService.uploadImageAndGetApiPath(image);
            complainDto.setPicture(picture);

            return ResponseEntity.ok(complainService.addComplain(complainDto));

        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @DeleteMapping("/complain/{id}")
    public ResponseEntity<Void> deleteComplainById(@PathVariable Long id){

                complainService.deleteComplainById(id);
                return ResponseEntity.ok().build();
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


                String picture =  imageService.uploadImageAndGetApiPath(image);
                complainDto.setPicture(picture);
                return ResponseEntity.ok(complainService.updateComplainById(id,complainDto));


        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/complain/search")
    public ResponseEntity<List<ComplainDetailsResponse>>  filteredComplain(@RequestBody SearchCriteria searchCriteria){
        List<ComplainDetailsResponse> complain = complainService.getFilteredComplain(searchCriteria);

        return ResponseEntity.ok(complain);
    }

    @PostMapping("/complain/searchByStatus")
    public ResponseEntity<List<ComplainDetailsResponse>> filteredComplainByStatus(@RequestBody SearchCriteria searchCriteria)  {

            List<ComplainDetailsResponse> complain = complainService.getFilteredComplainByStatus(searchCriteria);
            return ResponseEntity.ok(complain);
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

            return ResponseEntity.ok(complainService.getComplainByUser());
    }

//    The api for this method will be http://localhost:8081/api/complain/usercomplainbystatus?status=in_review

    @GetMapping("/complain/usercomplainbystatus")
    public ResponseEntity<List<ComplainDetailsResponse>> getComplainByUserAndStatus(@RequestParam(name = "status") String status){

            return ResponseEntity.ok(complainService.getComplainByUserAndStatus(status));
    }
    @GetMapping("/countallcomplains")
    public ResponseEntity<Long> countAllComplains(){

            return ResponseEntity.ok(complainService.countAllComplains_Service());
    }

    /**
     * Get Complain By arae
     * @param area_id
     * @param pageNumber
     * @param pageSize
     * @return
     */

    @GetMapping("getcomplainbyarea/{area_id}")
    public ResponseEntity<Page<Complain>> getAllComplainByArea(@PathVariable("area_id") Long area_id,
                                                                @RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                               @RequestParam(value = "pageSize",defaultValue = "50",required = false) Integer pageSize){
            return ResponseEntity.ok(complainService.getallComplainByArea(area_id,pageNumber,pageSize));
    }


    /**
     * Get Complain By Complain Type
     * @param complainType_id
     * @param pageNumber
     * @param pageSize
     * @return
     */
    @GetMapping("getcomplainbycomplaintype/{c_type_id}")
    public ResponseEntity<Page<Complain>> getAllComplainByComplainType(@PathVariable("c_type_id") Long complainType_id,
                                                                @RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber, @RequestParam(value = "pageSize",defaultValue = "50",required = false) Integer pageSize){

            return ResponseEntity.ok(complainService.getallComplainByComplainType(complainType_id,pageNumber,pageSize));
    }

}
