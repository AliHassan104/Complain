package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.ForgetPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ForgetPasswordRepo  extends JpaRepository<ForgetPassword,Long> , JpaSpecificationExecutor<ForgetPassword>{

    @Query(value="Select o from ForgetPassword o where o.otp = ?1")
    ForgetPassword getIdByOtp(Integer otp);
}
