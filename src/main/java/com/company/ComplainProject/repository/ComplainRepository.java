package com.company.ComplainProject.repository;

import com.company.ComplainProject.dto.DashboardData.ComplainByComplainType;
import com.company.ComplainProject.dto.DashboardData.ComplainByMonth;
import com.company.ComplainProject.dto.DashboardData.ComplainByStatus;
import com.company.ComplainProject.model.Complain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Repository
public interface ComplainRepository extends JpaRepository<Complain,Long> {

    @Query(value = "SELECT NEW com.company.ComplainProject.dto.DashboardData.ComplainByComplainType(ct.name,COUNT(*)) FROM Complain c INNER JOIN ComplainType ct ON c.complainType = ct.id group by name")
    public ArrayList<ComplainByComplainType> findComplainByComplain();

    @Query(value = "SELECT NEW com.company.ComplainProject.dto.DashboardData.ComplainByStatus(c.status,COUNT(*)) FROM Complain c INNER JOIN ComplainType ct ON  c.complainType = ct.id group by status")
    public ArrayList<ComplainByStatus> findComplainByStatus();

    @Query(value = "SELECT NEW com.company.ComplainProject.dto.DashboardData.ComplainByMonth(COUNT(c.id),MONTH(c.date)) FROM Complain c GROUP BY MONTH(c.date)" )
    public ArrayList<ComplainByMonth> findComplainByMonth();

}



