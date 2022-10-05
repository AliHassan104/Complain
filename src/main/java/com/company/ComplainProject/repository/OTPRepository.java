package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface OTPRepository extends JpaRepository<OTP,Long> , JpaSpecificationExecutor<OTP>{

    @Query(value="Select o from OTP o where o.code = ?1")
    OTP getIdByOtp(Integer otp);
}
