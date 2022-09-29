package com.company.ComplainProject.repository;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.ComplainLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplainLogRespository extends JpaRepository<ComplainLog, Long> {

    @Query("SELECT cl FROM ComplainLog cl WHERE cl.complain = :complain")
    List<ComplainLog> findComplainLogByComplain(@Param("complain") Complain complain);

    @Query("DELETE FROM ComplainLog cl WHERE cl.complain = :complain")
    void deleteComplainLogByComplain(@Param("complain") Complain complain);
}
