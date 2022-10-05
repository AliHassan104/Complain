package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.*;
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
    //                                                                          Construction injection of Services
    private UserService userService;
    private ComplainService complainService;
    private EventService eventService;
    private AchievementService achievementService;
    private AddressService addressService;
    private AreaService areaService;


    public AdminService(UserRepository userRepository, AddressRepository addressRepository, AchievementRepository achievementRepository, AreaRepository areaRepository, ComplainRepository complainRepository, ComplainTypeRepository complainTypeRepository, DocumentRepository documentRepository, WaterTimingRepository waterTimingRepository, PollingAnswerRepository pollingAnswerRepository, PollingQuestionRepository pollingQuestionRepository, PollingOptionRepository pollingOptionRepository, UserService userService, ComplainService complainService, EventService eventService, AchievementService achievementService, AddressService addressService, AreaService areaService) {
        this.userRepository = userRepository;
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
    }

    public Page<User> getAllUsers(Integer pageNumber, Integer pageSize){
          Page<User> userList =  userService.getAllUserWithPagination(pageNumber,pageSize);
          return userList;
    }

    public Page<Achievements> getAllAchievements(Integer pageNumber,Integer pageSize){
        Page<Achievements> achievementsDtos =  achievementService.getAllAchievementWithPagination(pageNumber,pageSize);
        return achievementsDtos;
    }

    public List<AddressDto> getAllAddress(){
        List<AddressDto> addressList = addressService.getAllAddressDto();
        return addressList;
    }

    public Page<Area> getAllArea(Integer pageNumber,Integer pageSize){
        Page<Area> areaList = areaService.getAllAreaDtoWithPagination(pageNumber,pageSize);
        return areaList;
    }

    public Page<Complain> getAllComplain(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Complain> complainPage = complainRepository.findAll(pageable);
        complainPage.stream().forEach(complain -> complain.getUser().setPassword(null));
        return complainPage;
    }

    public Page<ComplainType> getAllComplainType(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<ComplainType> complainTypePage = complainTypeRepository.findAll(pageable);
        return  complainTypePage;
    }

    public Page<Document> getAllDocument(Integer pageNumber,Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Document> documentPage = documentRepository.findAll(pageable);
        return documentPage;
    }

    public Page<Event> getAllEvents(Integer pageNumber, Integer pageSize) {
        Page<Event> eventDtos =  eventService.getAllEventWithPagination(pageNumber,pageSize);
        return  eventDtos;
    }

    public List<PollingAnswer> getAllPollingAnswer(){return pollingAnswerRepository.findAll();}

    public List<PollingOption> getAllPollingOption(){return pollingOptionRepository.findAll();}

    public Page<PollingQuestion> getAllPollingQuestion(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<PollingQuestion> pollingQuestionPage = pollingQuestionRepository.findAll(pageable);
        return pollingQuestionPage;
    }

    public Page<WaterTiming> getAllWaterTiming(Integer pageNumber,Integer pageSize){

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<WaterTiming> waterTimingsPage = waterTimingRepository.findAll(pageable);
        return waterTimingsPage;
    }

    /**
     *
     * @param id
     * @param complainDto
     * @return
     */
    public ComplainDto updateComplainById(Long id, ComplainDto complainDto) {
        Complain updateComplain = complainService.dto(complainService.getAllComplain().stream().filter(el->el.getId().equals(id)).findAny().get());
        if(updateComplain != null){
            updateComplain.setStatus(complainDto.getStatus());
        }
        return complainService.toDto(complainRepository.save(updateComplain));
    }

    /**
     *
     * @param id
     * @param userDto
     * @return
     */
    public UserDto updateUserStatusById(Long id, UserDto userDto){
        User user = userService.getAllUser().stream().filter(user1 -> user1.getId().equals(id)).findAny().get();
        if(user != null){
            System.out.println(user.getStatus());
            user.setStatus(userDto.getStatus());
        }
        return userService.toDto(userRepository.save(user));
    }


}
