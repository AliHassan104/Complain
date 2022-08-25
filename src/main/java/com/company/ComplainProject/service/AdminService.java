package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.model.*;
import com.company.ComplainProject.repository.*;
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
            , PollingQuestionService pollingQuestionService) {
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

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public List<Achievements> getAllAchievements(){
        return achievementRepository.findAll();
    }

    public List<Address> getAllAddress(){
        return addressRepository.findAll();
    }

    public List<Area> getAllArea(){
        return areaRepository.findAll();
    }

    public List<Complain> getAllComplain(){
        return complainRepository.findAll();
    }

    public List<ComplainType> getAllComplainType(){return complainTypeRepository.findAll();}

    public List<Document> getAllDocument(){return documentRepository.findAll();}

    public List<PollingAnswer> getAllPollingAnswer(){return pollingAnswerRepository.findAll();}

    public List<PollingOption> getAllPollingOption(){return pollingOptionRepository.findAll();}

    public List<PollingQuestion> getAllPollingQuestion(){return pollingQuestionRepository.findAll();}

    public List<WaterTiming> getAllWaterTiming(){return waterTimingRepository.findAll();}

    public ComplainDto updateComplainById(Long id, ComplainDto complainDto) {
        Complain updateComplain = getAllComplain().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateComplain != null){
            updateComplain.setStatus(complainDto.getStatus());
        }
        return complainService.toDto(complainRepository.save(updateComplain));
    }




}
