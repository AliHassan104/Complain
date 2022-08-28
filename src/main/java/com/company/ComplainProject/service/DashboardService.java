package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.DashboardData.ComplainByComplainType;
import com.company.ComplainProject.dto.DashboardData.ComplainByMonth;
import com.company.ComplainProject.dto.DashboardData.ComplainByStatus;
import com.company.ComplainProject.dto.DashboardDto;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.repository.AreaRepository;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class DashboardService {
    @Autowired
    private ComplainRepository complainRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AreaRepository areaRepository;

    public ArrayList<ComplainByComplainType> getComplainByComplainType(){
      ArrayList<ComplainByComplainType> complainByComplainType = complainRepository.findComplainByComplain();
      if(complainByComplainType.isEmpty()){
          System.out.println("No Complain by complain type found");
      }
      return  complainByComplainType;
    }

    public ArrayList<ComplainByStatus> getComplainByStatus(){
        ArrayList<ComplainByStatus> complainByStatus = complainRepository.findComplainByStatus();
        if(complainByStatus.isEmpty()){
            System.out.println("No Complain by complain type found");
        }
        return  complainByStatus;
    }

    public ArrayList<ComplainByMonth> getComplainByMonth() {
        ArrayList<ComplainByMonth> complainByMonth = complainRepository.findComplainByMonth();
        if(complainByMonth.isEmpty()){
            System.out.println("No Complain by complain type found");
        }
        return  complainByMonth;
    }
}
