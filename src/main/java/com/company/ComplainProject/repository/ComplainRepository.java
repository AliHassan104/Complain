package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Complain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface ComplainRepository extends JpaRepository<Complain,Long> {

    @Query(value = "SELECT name , count(*) FROM complain INNER JOIN complain_type ON complain.complain_type_id = complain_type.id group by name;\n" , nativeQuery = true)
    public  Map<String , Integer> findComplainByComplain();
}
