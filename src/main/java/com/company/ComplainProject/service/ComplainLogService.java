package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.ComplainLogDto;
import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.ComplainLog;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.ComplainLogRespository;
import com.company.ComplainProject.repository.ComplainRepository;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    @Autowired
    UserRepository userRepository;


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
//                                                                                          get the user (admin) object

        if(complainLogDto.getAssignedFrom() != null){
           Optional<User> admin = userRepository.findById(complainLogDto.getAssignedFrom().getId());
           complainLogDto.setAssignedFrom(admin.get());
        }
        if(complainLogDto.getAssignedTo() != null){
            Optional<User> worker = userRepository.findById(complainLogDto.getAssignedTo().getId());
            complainLogDto.setAssignedTo(worker.get());
        }

        Optional<Complain> complain = complainRepository.findById(id);

        complainLogDto.setStatus(complain.get().getStatus());
        complainLogDto.setDescription("Your Complain is "+complain.get().getStatus());
        complainLogDto.setDate(LocalDate.now());
        complainLogDto.setComplain(complain.get());

        return todto(complainLogRespository.save(dto(complainLogDto)));

    }

    public void deleteComplainLogByComplain(Long id) {
        Optional<Complain> complain = complainRepository.findById(id);
        complainLogRespository.deleteComplainLogByComplain(complain.get());
    }



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
                .assignedTo(complainLog.getAssignedTo()).build();
    }


}
