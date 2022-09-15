package com.company.ComplainProject.config.image;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public interface FileService {

    String uploadImage(MultipartFile file) throws IOException; //1

    public static void createStaticFolder()  {
        try {
            String resourcespath = Paths.get("src/main/resources").toAbsolutePath().toString();
            String path = resourcespath+ File.separator+"static";
            File staticFile = new File(path);

            if(!Files.exists(Paths.get(path))){
                staticFile.mkdir();
            }
        }
        catch (Exception e){
            System.out.println("Static Folder Exception"+e);
        }
    }

    public static String generateRandomImageName(MultipartFile file){
        String randomId = UUID.randomUUID().toString();
        String filename = file.getOriginalFilename();
        String generatedfilename = randomId.concat(filename.substring(filename.lastIndexOf(".")));
        return generatedfilename;
    }

}
