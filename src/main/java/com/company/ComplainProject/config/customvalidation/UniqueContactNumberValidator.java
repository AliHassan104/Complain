package com.company.ComplainProject.config.customvalidation;

import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueContactNumberValidator implements ConstraintValidator<UniqueContactNumber,Long> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(Long contactNumber, ConstraintValidatorContext constraintValidatorContext) {
        User user = userRepository.findUserByNumber(contactNumber);
        if(user != null){
            return false;
        }
        return true;
    }
}
