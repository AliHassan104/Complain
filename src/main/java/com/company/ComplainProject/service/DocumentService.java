package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.dto.DocumentDto;
import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.model.Document;
import com.company.ComplainProject.repository.AchievementRepository;
import com.company.ComplainProject.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {
    @Autowired
    DocumentRepository documentRepository;

    public List<Document> getAllDocument() {
        return documentRepository.findAll();
    }

    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

    public void deleteDocumentById(Long id) {
        documentRepository.deleteById(id);
    }

    public DocumentDto addDocument(DocumentDto documentDto) {
        return toDto(documentRepository.save(dto(documentDto)));
    }

    public Optional<DocumentDto> updateDocumentById(Long id, DocumentDto documentDto) {
        Document updateDocumentDto = getAllDocument().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateDocumentDto != null){
            updateDocumentDto.setUrl(documentDto.getUrl());
            updateDocumentDto.setArea(documentDto.getArea());
        }
        return Optional.of(toDto(documentRepository.save(updateDocumentDto)));
    }

    public Document dto(DocumentDto documentDto){
        return Document.builder().id(documentDto.getId())
                .url(documentDto.getUrl())
                .area(documentDto.getArea())
                .build();
    }

    public DocumentDto toDto(Document document){
        return  DocumentDto.builder()
                .id(document.getId()).url(document.getUrl())
                .area(document.getArea())
                .build();
    }
}
