package com.company.ComplainProject.config.image;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class AchievementImageImplementation implements FileService {

    final String achievementImagePath = Paths.get("src/main/resources/static/achievement/images").toAbsolutePath().toString();
    @Override
    public String uploadImage(MultipartFile file) {
//                                                 First it will create static folder if not present
        FileService.createStaticFolder();
//                                                 create achievement Folder
        createAchievementFolder();
//                                                 create images folder in achievement folder if not exist
        imageFolderInsideAchievementFolder();
//                                                  Generate Random name
        String randomId = UUID.randomUUID().toString();
        String filename = file.getOriginalFilename();
        String generatedfilename = randomId.concat(filename.substring(filename.lastIndexOf(".")));


                                                    // file path
        String filePath = achievementImagePath+File.separator+generatedfilename;
                                                    // file copy
        try {
            Files.copy(file.getInputStream(),Paths.get(filePath));
        }
        catch (Exception e){
            System.out.println(e);
        }
        return generatedfilename;

    }

    public void createAchievementFolder(){
        try{
            String staticpath = Paths.get("src/main/resources/static").toAbsolutePath().toString();
            String path = staticpath+ File.separator+"achievement";
            File achievementFolder  = new File(path);
            if(!Files.exists(Paths.get(path))){
                achievementFolder.mkdir();
            }
        }catch (Exception e){
            System.out.println("Cannot create achievement Folder"+e);
        }
    }
    public void imageFolderInsideAchievementFolder(){
        try{
            String complainpaths = Paths.get("src/main/resources/static/achievement").toAbsolutePath().toString();
            String paths = complainpaths+File.separator+"images";
            File imageFolderInsideComplainFolder = new File(paths);

            if(!Files.exists(Paths.get(paths))){
                imageFolderInsideComplainFolder.mkdir();
            }
        }catch (Exception e){
            System.out.println("Image folder inside achievement Folder is not created"+e);
        }
    }
}
