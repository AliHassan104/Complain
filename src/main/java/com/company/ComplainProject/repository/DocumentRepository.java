package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Long> {

    @Query("SELECT d FROM Document d WHERE d.area = :area")
    List<Document> getDocumentByArea(@Param("area") Area area);

}
