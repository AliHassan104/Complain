package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.ComplainLogDto;
import com.company.ComplainProject.dto.Note;
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
    AdminService adminService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FirebaseMessagingService firebaseMessagingService;


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
    try {

        Optional<Complain> complain = complainRepository.findById(id);

        if (complainLogDto.getAssignedFrom() != null) {
            Optional<User> admin = userRepository.findById(complainLogDto.getAssignedFrom().getId());
            complainLogDto.setAssignedFrom(admin.get());
        }

        if(complainLogDto.getAssignedTo() != null){
            Optional<User> worker = userRepository.findById(complainLogDto.getAssignedTo().getId());
            complainLogDto.setAssignedTo(worker.get());
        }

        complainLogDto.setStatus(complain.get().getStatus());
        complainLogDto.setDescription(complainLogDto.getDescription());
        complainLogDto.setDate(LocalDate.now());
        complainLogDto.setComplain(complain.get());

        ComplainLogDto _complainLogDto = todto(complainLogRespository.save(dto(complainLogDto)));

        /**
         *  Send Notification to worker
         */
        if(_complainLogDto != null) {
            if (_complainLogDto.getStatus().equals(Status.IN_PROGRESS)) {
                Note note = Note.builder().subject("Assign Complain")
                        .content(_complainLogDto.getAssignedFrom().getEmail() + " assigned " + _complainLogDto.getComplain().getComplainType().getName() + " Complian ").build();
                firebaseMessagingService.sendNotification(note, _complainLogDto.getAssignedTo().getDeviceToken());
            }

            /**
             * Send Notification to Customer
             */
            Note customerNote = Note.builder().subject("Your Complain is in " + _complainLogDto.getStatus())
                    .content("Your Complain of "+complain.get().getComplainType().getName()+" is in "+_complainLogDto.getStatus()).build();
            firebaseMessagingService.sendNotification(customerNote,complain.get().getUser().getDeviceToken());

        }
        return _complainLogDto;
    }
        catch (Exception e){
            throw new ContentNotFoundException("Some thing went wrong in complain logs of complain id "+id);
        }
    }

    public void deleteComplainLogByComplain(Long id) {
        Optional<Complain> complain = complainRepository.findById(id);
        complainLogRespository.deleteComplainLogByComplain(complain.get());
    }



    public ComplainLog  dto(ComplainLogDto complainLogDto){
        return ComplainLog.builder().id(complainLogDto.getId())
                .date(complainLogDto.getDate()).description(complainLogDto.getDescription())
                .reason(complainLogDto.getReason())
                .status(complainLogDto.getStatus()).assignedFrom(complainLogDto.getAssignedFrom())
                .assignedTo(complainLogDto.getAssignedTo()).complain(complainLogDto.getComplain()).build();
    }

    public ComplainLogDto todto(ComplainLog complainLog){
        return ComplainLogDto.builder().id(complainLog.getId())
                .date(complainLog.getDate()).description(complainLog.getDescription())
                .reason(complainLog.getReason())
                .status(complainLog.getStatus()).assignedFrom(complainLog.getAssignedFrom())
                .assignedTo(complainLog.getAssignedTo()).build();
    }


    public ComplainLogDto addComplainLogRejection(Long id, ComplainLogDto complainDto) {
        try {
            Optional<ComplainLog> updateComplain = complainLogRespository.findById(id);
            if (updateComplain.isPresent()) {
                updateComplain.get().setStatus(Status.REJECTED);
                updateComplain.get().setReason(complainDto.getReason());
            }
            else{
                throw new ContentNotFoundException("No Complain Exist Having id "+id);
            }
            ComplainLogDto _complainDto = todto(complainLogRespository.save(updateComplain.get()));
            adminService.updateComplainRejectStatus(id);
//            if(_complainDto != null){
//
//                Note note = new Note();
//                note.setSubject("Your Complain is in " + _complainDto.getStatus());
//                note.setContent("Your Complain of " + _complainDto.getComplainType().getName() + " is in " + _complainDto.getStatus());
//
//                notificatonService.sendNotification(note,_complainDto.getUser().getDeviceToken());
//
//            }

            return _complainDto;

        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot update complain Status "+e);
        }
    }

}
