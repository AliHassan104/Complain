package com.company.ComplainProject.service;

import com.company.ComplainProject.dto.AchievementsDto;
import com.company.ComplainProject.model.Achievements;
import com.company.ComplainProject.repository.AchievementRepository;
        import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
        import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class AchievementService {
    @Autowired
    AchievementRepository achievementRepository;

    private final String imageFolderPath = Paths.get("src/main/resources/static/achievement/images").toAbsolutePath().toString();


    public List<Achievements> getAllAchievementWithPagination(Integer pageNumber,Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Achievements> achievementsPage = achievementRepository.findAll(pageable);
        List<Achievements> achievementsList = achievementsPage.getContent();
        return achievementsList;
    }

    public List<Achievements> getAllAchievement(){
        return achievementRepository.findAll();
    }

    public Optional<Achievements> getAchievementById(Long id) {
        return achievementRepository.findById(id);
    }

    public void deleteAchievementById(Long id) {
        achievementRepository.deleteById(id);
    }

    public AchievementsDto addAchievement(AchievementsDto achievementsDto) {
        return toDto(achievementRepository.save(dto(achievementsDto)));
    }

    public AchievementsDto addAchievementImage(AchievementsDto achievementsDto, MultipartFile image) {
        return toDto(achievementRepository.save(dto(achievementsDto)));
    }

    public Optional<AchievementsDto> updateAchievementById(Long id, AchievementsDto achievementsDto) {
        Achievements updateAchievement = getAllAchievement().stream().filter(el->el.getId().equals(id)).findAny().get();
        if(updateAchievement != null){
            updateAchievement.setTitle(achievementsDto.getTitle());
            updateAchievement.setDescription(achievementsDto.getDescription());
            updateAchievement.setPictureUrl(achievementsDto.getPictureUrl());
            updateAchievement.setDate(achievementsDto.getDate());
        }
        return Optional.of(toDto(achievementRepository.save(updateAchievement)));
    }

    public Achievements dto(AchievementsDto achievementsDto){
        return Achievements.builder().id(achievementsDto.getId()).title(achievementsDto.getTitle())
                .description(achievementsDto.getDescription()).pictureUrl(achievementsDto.getPictureUrl())
                .date(achievementsDto.getDate())
                .build();
    }

    public AchievementsDto toDto(Achievements achievements){
        return  AchievementsDto.builder().id(achievements.getId()).title(achievements.getTitle())
                .description(achievements.getDescription()).pictureUrl(achievements.getPictureUrl())
                .date(achievements.getDate())
                .build();
    }
//                                                                                                 get Achievement Image
    public InputStream getImageByName(String imageName) throws FileNotFoundException {
        String imagePath = imageFolderPath+File.separator+imageName;
        InputStream inputStream = new FileInputStream(imagePath);
        return inputStream;
    }

}
