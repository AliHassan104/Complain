package com.company.ComplainProject.repository;

import com.company.ComplainProject.dto.ProjectEnums.UserStatus;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.specification.UserSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public interface UserRepository extends JpaRepository<User,Long> ,JpaSpecificationExecutor<User> {

//    Because of lazyInitializationError
    @Query("select u from User u left join fetch u.roles where u.email = ?1")
    User findByEmail(String email);

    @Query("SELECT u from User u where u.email = :email")
    User findUserByEmail(@Param("email") String email);

    @Query("SELECT u from User u WHERE u.status = :status")
    List<User> findUserByStatus(@Param("status") UserStatus userStatus);


    @Query("SELECT COUNT(u) FROM User u WHERE u.status=:status")
    Long countUserByStatus(@Param("status") UserStatus userStatus);




}
