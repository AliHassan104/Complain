package com.company.ComplainProject.config.image;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

//1
@Service
public interface FileService {
    String uploadImage(String path , MultipartFile file) throws IOException; //1
}
