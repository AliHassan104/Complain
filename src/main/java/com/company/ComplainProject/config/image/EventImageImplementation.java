package com.company.ComplainProject.config.image;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class EventImageImplementation implements FileService{

    String eventImagePath = Paths.get("src/main/resources/static/event/images").toAbsolutePath().toString();

    @Override
    public String uploadImage(MultipartFile file) throws IOException {
//                                                  Static Folder will be created if not exist
        FileService.createStaticFolder();
//                                                  Event Folder will be created
        createEventFolder();
//                                                  Image Folder inside Event Folder will be Created
        createImageFolderInsideEventFolder();

        String generatedRandomFileName = FileService.generateRandomImageName(file);
        String filePath = eventImagePath+File.separator+generatedRandomFileName;
        try {
            Files.copy(file.getInputStream(),Paths.get(filePath));
        }catch (Exception e){
            System.out.println(e);
        }
        return generatedRandomFileName;
    }

    public void createEventFolder(){
        try {
            String staticFolderPath = Paths.get("src/main/resources/static").toAbsolutePath().toString();
            String eventFolderPath = staticFolderPath + File.separator + "event";
            File createEventFolder = new File(eventFolderPath);
            if (!Files.exists(Paths.get(eventFolderPath))) {
                createEventFolder.mkdir();
            }
        }
        catch (Exception e){
            System.out.println(e+" Exception creating event Folder");
        }

    }

    public void createImageFolderInsideEventFolder(){
        try {
            String staticFolderPath = Paths.get("src/main/resources/static/event").toAbsolutePath().toString();
            String ImageFolderPathInsideEventFolder = staticFolderPath + File.separator + "images";
            File createImageFolder = new File(ImageFolderPathInsideEventFolder);
            if (!Files.exists(Paths.get(ImageFolderPathInsideEventFolder))) {
                createImageFolder.mkdir();
            }
        }
        catch (Exception e){
            System.out.println(e+" Exception creating image Folder in event Folder");
        }
    }

}
