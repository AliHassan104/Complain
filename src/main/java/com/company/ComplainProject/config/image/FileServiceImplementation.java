package com.company.ComplainProject.config.image;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class FileServiceImplementation implements FileService {

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {

        createComplainFolder();
        imageFolderInsideComplainFolder();
        // file name
        String name = file.getOriginalFilename();
        // file path
        String filePath = path + File.separator + name;
        // create folder
        File f = new File(path);
        if (!f.exists()){
            f.mkdir();
        }
        // file copy
        Files.copy(file.getInputStream() , Paths.get(filePath));

        return name;
    }
    public void createComplainFolder(){
        try{
            File complainFolder  = new File("/complain");
            Boolean created =  complainFolder.mkdir();
            if(created){
                System.out.println("Created Complain Folder");
            }

        }catch (Exception e){
            System.out.println("Cannot create Complain Folder"+e);
        }
    }
    public void imageFolderInsideComplainFolder(){
        try{
            File imageFolderInsideComplainFolder = new File("/complain/images");
            Boolean imageFolder = imageFolderInsideComplainFolder.mkdir();
            if(imageFolder){
                System.out.println("Folder created");
            }
        }catch (Exception e){
            System.out.println("Image folder inside Complain Folder is not created"+e);
        }
    }
}
