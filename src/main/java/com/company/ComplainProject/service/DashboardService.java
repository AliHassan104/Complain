package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.DashboardDto;
import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.repository.AreaRepository;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Map<String,Integer> getDashboard(){
        return  complainRepository.findComplainByComplain();
    }





}
