package com.company.ComplainProject.config.image;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ComplainImageImplementation implements FileService {

    final String complainImagePath = Paths.get("src/main/resources/static/complain/images").toAbsolutePath().toString();

    @Override
    public String uploadImage(MultipartFile file){

        FileService.createStaticFolder();

        createComplainFolder();
        imageFolderInsideComplainFolder();
            // file name

        String generatedfilename = FileService.generateRandomImageName(file);
                                    // file path
        String filePath = complainImagePath+File.separator+generatedfilename;
        // file copy
        try {
            Files.copy(file.getInputStream(),Paths.get(filePath));
        }
        catch (Exception e){
            System.out.println(e);
        }
        return generatedfilename;
    }

    public void createComplainFolder(){
        try{
            String staticpath = Paths.get("src/main/resources/static").toAbsolutePath().toString();
            String path = staticpath+File.separator+"complain";
            File complainFolder  = new File(path);
            if(!Files.exists(Paths.get(path))){
               complainFolder.mkdir();
            }
        }catch (Exception e){
            System.out.println("Cannot create Complain Folder"+e);
        }
    }
    public void imageFolderInsideComplainFolder(){
        try{
            String complainpaths = Paths.get("src/main/resources/static/complain").toAbsolutePath().toString();
            String paths = complainpaths+File.separator+"images";
            File imageFolderInsideComplainFolder = new File(paths);

            if(!Files.exists(Paths.get(paths))){
                imageFolderInsideComplainFolder.mkdir();
            }
        }catch (Exception e){
            System.out.println("Image folder inside Complain Folder is not created"+e);
        }
    }

}
