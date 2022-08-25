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
        // file name
        String name = file.getOriginalFilename();
        System.out.println(name);
        // file path
        String filePath = path + File.separator + name;
        System.out.println(filePath);
        // create folder
        File f = new File(path);
        if (!f.exists()){
            f.mkdir();
        }
        // file copy
        Files.copy(file.getInputStream() , Paths.get(filePath));

        return name;
    }
}
