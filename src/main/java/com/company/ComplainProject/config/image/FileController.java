//package com.company.ComplainProject.config.image;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//
//@RestController
//@RequestMapping("/file")
//public class FileController {
//
//    @Autowired
//    private FileService fileService;
//
//    @Value("${project.image}")
//    private String path;
//
//    @PostMapping("/upload")
//    public ResponseEntity<FileResponse> fileUpload(@RequestParam("image")MultipartFile image){
//        String fileName = null;
//        try {
//            fileName = this.fileService.uploadImage(path , image);
//            System.out.println(path);
//
//        } catch (IOException e) {
//            e.printStackTrace();
////            return new ResponseEntity<>(new FileResponse(null,"File Not Uploaded","",""), HttpStatus.OK);
//        }
//        return new ResponseEntity<>(new FileResponse(1L,"","http://localhost:8081/"+path+fileName,"Success"), HttpStatus.OK);
//    }
//}
