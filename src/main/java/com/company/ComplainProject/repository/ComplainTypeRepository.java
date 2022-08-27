package com.company.ComplainProject.repository;

//import com.company.ComplainProject.dto.DashboardDto;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.ComplainType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplainTypeRepository extends JpaRepository<ComplainType,Long> {

}
