package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.ComplainLogDto;
import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.ComplainLog;
import com.company.ComplainProject.repository.ComplainLogRespository;
import com.company.ComplainProject.repository.ComplainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComplainLogService {

    @Autowired
    ComplainLogRespository complainLogRespository;
    @Autowired
    ComplainService complainService;
    @Autowired
    ComplainRepository complainRepository;


    public ComplainLog  dto(ComplainLogDto complainLogDto){
        return ComplainLog.builder().id(complainLogDto.getId())
                .date(complainLogDto.getDate()).description(complainLogDto.getDescription())
                .status(complainLogDto.getStatus()).assignedFrom(complainLogDto.getAssignedFrom())
                .assignedTo(complainLogDto.getAssignedTo()).complain(complainLogDto.getComplain()).build();
    }

    public ComplainLogDto todto(ComplainLog complainLog){
        return ComplainLogDto.builder().id(complainLog.getId())
                .date(complainLog.getDate()).description(complainLog.getDescription())
                .status(complainLog.getStatus()).assignedFrom(complainLog.getAssignedFrom())
                .assignedTo(complainLog.getAssignedTo()).complain(complainLog.getComplain()).build();
    }

    public List<ComplainLogDto> getAllComplainLog() {
        List<ComplainLog> complainLogs = complainLogRespository.findAll();
        return complainLogs.stream().map(complainLog -> todto(complainLog)).collect(Collectors.toList());
    }

    public ComplainLogDto getComplainLogById(Long id) {
        Optional<ComplainLog> complainLog = complainLogRespository.findById(id);
        return todto(complainLog.get());
    }

    public List<ComplainLogDto> getComplainLogsByComplain(Long id) {
        Optional<Complain> complain = complainRepository.findById(id);
        List<ComplainLog> complainLogs = complainLogRespository.findComplainLogByComplain(complain.get());
        return complainLogs.stream().map(complainLog -> todto(complainLog)).collect(Collectors.toList());
    }

    public ComplainLogDto addComplainLogByComplainService(Long id, ComplainLogDto complainLogDto) {

        Optional<Complain> complain = complainRepository.findById(id);


        if(complainLogDto.getStatus().equals(Status.IN_REVIEW)){
            complainLogDto.setStatus(Status.IN_REVIEW);
        }
        else if(complainLogDto.getStatus().equals(Status.IN_PROGRESS)){
            complainLogDto.setStatus(Status.IN_PROGRESS);
        }
        else if(complainLogDto.getStatus().equals(Status.COMPLETED)){
            complainLogDto.setStatus(Status.COMPLETED);
        }
        else{
            complainLogDto.setStatus(Status.REJECTED);
        }

        complainLogDto.setComplain(complain.get());
        return todto(complainLogRespository.save(dto(complainLogDto)));
    }

    public void deleteComplainLogByComplain(Long id) {
        Optional<Complain> complain = complainRepository.findById(id);
        complainLogRespository.deleteComplainLogByComplain(complain.get());
    }

}
