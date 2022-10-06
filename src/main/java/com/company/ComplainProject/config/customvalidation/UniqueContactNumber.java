package com.company.ComplainProject.config.customvalidation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueContactNumberValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueContactNumber {
    String message() default "Contact Number is already Exist";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };

}
