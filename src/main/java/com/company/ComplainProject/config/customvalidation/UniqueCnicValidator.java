package com.company.ComplainProject.config.customvalidation;

import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Optional;

public class UniqueCnicValidator implements ConstraintValidator<UniqueCnic,String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String cnic, ConstraintValidatorContext constraintValidatorContext) {
        Optional<User> user = Optional.ofNullable(userRepository.getAllUserByCnic(cnic));
        if(user.isPresent()){
            return false;
        }
        return true;
    }
}
