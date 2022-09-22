package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.dto.EventDto;
import com.company.ComplainProject.dto.UserDto;
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
    private RolesRepository rolesRepository;
    private DocumentRepository documentRepository;
    private WaterTimingRepository waterTimingRepository;
    private  PollingAnswerRepository pollingAnswerRepository;
    private PollingQuestionRepository pollingQuestionRepository;
    private PollingOptionRepository pollingOptionRepository;
    //                                                                          Construction injection of Services
    private UserService userService;
    private AchievementService achievementService;
    private AreaService areaService;
    private AddressService addressService;
    private ComplainService complainService;
    private ComplainTypeService complainTypeService;
    private DocumentService documentService;
    private WaterTimingService waterTimingService;
    private PollingAnswerService pollingAnswerService;
    private PollingOptionService pollingOptionService;
    private PollingQuestionService pollingQuestionService;
    private EventService eventService;

    public AdminService(UserRepository userRepository, AddressRepository addressRepository
            , AchievementRepository achievementRepository, AreaRepository areaRepository
            , ComplainRepository complainRepository, ComplainTypeRepository complainTypeRepository
            , RolesRepository rolesRepository, DocumentRepository documentRepository
            , WaterTimingRepository waterTimingRepository, PollingAnswerRepository pollingAnswerRepository
            , PollingQuestionRepository pollingQuestionRepository, PollingOptionRepository pollingOptionRepository
            , UserService userService, AchievementService achievementService, AreaService areaService
            , AddressService addressService, ComplainService complainService, ComplainTypeService complainTypeService
            , DocumentService documentService, WaterTimingService waterTimingService
            , PollingAnswerService pollingAnswerService, PollingOptionService pollingOptionService
            , PollingQuestionService pollingQuestionService
            , EventService eventService  ) {
        this.eventService = eventService;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.achievementRepository = achievementRepository;
        this.areaRepository = areaRepository;
        this.complainRepository = complainRepository;
        this.complainTypeRepository = complainTypeRepository;
        this.rolesRepository = rolesRepository;
        this.documentRepository = documentRepository;
        this.waterTimingRepository = waterTimingRepository;
        this.pollingAnswerRepository = pollingAnswerRepository;
        this.pollingQuestionRepository = pollingQuestionRepository;
        this.pollingOptionRepository = pollingOptionRepository;
        this.userService = userService;
        this.achievementService = achievementService;
        this.areaService = areaService;
        this.addressService = addressService;
        this.complainService = complainService;
        this.complainTypeService = complainTypeService;
        this.documentService = documentService;
        this.waterTimingService = waterTimingService;
        this.pollingAnswerService = pollingAnswerService;
        this.pollingOptionService = pollingOptionService;
        this.pollingQuestionService = pollingQuestionService;
    }

    public List<User> getAllUsers(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<User> userPage = userRepository.findAll(pageable);
        List<User> userList = userPage.getContent();

        return userList;
    }

    public List<Achievements> getAllAchievements(Integer pageNumber,Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Achievements> achievementsPage = achievementRepository.findAll(pageable);
        List<Achievements> achievementsList = achievementsPage.getContent();

        return achievementsList;
    }

    public List<Address> getAllAddress(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Address> addressPage = addressRepository.findAll(pageable);
        List<Address> addressList = addressPage.getContent();

        return addressList;
    }

    public List<Area> getAllArea(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Area> areaPage = areaRepository.findAll(pageable);
        List<Area> areaList = areaPage.getContent();

        return areaList;
    }

    public List<Complain> getAllComplain(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Complain> complainPage = complainRepository.findAll(pageable);
        List<Complain> complainsList = complainPage.getContent();
        return complainsList;
    }

    public List<ComplainType> getAllComplainType(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<ComplainType> complainTypePage = complainTypeRepository.findAll(pageable);
        List<ComplainType> complainTypeList = complainTypePage.getContent();
        return complainTypeList;
    }

    public List<Document> getAllDocument(Integer pageNumber,Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Document> documentPage = documentRepository.findAll(pageable);
        List<Document> documentsList = documentPage.getContent();
        return documentsList;
    }

    public List<EventDto> getAllEvents(Integer pageNumber, Integer pageSize) {
        List<EventDto> eventDtos =  eventService.getAllEventWithPagination(pageNumber,pageSize);
        return  eventDtos;
    }

    public List<PollingAnswer> getAllPollingAnswer(){return pollingAnswerRepository.findAll();}

    public List<PollingOption> getAllPollingOption(){return pollingOptionRepository.findAll();}

    public List<PollingQuestion> getAllPollingQuestion(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<PollingQuestion> pollingQuestionPage = pollingQuestionRepository.findAll(pageable);
        List<PollingQuestion> pollingQuestionsList = pollingQuestionPage.getContent();
        return pollingQuestionsList;
    }

    public List<WaterTiming> getAllWaterTiming(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<WaterTiming> waterTimingsPage = waterTimingRepository.findAll(pageable);
        List<WaterTiming> waterTimingsList = waterTimingsPage.getContent();
        return waterTimingsList;
    }

    public ComplainDto updateComplainById(Long id, ComplainDto complainDto) {
        Complain updateComplain = complainService.getAllComplain().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateComplain != null){
            updateComplain.setStatus(complainDto.getStatus());
        }
        return complainService.toDto(complainRepository.save(updateComplain));
    }

    public UserDto updateUserStatusById(Long id, UserDto userDto){
        User user = userService.getAllUser().stream().filter(user1 -> user1.getId().equals(id)).findAny().get();
        if(user != null){
            System.out.println(user.getStatus());
            user.setStatus(userDto.getStatus());
        }
        return userService.toDto(userRepository.save(user));
    }



}
