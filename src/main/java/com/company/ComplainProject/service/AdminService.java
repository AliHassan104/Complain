package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.*;
import com.company.ComplainProject.dto.ProjectEnums.Status;
import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private UserRepository userRepository;
    private AddressRepository addressRepository;
    private AchievementRepository achievementRepository;
    private AreaRepository areaRepository;
    private ComplainRepository complainRepository;
    private ComplainTypeRepository complainTypeRepository;
    private DocumentRepository documentRepository;
    private WaterTimingRepository waterTimingRepository;
    private  PollingAnswerRepository pollingAnswerRepository;
    private PollingQuestionRepository pollingQuestionRepository;
    private PollingOptionRepository pollingOptionRepository;


    //
    //                                                                          prConstruction injection of Services
    private FirebaseMessagingService notificatonService;
    private UserService userService;
    private ComplainService complainService;
    private EventService eventService;
    private AchievementService achievementService;
    private AddressService addressService;
    private AreaService areaService;
    private BlockService blockService;

    public AdminService(UserRepository userRepository,FirebaseMessagingService notificatonService, AddressRepository addressRepository, AchievementRepository achievementRepository, AreaRepository areaRepository, ComplainRepository complainRepository, ComplainTypeRepository complainTypeRepository, DocumentRepository documentRepository, WaterTimingRepository waterTimingRepository, PollingAnswerRepository pollingAnswerRepository, PollingQuestionRepository pollingQuestionRepository, PollingOptionRepository pollingOptionRepository, UserService userService, ComplainService complainService, EventService eventService, AchievementService achievementService, AddressService addressService, AreaService areaService, BlockService blockService) {
        this.userRepository = userRepository;
        this.notificatonService =  notificatonService;
        this.addressRepository = addressRepository;
        this.achievementRepository = achievementRepository;
        this.areaRepository = areaRepository;
        this.complainRepository = complainRepository;
        this.complainTypeRepository = complainTypeRepository;
        this.documentRepository = documentRepository;
        this.waterTimingRepository = waterTimingRepository;
        this.pollingAnswerRepository = pollingAnswerRepository;
        this.pollingQuestionRepository = pollingQuestionRepository;
        this.pollingOptionRepository = pollingOptionRepository;
        this.userService = userService;
        this.complainService = complainService;
        this.eventService = eventService;
        this.achievementService = achievementService;
        this.addressService = addressService;
        this.areaService = areaService;
        this.blockService = blockService;
    }

    public Page<User> getAllUsers(Integer pageNumber, Integer pageSize){
        try {
            Page<User> userList = userService.getAllUserWithPagination(pageNumber, pageSize);
            return userList;
        }catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot fetch user data "+e);
        }
    }

    public Page<Achievements> getAllAchievements(Integer pageNumber,Integer pageSize){
        try {
            Page<Achievements> achievements = achievementService.getAllAchievementWithPagination(pageNumber, pageSize);
            return achievements;
        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot fetch Achievement "+e);
        }
    }

    public List<AddressDto> getAllAddress(){
        try {
            List<AddressDto> addressList = addressService.getAllAddressDto();
            return addressList;
        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot fetch Address "+e);
        }
    }

    public Page<Area> getAllArea(Integer pageNumber,Integer pageSize){
        try {
            Page<Area> areaList = areaService.getAllAreaDtoWithPagination(pageNumber,pageSize);
            return areaList;
        }
         catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot fetch Area "+e);
        }
    }

    public Page<Complain> getAllComplain(Integer pageNumber,Integer pageSize){
        try {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<Complain> complainPage = complainRepository.findAll(pageable);
            return complainPage;

        }catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot Complains "+e);
        }
    }

    public Page<ComplainType> getAllComplainType(Integer pageNumber,Integer pageSize){
        try {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<ComplainType> complainTypePage = complainTypeRepository.findAll(pageable);
            return complainTypePage;
        } catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot fetch complain type "+e);
        }
    }

    public Page<Document> getAllDocument(Integer pageNumber,Integer pageSize){
        try {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<Document> documentPage = documentRepository.findAll(pageable);
            return documentPage;
        } catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot fetch documents "+e);
        }
    }

    public Page<Event> getAllEvents(Integer pageNumber, Integer pageSize) {
        try {
            Page<Event> eventDtos = eventService.getAllEventWithPagination(pageNumber, pageSize);
            return eventDtos;
        }catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot fetch events "+e);
        }
    }

    public List<PollingAnswer> getAllPollingAnswer(){return pollingAnswerRepository.findAll();}

    public List<PollingOption> getAllPollingOption(){return pollingOptionRepository.findAll();}

    public Page<PollingQuestion> getAllPollingQuestion(Integer pageNumber,Integer pageSize){
        try {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<PollingQuestion> pollingQuestionPage = pollingQuestionRepository.findAll(pageable);
            return pollingQuestionPage;
        }catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot polling questions "+e);
        }
    }

    public Page<WaterTiming> getAllWaterTiming(Integer pageNumber,Integer pageSize){
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<WaterTiming> waterTimingsPage = waterTimingRepository.findAll(pageable);
            return waterTimingsPage;
        }catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot fetch water timing"+e);
        }
    }

    /**
     *
     * @param id
     * @param complainDto
     * @return
     */
    public ComplainDto updateComplainById(Long id, ComplainDto complainDto) {
        try {

            Optional<Complain> updateComplain = complainRepository.findById(id);
            if (updateComplain.isPresent()) {
                updateComplain.get().setStatus(complainDto.getStatus());
            }
            else{
                throw new ContentNotFoundException("No Complain Exist Having id "+id);
            }
            ComplainDto _complainDto = complainService.toDto(complainRepository.save(updateComplain.get()));
            if(_complainDto != null){

                Note note = new Note();
                note.setSubject("Your Complain is in " + _complainDto.getStatus());
                note.setContent("Your Complain of " + _complainDto.getComplainType().getName() + " is in " + _complainDto.getStatus());

                notificatonService.sendNotification(note,_complainDto.getUser().getDeviceToken());

            }

            return _complainDto;

        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot update complain Status "+e);
        }
    }

    public ComplainDto updateComplainRejectStatus(Long id) {
        try {

            Optional<Complain> updateComplain = complainRepository.findById(id);
            if (updateComplain.isPresent()) {
                updateComplain.get().setStatus(Status.REJECTED);
            }
            else{
                throw new ContentNotFoundException("No Complain Exist Having id "+id);
            }
            ComplainDto _complainDto = complainService.toDto(complainRepository.save(updateComplain.get()));

            return _complainDto;

        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot update complain Status "+e);
        }
    }

    /**
     *
     * @param id
     * @param userDto
     * @return
     */
    public UserDto updateUserStatusById(Long id, UserDto userDto){
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                user.get().setStatus(userDto.getStatus());
            }
            else{
                throw new ContentNotFoundException("Cannot update status No user Exist Having id "+id);
            }
            UserDto _userDto = userService.toDto(userRepository.save(user.get()));
            if(_userDto!=null){
                Note note = Note.builder()
                        .subject("Welcome")
                        .content("you can now login to jicomplain").build();
                notificatonService.sendNotification(note,_userDto.getDeviceToken());
            }
            return _userDto;
        }
        catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot update user Status "+e);
        }
    }


    public Page<Block> getAllBlocks(Integer pageNumber, Integer pageSize) {
        try {
            Page<Block> page = blockService.getAllBlocksWithPagination(pageNumber,pageSize);
            return page;
        }catch (Exception e){
            throw new RuntimeException("Some thing went wrong Cannot fetch Blocks"+e);
        }
    }
}
