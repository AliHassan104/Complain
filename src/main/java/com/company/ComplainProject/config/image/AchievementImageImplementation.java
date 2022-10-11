package com.company.ComplainProject.config.image;

import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;


@Service
public class AchievementImageImplementation implements FileService {
    @Autowired
    AchievementService achievementService;

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

        String generatedfilename = FileService.generateRandomImageName(file);

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

    @Override
    public Boolean deleteImage(Long id) {

        try{
            Achievements achievements =achievementService.getAllAchievement().stream().filter(achievements1 -> achievements1.getId().equals(id)).findAny().get();
            String getImageName = achievements.getPictureUrl().substring((achievements.getPictureUrl().lastIndexOf("/"))+1);
            String imagePath =achievementImagePath+File.separator+getImageName;

            Files.deleteIfExists(Paths.get(imagePath));
            return true;

        }catch (Exception e){
            System.out.println(e+" Exception deleting achievement image for update");
            return false;
        }

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
