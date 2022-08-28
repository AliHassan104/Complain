package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.PollingOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PollingOptionRepository extends JpaRepository<PollingOption,Long> {


    @Transactional
    @Modifying
    @Query(value = "DELETE FROM polling_option WHERE polling_question_id=?1",nativeQuery = true)
    void deleteOptionByid(Long id);
}
