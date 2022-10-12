package com.company.ComplainProject.config.image;

import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.service.ComplainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ComplainImageImplementation implements FileService {
    @Autowired
    ComplainService complainService;

    final String complainImagePath = Paths.get("src/main/resources/static/complain/images").toAbsolutePath().toString();

    @Override
    public String uploadImage(MultipartFile file) throws IOException {

        /**
         *  Create Static Folder if not exist
         */
        FileService.createStaticFolder();

        /**
         *  Create Complain And Image Folder if not exist
         */
        createComplainFolder();
        imageFolderInsideComplainFolder();
                                                                                 // file name
        String generatedfilename = FileService.generateRandomImageName(file);
                                                                                 // file path
        String filePath = complainImagePath+File.separator+generatedfilename;
                                                                                 // file copy
        InputStream inputStream = null;
        try {
            inputStream =file.getInputStream();
            Files.copy(inputStream,Paths.get(filePath));
        }
        catch (Exception e){
            System.out.println(e);
        }
        finally {
            inputStream.close();
        }
        return generatedfilename;
    }

    @Override
    public Boolean deleteImage(Long id) {
        try{
            Complain complain = complainService.dto(complainService.getAllComplain().stream().filter(complain1 -> complain1.getId().equals(id)).findAny().get());
            String getImageName = complain.getPicture().substring((complain.getPicture().lastIndexOf("/"))+1);
            String imagePath =complainImagePath+File.separator+getImageName;

            Files.deleteIfExists(Paths.get(imagePath));
            return true;

        }catch (Exception e){
            System.out.println(e+" Exception deleting complain image ");
            return false;
        }
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
