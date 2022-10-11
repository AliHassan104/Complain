package com.company.ComplainProject.config.customvalidation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ImageNotEmptyValidator implements ConstraintValidator<ImageNotEmpty,String> {
    @Override
    public boolean isValid(String imageUrl, ConstraintValidatorContext constraintValidatorContext) {
        if(!imageUrl.isEmpty()) {
            return false;
        }
        return true;
    }
}
