package com.company.ComplainProject.controller;

import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.dto.DocumentDto;
import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.model.Document;
import com.company.ComplainProject.service.AchievementService;
import com.company.ComplainProject.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class DocumentController {
    @Autowired
    DocumentService documentService;

    @GetMapping("/document")
    public ResponseEntity<List<Document>> getDocument(){
        List<Document> document = documentService.getAllDocument();
        if(!document.isEmpty()){
            return ResponseEntity.ok(document);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/document/{id}")
    public ResponseEntity<Optional<Document>> getAchievementsById(@PathVariable Long id){
        Optional<Document> document = documentService.getDocumentById(id);
        if(document.isPresent()){
            return  ResponseEntity.ok(document);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/document")
    public ResponseEntity<DocumentDto> addDocument(@RequestBody DocumentDto documentDto){
        System.out.println(documentDto);
        try{
            return ResponseEntity.ok(documentService.addDocument(documentDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/document/{id}")
    public ResponseEntity<Void> deleteDocumentById(@PathVariable Long id){
        try{
            documentService.deleteDocumentById(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/document/{id}")
    public ResponseEntity<Optional<DocumentDto>> updateAchievementById(@PathVariable Long id,@RequestBody DocumentDto documentDto){
        try{
            return ResponseEntity.ok(documentService.updateDocumentById(id,documentDto));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
